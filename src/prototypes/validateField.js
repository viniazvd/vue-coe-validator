import { getContext } from '../support/services/context'
import { getSyncErrors, getAsyncErrors } from '../support/services/validateField'

function setStates (state, value, isTouched) {
  state.isChanged = true
  state.isTouched = true
  state.isDirty = !!value || isTouched
  state.isFilled = !!value
}

function validateField (key, form) {
  const vm = getContext.call(this)

  const validations = vm.validations
  if (!form) form = Object.keys(validations)[0]
  const messages = vm.messages
  const value = vm[form][key]

  const state = validations[form][key]

  state.isLoading = true

  const syncErrors = getSyncErrors(validations, messages, form, key, value)
  const isTouched = validations[form] && state && state.isTouched
  const hasCustomAsyncRule = state['customAsync'] && state['customAsync'].length

  setStates(state, value, isTouched)

  if (!hasCustomAsyncRule) {
    state.errors = syncErrors
    state.isValid = syncErrors.length <= 0
    state.isLoading = false
  }

  if (hasCustomAsyncRule && value) {
    getAsyncErrors(validations, messages, form, key, value)
      .then(asyncErrors => {
        // must be filtered because asyncErrors is a boolean false or string
        // this prevents a 'false' value within errors
        state.errors = [...syncErrors, asyncErrors].filter(error => error)
        state.isValid = state.errors.length <= 0
        state.isLoading = false
      })
  }

  // scenario:
  // -when the field has asynchronous validation
  // -field has 1 character typed and user erases (field is empty)
  if (hasCustomAsyncRule && !value) {
    state.isLoading = false
    state.isFilled = false
  }
}

export default validateField
