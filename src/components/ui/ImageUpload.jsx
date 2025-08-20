import { useState, useCallback } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { cn } from '../../utils/cn'
import Button from './Button'

const ImageUpload = ({ 
  onImagesChange, 
  maxImages = 10, 
  className,
  error,
  label = 'Upload Images'
}) => {
  const [images, setImages] = useState([])
  const [dragOver, setDragOver] = useState(false)

  const handleImageChange = useCallback((newImages) => {
    setImages(newImages)
    onImagesChange(newImages)
  }, [onImagesChange])

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files)
    addImages(files)
  }

  const addImages = (files) => {
    const validFiles = files.filter(file => file.type.startsWith('image/'))
    
    if (images.length + validFiles.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`)
      return
    }

    const newImages = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }))

    const updatedImages = [...images, ...newImages]
    handleImageChange(updatedImages)
  }

  const removeImage = (imageId) => {
    const updatedImages = images.filter(img => img.id !== imageId)
    // Clean up object URLs to prevent memory leaks
    const imageToRemove = images.find(img => img.id === imageId)
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.url)
    }
    handleImageChange(updatedImages)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    addImages(files)
  }

  return (
    <div className={cn('w-full', className)}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {/* Upload Area */}
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
          dragOver ? 'border-primary-400 bg-primary-50' : 'border-gray-300',
          error && 'border-red-300'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
        />
        
        <div className="flex flex-col items-center">
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop images here, or{' '}
            <label 
              htmlFor="image-upload" 
              className="text-primary-600 cursor-pointer hover:text-primary-700"
            >
              browse files
            </label>
          </p>
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF up to 10MB each (max {maxImages} images)
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Uploaded Images ({images.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <Button
                  variant="danger"
                  size="sm"
                  className="absolute -top-2 -right-2 w-8 h-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(image.id)}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </Button>
                
                <p className="mt-1 text-xs text-gray-500 truncate">
                  {image.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
