import { setProxy } from '../support/services'
import { getContext } from '../support/services/context'
import { makeInitialForm, getValidation, setValidations } from '../support/services/init'

function add (__validation, form) {
  const vm = getContext.call(this)

  const validation = getValidation.call(vm, __validation, form)

  /* eslint-disable */
  const { validations = {}, messages = {}, ...data } = vm.$data
  /* eslint-enable */

  const dataWithValidation = Object.entries(data).filter(([formKey]) => formKey === form)

  dataWithValidation.forEach(([_, value]) => setValidations.call(vm, validation, form, value))
  makeInitialForm.call(vm, validation, form, dataWithValidation[0][1])

  setProxy.call(vm)
}

export default add
