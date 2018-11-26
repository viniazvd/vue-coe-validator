import { getContext } from './context'

const defaultStates = ['isLoading', 'isChanged', 'isDirty', 'isFilled', 'isTouched', 'isValid']

function resetState (state, value) {
  if (defaultStates.includes(state)) return false
  if (state === 'errors') return []

  return value
}

export function resetFieldStates (form, field, states) {
  const vm = getContext.call(this)

  vm.validations[form][field] = Object
    .entries(states)
    .reduce((acc, [state, value]) => {
      acc[state] = resetState(state, value)

      return acc
    }, {})
}
