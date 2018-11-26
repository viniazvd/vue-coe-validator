import { getContext } from '../support/services/context'
import { setProxy, setListenersTouch } from '../support/services'
import { resetFieldStates } from '../support/services/reset'

export default function (formToReset) {
  const vm = getContext.call(this)

  const isEnv = process.env.NODE_ENV === 'development'
  const hasForm = Object.keys(vm.validations).includes(formToReset)

  if (formToReset && !hasForm && isEnv) {
    console.warn(`it was not possible to reset the ${formToReset} of a form that does not exist.`)
    return
  }

  if (!formToReset) formToReset = Object.keys(vm.validations)[0]

  Object
    .entries(vm.validations[formToReset])
    .forEach(([field, states]) => resetFieldStates.call(this, formToReset, field, states))

  setProxy.call(vm)

  vm.$validator.validateOnBlur && setListenersTouch.call(vm)
}
