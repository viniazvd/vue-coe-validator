import { setProxy } from '../support/services'
import { getContext } from '../support/services/context'
import { makeInitialForm, setValidations } from '../support/services/init'

function init () {
  const vm = getContext.call(this)

  const validation = vm.$options.validation

  /* eslint-disable */
  const { validations = {}, messages = {}, ...data } = vm.$data
  /* eslint-enable */

  // prevents unnecessary resources/loops
  const dataWithValidation = ([key]) => !!(validation[key] && Object.keys(validation[key]).length)

  Object
    .entries(data)
    .filter(dataWithValidation)
    .forEach(([formKey, formValue]) => {
      makeInitialForm.call(vm, validation, formKey, formValue)
      setValidations.call(vm, validation, formKey, formValue)
    })

  setProxy.call(vm)
}

export default init
