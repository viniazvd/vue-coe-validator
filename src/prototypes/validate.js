import { getContext } from '../support/services/context'
import { validateField } from '../support/services/validate'

export default function (form) {
  const vm = getContext.call(this)

  if (!form) form = Object.keys(vm.validations)[0]

  return new Promise(resolve => {
    const isFormValid = Object
      .keys(vm.validations[form])
      .reduce((errors, field) => {
        validateField.call(vm, form, field, vm[form][field])
        errors = [ ...errors, vm.validations[form][field].isValid ]

        return errors
      }, [])
      .every(error => error)

    resolve(isFormValid)
  })
}
