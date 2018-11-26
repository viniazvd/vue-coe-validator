import { setValidate, defaultState } from '../services'

export function getValidation (validation, form) {
  return !validation
    ? this.$options.validation
    : {
      ...this.validations,
      [form]: {
        ...this.validations[form],
        ...validation
      }
    }
}

export function setValidations (form, validations) {
  Object
    .keys(validations)
    .forEach(input => setValidate.call(this, form, input))
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
