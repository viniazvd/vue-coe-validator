import * as VALIDATIONS from '../../rules'

export const hasCustomAsyncRule = state => state['customAsync'] && state['customAsync'].length

export function setActiveFields (state, value, isTouched, syncErrors) {
  state.errors = syncErrors
  state.isChanged = true
  state.isDirty = !!value || isTouched
  state.isFilled = !!value
  state.isTouched = true
  state.isValid = !syncErrors.length
}

export function setInactiveFields (state, syncErrors) {
  state.errors = syncErrors
  state.isValid = !syncErrors.length
  state.isLoading = false
}

const RULES = Object.keys(VALIDATIONS)

function isRule (rule, validations, form, key) {
  return validations[form] && validations[form][key] && validations[form][key][rule]
}

function getMessage (rule, messages, form, key) {
  return messages && messages[form] && messages[form][key] && messages[form][key][rule]
}

function getError (rule, value, msg, field) {
  return VALIDATIONS[rule](value, msg, field)
}

export function getSyncErrors (validations, messages, form, key, value) {
  // TO-DO/issue: change to an immutable approach?
  let errors = []

  RULES.some(rule => {
    if (isRule(rule, validations, form, key) && rule !== 'customAsync') {
      const msg = getMessage(rule, messages, form, key)
      const error = getError(rule, value, msg, validations[form][key])

      if (error) errors = [ ...errors, error ]
    }
  })

  return errors
}

export async function getAsyncErrors (validations, messages, form, key, value) {
  const msg = getMessage('customAsync', messages, form, key)
  const error = await getError('customAsync', value, msg, validations[form][key])

  return error
}
