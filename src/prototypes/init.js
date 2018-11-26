import { getData, setProxy } from '../support/services'
import { getContext } from '../support/services/context'
import { setFormFields, setValidations } from '../support/services/init'

function init () {
  const vm = getContext.call(this)
  const data = getData.call(vm)
  const validation = vm.$options.validation

  const dataWithValidation = ([key]) => !!(validation[key] && Object.keys(validation[key]).length)

  Object
    .entries(data)
    .filter(dataWithValidation)
    .forEach(([form, data]) => {
      setFormFields.call(vm, form, data, validation[form])
      setValidations.call(vm, form, validation[form])
    })

  setProxy.call(vm)
}

export default init
