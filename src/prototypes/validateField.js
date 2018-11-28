import { getContext } from '../support/services/context'
import { hasCustomAsyncRule, setActiveFields, setInactiveFields, getSyncErrors, getAsyncErrors } from '../support/services/validateField'

function validateField (key, form) {
  const vm = getContext.call(this)

  const validations = vm.validations
  if (!form) form = Object.keys(validations)[0]
  const messages = vm.messages
  const value = vm[form][key]

  const state = validations[form][key]

  state.isLoading = true

  const syncErrors = getSyncErrors(validations, messages, form, key, value)
  const isTouched = validations[form] && (state && state.isTouched)

  setActiveFields(state, value, isTouched, syncErrors)

  if (!hasCustomAsyncRule(state) && value) setInactiveFields(state, syncErrors)

  if (hasCustomAsyncRule(state)) {
    getAsyncErrors(validations, messages, form, key, value)
      .then(asyncErrors => {
        // must be filtered because asyncErrors is a boolean false or string
        // this prevents a 'false' value within errors
        state.errors = [...syncErrors, asyncErrors].filter(Boolean)
        state.isValid = !state.errors.length
        state.isLoading = false
      })
  }
}

export default validateField
