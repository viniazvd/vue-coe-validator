export default function (validations, form) {
  const defaultState = {
    isTouched: false,
    isDirty: false,
    isFilled: false,
    isValid: false,
    errors: []
  }

  const initialForm = {
    [form]: Object.entries(validations).reduce((form, [key, value]) => {
      const filled = { isFilled: !!value }

      form[key] = { ...defaultState, ...filled, ...validations[key] }

      return form
    }, {})
  }

  return initialForm
}
