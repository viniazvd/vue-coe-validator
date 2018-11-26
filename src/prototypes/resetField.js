import { getContext } from '../support/services/context'
import { setListener, hasField } from '../support/services'

const defaultStates = ['isLoading', 'isChanged', 'isDirty', 'isFilled', 'isTouched', 'isValid']

function resetState (state, value) {
  if (defaultStates.includes(state)) return false
  if (state === 'errors') return []

  return value
}

function resetField (field, form) {
  const vm = getContext.call(this)

  if (!form) form = Object.keys(vm.validations)[0]

  if (!hasField.call(vm, form, field)) {
    console.warn(`it was not possible to reset the ${form} of a form that does not exist.`)
    return false
  }

  const states = vm.validations[form][field]

  vm.validations[form][field] = Object
    .entries(states)
    .reduce((acc, [state, value]) => {
      acc[state] = resetState(state, value)

      return acc
    }, {})

  vm.$validator.validateOnBlur && setListener.call(vm, form, field)
}

export default resetField
