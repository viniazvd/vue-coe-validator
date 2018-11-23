import { getContext } from '../services/context'
import { RULES, hasRule, getMessage, getError } from './'

function getErrors (validations, messages, form, key, value) {
  let errors = []

  RULES.some(rule => {
    if (hasRule(rule, validations, form, key)) {
      const msg = getMessage(rule, messages, form, key)
      const error = getError(rule, validations, form, key, value, msg)

      if (error) errors = [ ...errors, error ]
    }
  })

  return errors
}

function validate (form, key, value) {
  const vm = getContext.call(this)

  const validations = vm.validations
  const messages = vm.messages

  const errors = getErrors(validations, messages, form, key, value)
  const isTouched = validations[form] && validations[form][key] && validations[form][key].isTouched

  validations[form][key] = {
    ...validations[form][key],
    errors,
    isTouched: true,
    isDirty: !!value || isTouched,
    isFilled: !!value,
    isValid: errors.length <= 0
  }
}

export const validateField = validate
