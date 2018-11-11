import { getContext } from '../services/context'
import * as VALIDATIONS from '../../rules'

function getErrors (validations, messages, form, key, value) {
  const hasRule = rule => validations[form] && validations[form][key] && validations[form][key][rule]
  const getMessage = rule => messages && messages[form][key] && messages[form][key][rule]
  const getError = (rule, msg) => VALIDATIONS[rule](value, msg, validations, form, key)

  const RULES = Object.keys(VALIDATIONS)
  let errors = []

  RULES.some(rule => {
    if (hasRule(rule)) {
      const msg = getMessage(rule)
      const error = getError(rule, msg)

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
