import { getContext, validateField } from '../support/services'

export default function (form) {
  const vm = getContext.call(this)

  if (!form) form = Object.keys(vm.validations)[0]

  return new Promise(resolve => {
    let errors = []

    Object.entries(vm.validations)
      .filter(([formName]) => formName === form)
      .forEach(([_, states]) => {
        for (const key of Object.keys(states)) {
          validateField.call(vm, form, key, vm[form][key])
          errors.push(vm.validations[form][key].isValid)
        }
      })

    const isFormValid = errors.every(error => error)

    resolve(isFormValid)
  })
}
