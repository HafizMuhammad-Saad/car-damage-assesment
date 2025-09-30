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
      name: 'test',
      email: 'test@example.com',
      mobile: '+45 12 34 56 78',
      address: 'abc123 street, city, country',
      carNumberPlate: 'AB 12345',
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
        {/* Progress Indicator */}
        {/* <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-semibold font-varela">
                1
              </div>
              <span className="ml-3 text-sm font-medium text-orange-600 font-varela">Personal Details</span>
            </div>
            <div className="w-16 h-1 bg-gray-200 rounded"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-semibold font-varela">
                2
              </div>
              <span className="ml-3 text-sm font-medium text-gray-500 font-varela">Damage Assessment</span>
            </div>
            <div className="w-16 h-1 bg-gray-200 rounded"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-semibold font-varela">
                3
              </div>
              <span className="ml-3 text-sm font-medium text-gray-500 font-varela">Review & Submit</span>
            </div>
          </div>
        </div> */}

        <Card className="w-full max-w-4xl mx-auto border-orange-200">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <CardTitle className="font-varela text-orange-900">Personal & Vehicle Details</CardTitle>
                <CardDescription className="font-varela">
                  Please provide your contact information and vehicle details to get started with your car damage assessment.
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
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    required
                    {...register('name')}
                    error={errors.name?.message}
                    placeholder="Enter your full name"
                  />
                  
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    {...register('email')}
                    error={errors.email?.message}
                    placeholder="info@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Input
                    label="Mobile Number"
                    type="tel"
                    required
                    {...register('mobile')}
                    error={errors.mobile?.message}
                    placeholder="+45 12 34 56 78"
                  />
                  
                  <Input
                    label="Address"
                    required
                    {...register('address')}
                    error={errors.address?.message}
                    placeholder="Enter your complete address"
                  />
                </div>
              </div>

              {/* Vehicle Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                  <Car className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Vehicle Information</h3>
                </div>
                
                <div className="relative max-w-md">
                  <Input
                    label="Car Number Plate"
                    required
                    {...register('carNumberPlate')}
                    onChange={handleCarPlateChange}
                    error={errors.carNumberPlate?.message}
                    placeholder="AB 12345"
                    className="uppercase font-mono text-lg tracking-wider"
                  />
                  {fetchingCarInfo && (
                    <div className="absolute right-4 top-10 flex items-center space-x-2">
                      <Search className="w-4 h-4 text-orange-600 animate-pulse" />
                      <span className="text-sm text-orange-600">Searching...</span>
                    </div>
                  )}
                </div>

                {/* Car Information Display */}
                {carInfo && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <h4 className="text-lg font-semibold text-green-800">Vehicle Information Found</h4>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-sm text-gray-600">Make</p>
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
                  <h3 className="text-lg font-semibold text-gray-900">Service Type</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <label className="relative cursor-pointer group flex h-full">
                    <input
                      type="radio"
                      {...register('serviceType')}
                      value="insurance"
                      className="sr-only peer"
                    />
                    <div className="p-6 border-2 rounded-xl peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:bg-gray-50 transition-all duration-200 group-hover:shadow-md">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1 hidden">
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-orange-500 peer-checked:bg-orange-500 relative flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Shield className="w-5 h-5 text-orange-600" />
                            <h4 className="text-lg font-semibold text-gray-900 font-varela">Insurance Claim</h4>
                          </div>
                          <p className="text-gray-600 leading-relaxed font-varela">
                            Process your claim through your insurance company. We'll handle all the paperwork and coordination.
                          </p>
                          <div className="mt-3 flex items-center space-x-2 text-sm text-green-600 font-varela">
                            <CheckCircle className="w-4 h-4" />
                            <span>Direct billing available</span>
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
                    <div className="p-6 border-2 rounded-xl peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:bg-gray-50 transition-all duration-200 group-hover:shadow-md">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1 hidden">
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-orange-500 peer-checked:bg-orange-500 relative flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <CreditCard className="w-5 h-5 text-orange-600" />
                            <h4 className="text-lg font-semibold text-gray-900 font-varela">Self-Paid Service</h4>
                          </div>
                          <p className="text-gray-600 leading-relaxed font-varela">
                            Pay for repairs directly and get faster service with flexible payment options.
                          </p>
                          <div className="mt-3 flex items-center space-x-2 text-sm text-green-600 font-varela">
                            <CheckCircle className="w-4 h-4" />
                            <span>Priority scheduling</span>
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
              <div className="flex justify-end pt-8 border-t border-gray-100">
                <Button 
                  type="submit" 
                  loading={loading}
                  disabled={!isValid}
                  size="lg"
                  className="min-w-[160px] text-orange-400 border border-orange-400 hover:bg-orange-400 hover:text-white cursor-pointer"
                >
                  Continue to Next Step
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
