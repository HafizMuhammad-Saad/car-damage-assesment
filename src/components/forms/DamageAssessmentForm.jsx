import { useState, useEffect } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { damageAssessmentSchema } from '../../utils/validation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card'
import Button from '../ui/Button'
import Input from '../ui/Input'
import ImageUpload from '../ui/ImageUpload'
import { X, AlertCircle } from 'lucide-react'
import CarViewer2D from '../2d/CarViewer2D'
import VanViewer2D from '../2d/VanViewer2D'

// const SEVERITY_OPTIONS = [
//   { value: 'light', label: 'Light', description: 'Minor scratches or small dents', color: 'bg-yellow-100 text-yellow-800' },
//   { value: 'moderate', label: 'Moderate', description: 'Noticeable damage, needs repair', color: 'bg-orange-100 text-orange-800' },
//   { value: 'severe', label: 'Severe', description: 'Major damage, significant repair needed', color: 'bg-red-100 text-red-800' }
// ]

const DamageAssessmentForm = ({ onSubmit, onBack,/* userDetails */ }) => {
  const [loading, setLoading] = useState(false)
  const [selectedAreas, setSelectedAreas] = useState([])
  const [images, setImages] = useState([])

  const [vehicleType, setVehicleType] = useState("car");

  // const handleVehicleTypeChange = (e) => {
  //   setVehicleType(e.target.value);
  // };


  const {
    /*register,*/
    handleSubmit,
    formState: { errors, isValid },
    control,
    watch,
    setValue,
    trigger
  } = useForm({
    resolver: yupResolver(damageAssessmentSchema),
    defaultValues: {
      damages: [],
      images: []
    },
    mode: 'onChange'
  })
  // Keep selectedAreas synced if someone modifies fields from UI


  const { fields, append, remove } = useFieldArray({
    control,
    name: 'damages'
  })

  const watchedDamages = watch('damages')

  // Update form validation when images change
  useEffect(() => {
    setValue('images', images)
    trigger('images')
  }, [images, setValue, trigger])

  // Update form validation when damages change
  useEffect(() => {
    trigger('damages')
  }, [watchedDamages, trigger])

  // const handleAreaSelect = (areaId, areaLabel) => {
  //   const existingIndex = selectedAreas.indexOf(areaId)

  //   if (existingIndex > -1) {
  //     // Remove area if already selected
  //     const newSelectedAreas = selectedAreas.filter(id => id !== areaId)
  //     setSelectedAreas(newSelectedAreas)

  //     // Remove from form
  //     const damageIndex = fields.findIndex(field => field.area === areaId)
  //     if (damageIndex > -1) {
  //       remove(damageIndex)
  //     }
  //   } else {
  //     // Add new area
  //     setSelectedAreas([...selectedAreas, areaId])

  //     // Add to form
  //     append({
  //       id: Date.now().toString(),
  //       area: areaId,
  //       areaLabel: areaLabel,
  //       severity: 'moderate',
  //       comment: ''
  //     })
  //   }
  // }

  // const removeDamageArea = (index, areaId) => {
  //   remove(index)
  //   setSelectedAreas(prev => prev.filter(id => id !== areaId))
  // }

  useEffect(() => {
    setSelectedAreas(fields.map(f => f.area));
  }, [fields]);
  const handleAreaSelect = (areaId, areaLabel) => {
    const existingIndex = fields.findIndex(f => f.area === areaId);

    if (existingIndex > -1) {
      // already selected -> remove from form and UI highlights
      remove(existingIndex);
      setSelectedAreas(prev => prev.filter(id => id !== areaId));
    } else {
      // not selected -> add to form and highlights
      append({
        id: Date.now().toString(),
        area: areaId,
        areaLabel,
        severity: 'moderate',
        comment: ''
      });
      setSelectedAreas(prev => [...prev, areaId]);
    }
  };
  const handleImagesChange = (newImages) => {
    setImages(newImages)
  }

  const handleFormSubmit = async (data) => {
    setLoading(true)

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      const assessmentData = {
        vehicleType,  // 👈 added here
        // userDetails,
        damages: data.damages,
        images: images.map(img => ({
          name: img.name,
          url: img.url,
          file: img.file
        })),
        totalDamageAreas: data.damages.length,
        timestamp: new Date().toISOString()
      }

      setLoading(false)
      onSubmit(assessmentData)
    } catch (error) {
      setLoading(false)
      console.error('Error submitting assessment:', error)
    }


  }

  useEffect(() => {
    // reset when user switches vehicle
    setSelectedAreas([]);
    setValue("damages", []);
  }, [vehicleType, setValue]);


  // const getDamageByArea = (areaId) => {
  //   return fields.find(damage => damage.area === areaId)
  // }


  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 my-5">
      <Card>
        <CardHeader>
          <CardTitle>Trin 2: Skadesvurdering</CardTitle>
          <CardDescription>
            Vælg beskadigede områder på 3D-modellen, angiv alvorligheden, og upload billeder af skaden.
          </CardDescription>
        </CardHeader>
      </Card>
      {/* Vehicle Selector */}
      <div className="flex gap-6">
        <div
          onClick={() => setVehicleType("car")}
          className={`cursor-pointer p-4 border rounded-lg flex flex-col items-center w-32 transition ${vehicleType === "car"
            ? "border-[#fb5c14] bg-orange-50"
            : "border-gray-300 hover:border-[#fb5c14]"
            }`}
        >
          <img src="/static/assets/img/car/frontRight/body.png" alt="" className='h-12 object-contain' />
          <p className="mt-2 text-sm font-medium">Bil</p>
        </div>

        <div
          onClick={() => setVehicleType("van")}
          className={`cursor-pointer p-4 border rounded-lg flex flex-col items-center w-32 transition ${vehicleType === "van"
            ? "border-[#fb5c14] bg-orange-50"
            : "border-gray-300 hover:border-[#fb5c14]"
            }`}
        >
          <img src="/static/assets/img/van/frontRight/body.png" alt="" className='h-12 object-contain' />
          <p className="mt-2 text-sm font-medium">Varevogn</p>
        </div>
      </div>

      {/* Viewer Switch */}
      {vehicleType === "car" ? (
        <>
        <CarViewer2D
          onAreaSelect={handleAreaSelect}
          selectedAreas={selectedAreas}
          height={500}
          />
          </>
      ) : (
        <>
        <VanViewer2D
          onAreaSelect={handleAreaSelect}
          selectedAreas={selectedAreas}
          height={500}
          />
     
          </>
      )}

      {/* Selected damages panel */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="text-lg">Selected Damages</CardTitle>
          <CardDescription>Adjust severity and add notes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.length === 0 ? (
            <p className="text-sm text-gray-500">No damaged areas selected yet. Click the car to add one.</p>
          ) : (
            fields.map((field, index) => (
              <div key={field.id} className="flex items-start gap-4 border p-3 rounded-lg">
                <div className="w-36">
                  <div className="text-sm font-medium">{field.areaLabel}</div>
                  <div className="text-xs text-gray-500">{field.area}</div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                  <Controller
                    control={control}
                    name={`damages.${index}.severity`}
                    defaultValue={field.severity}
                    render={({ field: ctl }) => (
                      <select {...ctl} className="border rounded px-2 py-1">
                        <option value="light">Light</option>
                        <option value="moderate">Moderate</option>
                        <option value="severe">Severe</option>
                      </select>
                    )}
                  />

                  <input
                    {...register(`damages.${index}.comment`)}
                    defaultValue={field.comment}
                    placeholder="Description / notes"
                    className="border rounded px-2 py-1 w-full col-span-2"
                  />
                </div>

                <div className="flex items-start">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      remove(index);
                      setSelectedAreas(prev => prev.filter(id => id !== field.area));
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card> */}

      {/* Image Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upload billeder af skader</CardTitle>
          <CardDescription>
            Upload tydelige billeder, der viser skaden på dit køretøj. Flere vinkler anbefales.

          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUpload
            onImagesChange={handleImagesChange}
            maxImages={10}
            error={errors.images?.message}
          />
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <CardFooter className="flex justify-between items-center gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onBack}
          disabled={loading}
          className="w-full sm:w-auto text-sm"
        >
          Tilbage til detaljer
        </Button>

        <Button
          onClick={handleSubmit(handleFormSubmit)}
          loading={loading}
          size={'sm'}
          disabled={!isValid || fields.length === 0 || images.length === 0}
          className="w-full sm:w-auto text-sm text-orange-400 border border-orange-400 hover:bg-orange-400 hover:text-white"
        >
          {loading ? "Sender..." : "Indsend vurdering"}
        </Button>
      </CardFooter>


      {/* Summary */}
      {/* {(fields.length > 0 || images.length > 0) && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 text-sm text-blue-800">
              <div className="flex items-center gap-1">
                <span className="font-medium">{fields.length}</span>
                <span>damage area{fields.length !== 1 ? 's' : ''} selected</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{images.length}</span>
                <span>image{images.length !== 1 ? 's' : ''} uploaded</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )} */}

      {loading && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(255,255,255,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}>
          <div style={{
            background: "#fff",
            padding: "30px 40px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.15)",
            textAlign: "center",
          }}>
            <div className="spinner" style={{
              border: "3px solid #eee",
              borderTop: "3px solid #fb5c14",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              animation: "spin 1s linear infinite",
              margin: "0 auto 10px",
            }}></div>
            <p style={{ color: "#333" }}>At submitte dit rapport...</p>
          </div>

          <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
        </div>
      )}
    </div>


  )
}

export default DamageAssessmentForm
