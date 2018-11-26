import { getContext } from '../support/services/context'

function touch (key, form) {
  const vm = getContext.call(this)

  if (!form) form = Object.keys(vm.validations)[0]

  const field = vm.validations && vm.validations[form] && vm.validations[form][key]

  const hasProperty = field && field.hasOwnProperty('isTouched')
  const isEnv = process.env.NODE_ENV === 'development'

  if (!hasProperty && isEnv) {
    console.warn('property not found.')
    return
  }

  vm.validations[form][key].isTouched = true
}
export default touch
