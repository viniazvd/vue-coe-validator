import { resetForm, setListenersTouch } from '../support/services'

export default function (formToReset) {
  const componentID = Object.keys(this.context.components)[Object.keys(this.context.components).length - 1]
  const vm = this.context.components[componentID]

  if (formToReset && !Object.keys(vm.validations).includes(formToReset)) {
    console.warn('it was not possible to reset the $ of a form that does not exist.')
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

  vm.$validator.validateOnBlur && setListenersTouch.call(vm)
}
