export default function (validation, messages, form, key, value) {
  const isTouched = validation[form] && validation[form][key] && validation[form][key].isTouched

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
    return this.validate(touched, messages, form, key, value || '')
  }
}
