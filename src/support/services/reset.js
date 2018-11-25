const defaultStates = ['isLoading', 'isChanged', 'isDirty', 'isFilled', 'isTouched', 'isValid']

function setValue (state, value) {
  if (defaultStates.includes(state)) return false
  if (state === 'errors') return []

  return value
}

export function resetForm (fields) {
  return Object.entries(fields).reduce((accFields, [key, states]) => {
    accFields[key] = Object.entries(states).reduce((accStates, [state, value]) => {
      accStates[state] = setValue(state, value)

      return accStates
    }, {})

    return accFields
  }, {})
}
