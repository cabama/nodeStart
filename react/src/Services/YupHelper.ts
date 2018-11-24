import * as yup from 'yup'

const getYupErrors = (error: yup.ValidationError) => {
  console.log('yup error', error)
  const errorObject = {}
  error.inner.forEach((errors) => {
    errorObject[errors.path] = errors.errors
  })
  return errorObject
}

export const yupValidateForm = (formSchema: yup.ObjectSchema<any>, object: object): any => {
  try {
    formSchema.validateSync(object, { abortEarly: false })
    return null
  } catch (error) {
    return getYupErrors(error)
  }
}
