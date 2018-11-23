import { getContext } from '../services/context'
import { getErrors } from './'

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
