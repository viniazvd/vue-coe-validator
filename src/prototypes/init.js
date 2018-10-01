export default function (data, form, validation) {
  const defaultState = {
    isTouched: false,
    isDirty: false,
    isFilled: false,
    isValid: false,
    errors: []
  }

  const initialForm = {
    [form]: Object.entries(data).reduce((form, [key, value], index) => {
      const filled = { isFilled: !!value }
      const validations = validation[key]

      form[key] = { ...defaultState, ...filled, ...validations }

      return form
    }, {})
  }

  return initialForm
}