import RULES from '../rules/types'
import * as VALIDATIONS from '../rules'

export default function (validation, messages, form, key, value) {
  if (!form) { console.warn('select a form to validate the data.') }

  let errors = []

  RULES.some(rule => {
    if (validation[form][key][rule]) {
      const msg = messages && messages[form][key][rule]
      const error = VALIDATIONS[rule](value, msg, validation, form, key)
      if (error) errors = [ ...errors, error ]
    }
  })

  const changed = {
    ...validation[form][key],
    errors,
    isTouched: true,
    isDirty: true,
    isFilled: !!value,
    isValid: errors.length <= 0
  }

  const inputUpdated = { [key]: changed }
  const formToUpdate = validation[form]

  return {
    ...validation,
    [form]: {
      ...formToUpdate,
      ...inputUpdated
    }
  }
}
