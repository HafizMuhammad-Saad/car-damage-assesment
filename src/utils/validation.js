import * as yup from 'yup'

export const userDetailsSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^\+?[\d\s\-\(\)]{10,15}$/, 'Please enter a valid mobile number'),
  address: yup
    .string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address must not exceed 500 characters'),
  carNumberPlate: yup
    .string()
    .required('Car number plate is required')
    .min(3, 'Car number plate must be at least 3 characters')
    .max(20, 'Car number plate must not exceed 20 characters'),
  serviceType: yup
    .string()
    .required('Please select a service type')
    .oneOf(['insurance', 'self-paid'], 'Please select a valid service type')
})

export const damageAssessmentSchema = yup.object({
  damages: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required(),
        area: yup.string().required(),
        severity: yup.string().oneOf(['light', 'moderate', 'severe']).required(),
        comment: yup.string().max(500, 'Comment must not exceed 500 characters')
      })
    )
    .min(1, 'Please select at least one damage area'),
  images: yup
    .array()
    .of(yup.mixed())
    .min(1, 'Please upload at least one image')
    .max(10, 'Maximum 10 images allowed')
})
