import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const Input = forwardRef(({ 
  className, 
  type = 'text',
  label,
  error,
  helperText,
  required = false,
  as = 'input',
  ...props 
}, ref) => {
  const Component = as
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <Component
        type={as === 'input' ? type : undefined}
        className={cn(
          'input-field',
          error && 'input-error',
          className
        )}
        ref={ref}
        {...props}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
