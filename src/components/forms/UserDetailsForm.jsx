import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userDetailsSchema } from '../../utils/validation'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { User, Mail, Phone, MapPin, Car, Shield, CreditCard, CheckCircle, Search } from 'lucide-react';
const UserDetailsForm = ({ onNext, initialData = {} }) => {
  const [loading, setLoading] = useState(false)
  const [carInfo, setCarInfo] = useState(null)
  const [fetchingCarInfo, setFetchingCarInfo] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(userDetailsSchema),
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      address: '',
      carNumberPlate: '',
      serviceType: '',
      ...initialData
    },
    mode: 'onChange'
  })

  // eslint-disable-next-line no-unused-vars
  const carNumberPlate = watch('carNumberPlate')

  const fetchCarInfo = async (plateNumber) => {
    if (!plateNumber || plateNumber.length < 3) return

    setFetchingCarInfo(true)
    try {
      // Use mock API service
      const { getVehicle } = await import('../../services/api')
      const result = await getVehicle(plateNumber)

      if (result.success) {
        setCarInfo(result.data)
      } else {
        setCarInfo(null)
      }
    } catch (error) {
      console.log('Car info not found or service unavailable', error)
      setCarInfo(null)
    } finally {
      setFetchingCarInfo(false)
    }
  }

  const handleCarPlateChange = (e) => {
    const value = e.target.value.toUpperCase()
    setValue('carNumberPlate', value)

    // Debounce the API call
    clearTimeout(window.carInfoTimer)
    window.carInfoTimer = setTimeout(() => {
      fetchCarInfo(value)
    }, 500)
  }

  const onSubmit = async (data) => {
    setLoading(true)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const formData = {
      ...data,
      carInfo,
      timestamp: new Date().toISOString()
    }

    setLoading(false)
    onNext(formData)
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-amber-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
       

        <Card className="w-full max-w-4xl mx-auto border-orange-200">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center shrink-0 justify-center">
                <Car className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-lg sm:text-xl text-orange-900 font-semibold">Personlige oplysninger og køretøjsoplysninger</CardTitle>
                <CardDescription className="text-sm sm:text-base text-gray-600">
                  Angiv venligst dine kontaktoplysninger og køretøjsoplysninger for at komme i gang med din skadesanmeldelse.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                  <User className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Personlige oplysninger</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Input
                    label="Fulde navn"
                    required
                    {...register('name')}
                    error={errors.name?.message}
                    placeholder="Indtast dit fulde navn"
                  />

                  <Input
                    label="E-mailadresse"
                    type="email"
                    required
                    {...register('email')}
                    error={errors.email?.message}
                    placeholder="anders.andersen@mail.dk"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Input
                    label="Mobilnummer"
                    type="tel"
                    required
                    {...register('mobile')}
                    error={errors.mobile?.message}
                    placeholder="+4512345678"
                  />

                  <Input
                    label="Adresse"
                    required
                    {...register('address')}
                    error={errors.address?.message}
                    placeholder="Indtast din fulde adresse"
                  />
                </div>
              </div>

              {/* Vehicle Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                  <Car className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Køretøjsoplysninger</h3>
                </div>

                <div className="relative max-w-md">
                  <Input
                    label="Nummerplade"
                    required
                    {...register('carNumberPlate')}
                    onChange={handleCarPlateChange}
                    error={errors.carNumberPlate?.message}
                    placeholder="AB12345"
                    className="uppercase font-mono text-lg tracking-wider"
                  />
                  {fetchingCarInfo && (
                    <div className="absolute right-4 top-10 flex items-center space-x-2">
                      <Search className="w-4 h-4 text-orange-600 animate-pulse" />
                      <span className="text-sm text-orange-600">Søger...</span>
                    </div>
                  )}
                </div>

                {/* Car Information Display */}
                {carInfo && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <h4 className="text-lg font-semibold text-green-800">Køretøjsoplysninger fundet</h4>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-sm text-gray-600">Lave</p>
                        <p className="font-semibold text-gray-900">{carInfo.make}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-sm text-gray-600">Model</p>
                        <p className="font-semibold text-gray-900">{carInfo.model}</p>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              {/* Service Type Selection */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Servicetype</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <label className="relative cursor-pointer group flex h-full">
                    <input
                      type="radio"
                      {...register('serviceType')}
                      value="insurance"
                      className="sr-only peer"
                    />
                    <div className="p-6 border-2 rounded-xl
    transition-colors duration-300
    peer-checked:border-orange-500 
    peer-checked:bg-orange-50 
    peer-checked:text-orange-700
    hover:bg-orange-100 hover:text-orange-700 
    hover:border-orange-300
    group-hover:shadow-md">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1 hidden">
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-orange-500 peer-checked:bg-orange-50 relative flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Shield className="w-5 h-5 transition-colors duration-300 
            group-hover:text-orange-700
            text-orange-600 
            peer-checked:text-white" />
                            <h4 className="text-lg font-semibold ">Forsikringsbetaling</h4>
                          </div>
                          <p className=" leading-relaxed ">
Vi hjælper med dokumentation og kontakt til dit forsikringsselskab. Du betaler kun eventuel selvrisiko, hvis skaden godkendes                         </p>
                          <div className="mt-3 flex items-center space-x-2 text-sm text-green-700 ">
                            <CheckCircle className="w-4 h-4 transition-colors duration-300
            text-green-600
            group-hover:text-green-700
            peer-checked:text-white" />
                            <span>Skaden betales af forsikringen</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>

                  <label className="relative cursor-pointer group flex h-full">
                    <input
                      type="radio"
                      {...register('serviceType')}
                      value="self-paid"
                      className="sr-only peer"
                    />
                    <div className="p-6 border-2 rounded-xl
    transition-colors duration-300
    peer-checked:border-orange-500 
    peer-checked:bg-orange-50 
    peer-checked:text-orange-700
    hover:bg-orange-100 hover:text-orange-700
    hover:border-orange-500
    group-hover:shadow-md">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1 hidden">
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-orange-500 peer-checked:bg-orange-50 relative flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <CreditCard className="w-5 h-5 transition-colors duration-300 
            text-orange-600 
            group-hover:text-orange-700 
            peer-checked:text-white" />
                            <h4 className="text-lg font-semibold ">Selvbetaling</h4>
                          </div>
                          <p className="leading-relaxed ">
Vælg denne løsning, hvis skaden ikke er dækket af dit forsikringsselskab, eller hvis du foretrækker selvbetaling. Vi udarbejder et tilbud på reparationen, så du får et klart overblik over de samlede omkostninger. Har du en høj selvrisiko kan det være en fordel med selvbetaling for mindre skader.                        </p>
                          <div className="mt-3 flex items-center space-x-2 text-sm text-green-700">
                            <CheckCircle className="w-4 h-4 transition-colors duration-300
            text-green-600
            group-hover:text-green-700
            peer-checked:text-white" />
                            <span>Fuldt overblik over samlet omkostninger</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>

                {errors.serviceType && (
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.serviceType.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center sm:justify-end pt-6 sm:pt-8 border-t border-gray-100">
                <Button
                  type="submit"
                  loading={loading}
                  disabled={!isValid}
                  size="lg"
                  className="w-full sm:w-auto min-w-[160px] text-orange-400 border border-orange-400 hover:bg-orange-400 hover:text-white transition"
                >
                  Fortsæt til næste trin
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UserDetailsForm
