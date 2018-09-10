export default function (validation, form, key, value) {
  const { isTouched } = validation[form][key]

  // to prevent unnecessary checks
  if (validation && !isTouched) {
    const inputToTouch = Object.entries(validation[form][key]).reduce((acc, [key, value]) => {
      acc[key] = key === 'isTouched' || value

      return acc
    }, {})

    const formToUpdate = validation[form]

    const touched = {
      ...validation,
      [form]: {
        ...formToUpdate,
        [key]: { ...inputToTouch }
      }
    }

    // forced validation
    return this.validate(touched, form, key, value || '')
  }
}
