import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { damageAssessmentSchema } from '../../utils/validation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import Button from '../ui/Button'
import Input from '../ui/Input'
import ImageUpload from '../ui/ImageUpload'
import CarModel from '../3d/CarModel'
import { X, AlertCircle } from 'lucide-react'
import CarViewerDemo from '../2d/CarViewerDemo'
import CarViewer2D from '../2d/CarViewer2D'

const SEVERITY_OPTIONS = [
  { value: 'light', label: 'Light', description: 'Minor scratches or small dents', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'moderate', label: 'Moderate', description: 'Noticeable damage, needs repair', color: 'bg-orange-100 text-orange-800' },
  { value: 'severe', label: 'Severe', description: 'Major damage, significant repair needed', color: 'bg-red-100 text-red-800' }
]

const DamageAssessmentForm = ({ onSubmit, onBack, userDetails }) => {
  const [loading, setLoading] = useState(false)
  const [selectedAreas, setSelectedAreas] = useState([])
  const [images, setImages] = useState([])

  const {
    register,
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

  const handleAreaSelect = (areaId, areaLabel) => {
    const existingIndex = selectedAreas.indexOf(areaId)
    
    if (existingIndex > -1) {
      // Remove area if already selected
      const newSelectedAreas = selectedAreas.filter(id => id !== areaId)
      setSelectedAreas(newSelectedAreas)
      
      // Remove from form
      const damageIndex = fields.findIndex(field => field.area === areaId)
      if (damageIndex > -1) {
        remove(damageIndex)
      }
    } else {
      // Add new area
      setSelectedAreas([...selectedAreas, areaId])
      
      // Add to form
      append({
        id: Date.now().toString(),
        area: areaId,
        areaLabel: areaLabel,
        severity: 'moderate',
        comment: ''
      })
    }
  }

  const removeDamageArea = (index, areaId) => {
    remove(index)
    setSelectedAreas(prev => prev.filter(id => id !== areaId))
  }

  const handleImagesChange = (newImages) => {
    setImages(newImages)
  }

  const handleFormSubmit = async (data) => {
    setLoading(true)
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const assessmentData = {
        userDetails,
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

  const getDamageByArea = (areaId) => {
    return fields.find(damage => damage.area === areaId)
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Step 2: Damage Assessment</CardTitle>
          <CardDescription>
            Select damaged areas on the 3D model, specify severity, and upload photos of the damage.
          </CardDescription>
        </CardHeader>
      </Card>

        <CarViewer2D
  onAreaSelect={handleAreaSelect}
  selectedAreas={selectedAreas}
  damages={fields.reduce((acc, damage) => {
              acc[damage.area] = damage
              return acc
            }, {})}
  height={500}
/>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 3D Car Model */}
        {/* <div>
          <CarModel
            onAreaSelect={handleAreaSelect}
            selectedAreas={selectedAreas}
            damages={fields.reduce((acc, damage) => {
              acc[damage.area] = damage
              return acc
            }, {})}
            height={500}
          />
        </div> */}


        {/* Damage Details Form */}
        {/* <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Damage Details</CardTitle>
              <CardDescription>
                Specify severity and add comments for each selected area
              </CardDescription>
            </CardHeader>
            <CardContent>
              {fields.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <p>Select damaged areas on the 3D model to begin</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {fields.map((field, index) => (
                    <div key={field.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{field.areaLabel}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDamageArea(index, field.area)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Severity
                          </label>
                          <div className="grid grid-cols-1 gap-2">
                            {SEVERITY_OPTIONS.map(option => (
                              <label key={option.value} className="flex items-start cursor-pointer">
                                <input
                                  type="radio"
                                  {...register(`damages.${index}.severity`)}
                                  value={option.value}
                                  className="mt-1 mr-3"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${option.color}`}>
                                      {option.label}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-600 mt-1">{option.description}</p>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                        
                        <Input
                          label="Additional Comments"
                          as="textarea"
                          rows={2}
                          {...register(`damages.${index}.comment`)}
                          placeholder="Describe the damage in detail..."
                          className="text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {errors.damages && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.damages.message}
                </p>
              )}
            </CardContent>
          </Card>
        </div> */}
      </div>

      {/* Image Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upload Damage Photos</CardTitle>
          <CardDescription>
            Upload clear photos showing the damage to your vehicle. Multiple angles are recommended.
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
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={onBack}
              disabled={loading}
            >
              Back to Details
            </Button>
            
            <Button
              onClick={handleSubmit(handleFormSubmit)}
              loading={loading}
              disabled={!isValid || fields.length === 0 || images.length === 0}
              className="min-w-[160px] text-amber-400 border border-amber-400 hover:bg-amber-400 hover:text-white"
            >
              Submit Assessment
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {(fields.length > 0 || images.length > 0) && (
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
      )}
    </div>
  )
}

export default DamageAssessmentForm
