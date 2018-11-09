import { setListenersTouch } from '../support/services'

export default function (formToReset) {
  const defaultStates = ['isDirty', 'isFilled', 'isTouched', 'isValid']

  const componentID = Object.keys(this.context.components)[Object.keys(this.context.components).length - 1]
  const vm = this.context.components[componentID]

  if (formToReset && !Object.keys(vm.validations).includes(formToReset)) {
    console.warn('it was not possible to reset the $ of a form that does not exist.')
    return
  }
  if (!formToReset) formToReset = Object.keys(vm.validations)[0]

  function setValue (state, value) {
    if (defaultStates.includes(state)) return false
    if (state === 'errors') return []

    return value
  }

  vm.validations = Object
    .entries(vm.validations)
    .filter(([formName]) => formName === formToReset)
    .reduce((acc, [form, fields]) => {
      acc[form] = Object.entries(fields).reduce((accFields, [key, states]) => {
        accFields[key] = Object.entries(states).reduce((accStates, [state, value]) => {
          accStates[state] = setValue(state, value)

          return accStates
        }, {})

        return accFields
      }, {})

      return acc
    }, {})

  vm.$validator.validateOnBlur && setListenersTouch.call(vm)
}
