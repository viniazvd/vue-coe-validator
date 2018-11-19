import { setProxy, watchValidate } from '../support/services'
import { getContext } from '../support/services/context'
import { setFieldStates } from '../support/services/add'

function add (form, key, value, rules) {
  const vm = getContext.call(this)

  const addByDirective = typeof form === 'string'
  const addByUser = typeof form === 'object'

  if (addByDirective) {
    // prevents actions already taken
    if (!vm['validations'][form][key]) {
      setFieldStates.call(vm, form, key, value, rules)
      watchValidate.call(vm, form, key)
    }
  }

  if (addByUser) {
    Object.entries(form).forEach(([input, _rules]) => {
      // prevents actions already taken
      if (!vm['validations'][key][input]) {
        // key === formName
        setFieldStates.call(vm, key, input, value = '', _rules)
        watchValidate.call(vm, key, input)
      }
    })
  }

  setProxy.call(vm)
}

export default add
