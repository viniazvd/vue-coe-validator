import { getContext } from '../support/services/context'
import { setProxy, setListenersTouch } from '../support/services'
import { resetForm } from '../support/services/reset'

export default function (formToReset) {
  const vm = getContext.call(this)

  const isEnv = process.env.NODE_ENV === 'development'
  const hasForm = Object.keys(vm.validations).includes(formToReset)

  if (formToReset && !hasForm && isEnv) {
    console.warn(`it was not possible to reset the ${formToReset} of a form that does not exist.`)
    return
  }
  if (!formToReset) formToReset = Object.keys(vm.validations)[0]

  vm.validations = Object
    .entries(vm.validations)
    .reduce((accForms, [form, fields]) => {
      form === formToReset
        ? accForms[form] = resetForm(fields)
        : accForms[form] = fields

      return accForms
    }, {})

  setProxy.call(vm)

  vm.$validator.validateOnBlur && setListenersTouch.call(vm)
}
