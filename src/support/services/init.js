import { validateField } from '../services/validate'

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

function watchValidate (formKey, input) {
  this.$watch(formKey.concat('.', input), value => {
    validateField.call(this, formKey, input, value)
  })
}

export function setValidations (validation, form, formKey, formValue) {
  Object.keys(validation).forEach(validationKey => {
    if ((form && form === formKey) || validationKey === formKey) {
      // set validator for each input
      for (const input in formValue) watchValidate.call(this, formKey, input)
    }
  })
}

const defaultState = {
  isTouched: false,
  isDirty: false,
  isFilled: false,
  isValid: false,
  errors: []
}

function setFormStates (data, form, validation) {
  return {
    [form]: Object.entries(data).reduce((initialForm, [key, value]) => {
      const filled = { isFilled: !!value }
      const dirted = { isDirty: !!value }
      const validations = validation && validation[key]

      if (validations !== undefined) {
        initialForm[key] = { ...defaultState, ...dirted, ...filled, ...validations }
      }

      return initialForm
    }, {})
  }
}

export function makeInitialForm (validation, formKey, formValue) {
  if (Object.keys(validation).includes(formKey)) {
    this.validations = {
      ...this.validations,
      ...setFormStates(
        formValue,
        formKey, (
          validation[formKey] || // when validation is created automatically
          validation // when validation is created dynamically
        )
      )
    }
  }
}
