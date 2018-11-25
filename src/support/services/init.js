import { watchValidate, defaultState } from '../services'

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
    .forEach(input => watchValidate.call(this, form, input))
}

function getFormStates (form, data, validation) {
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

export function setFormStates (form, data, validation) {
  const newFormStates = getFormStates(form, data, validation)

  this.validations = { ...this.validations, ...newFormStates }
}
