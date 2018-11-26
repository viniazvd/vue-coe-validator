import { getContext } from '../services/context'
import { getSyncErrors, getAsyncErrors } from './'

export function validateField (form, key, value) {
  const vm = getContext.call(this)

  const validations = vm.validations
  const messages = vm.messages

  const state = validations[form][key]

  state.isLoading = true

  const syncErrors = getSyncErrors(validations, messages, form, key, value)
  const isTouched = validations[form] && state && state.isTouched
  const hasCustomAsyncRule = state['customAsync']

  state.errors = syncErrors
  state.isLoading = (hasCustomAsyncRule && !!hasCustomAsyncRule.length) || false
  state.isChanged = true
  state.isTouched = true
  state.isDirty = !!value || isTouched
  state.isFilled = !!value
  state.isValid = syncErrors.length <= 0

  if (hasCustomAsyncRule && value) {
    getAsyncErrors(validations, messages, form, key, value)
      .then(asyncErrors => {
        state.errors = [...syncErrors, asyncErrors]
        state.isLoading = false
        state.isValid = [...syncErrors, asyncErrors].length <= 0
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
