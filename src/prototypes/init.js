import { getContext, getValidation, makeInitialForm, setValidations, setProxy } from '../support/services'

function init (__validation, form) {
  const vm = getContext.call(this)

  const validation = getValidation.call(vm, __validation, form)

  /* eslint-disable */
  const { validations = {}, messages = {}, ...data } = vm.$data
  /* eslint-enable */

  Object
    .entries(data)
    .forEach(([formKey, formValue]) => {
      makeInitialForm.call(vm, validation, formKey, formValue)
      setValidations.call(vm, validation, form, formKey, formValue)
    })

  setProxy.call(vm)
}

export default init
