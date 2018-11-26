import { getContext } from '../support/services/context'

export default function (form) {
  const vm = getContext.call(this)

  if (!form) form = Object.keys(vm.validations)[0]

  const fields = Object.keys(vm.validations[form])
  const isFormValid = fields.every(field => vm.validations[form][field].isValid)

  return new Promise(resolve => resolve(isFormValid))
}
