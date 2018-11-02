export default function (data, form, validation) {
  if (!form) form = Object.keys(validation)

  const defaultState = {
    isTouched: false,
    isDirty: false,
    isFilled: false,
    isValid: false,
    errors: []
  }

  const createForm = formName => Object.entries(data).reduce((initialForm, [key, value]) => {
    const filled = { isFilled: !!value }
    const validations = (validation && validation[key]) || (validation && validation[formName] && validation[formName][key])

    initialForm[key] = { ...defaultState, ...filled, ...validations }

    return initialForm
  }, {})

  // initialize by directive
  if (Array.isArray(form)) {
    let initialForm = {}

    form.forEach(formName => {
      initialForm = {
        ...initialForm,
        [formName]: createForm(formName)
      }
    })

    return initialForm
  }

  // initialized by library configuration object
  return { [form]: createForm({}) }
}
