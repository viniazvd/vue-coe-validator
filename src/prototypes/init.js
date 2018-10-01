export default function (data, form) {
  const defaultState = {
    isTouched: false,
    isDirty: false,
    isFilled: false,
    isValid: false,
    errors: []
  }

  const initialForm = {
    [form]: Object.entries(data).reduce((form, [key, value]) => {
      const filled = { isFilled: !!value }

      form[key] = { ...defaultState, ...filled }

      return form
    }, {})
  }

  return initialForm
}
