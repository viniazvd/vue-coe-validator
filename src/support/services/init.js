import { setValidation, defaultState } from '../services'

export function setValidations (form, validations) {
  Object
    .keys(validations)
    .forEach(input => setValidation.call(this, form, input))
}

function getFormFields (form, data, validation) {
  return {
    [form]: Object.entries(validation).reduce((accForm, [input, rules]) => {
      const value = data[input]
      const filled = { isFilled: !!value }
      const dirted = { isDirty: !!value }

      accForm[input] = { ...defaultState, ...dirted, ...filled, ...rules }

      return accForm
    }, {})
  }
}

export function setFormFields (form, data, validation) {
  const newFormStates = getFormFields(form, data, validation)

  this.validations = { ...this.validations, ...newFormStates }
}
