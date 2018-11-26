import { setProxy, setValidate } from '../support/services'
import { getContext } from '../support/services/context'
import { setField } from '../support/services/add'

function add (form, key, value, rules) {
  const vm = getContext.call(this)

  const addByDirective = typeof form === 'string'
  const addByUser = typeof form === 'object'

  if (addByDirective) {
    // prevents actions already taken
    if (!vm['validations'][form][key]) {
      setField.call(vm, form, key, value, rules)
      setValidate.call(vm, form, key)
    }
  }

  if (addByUser) {
    Object.entries(form).forEach(([input, rules]) => {
      // prevents actions already taken
      if (!vm['validations'][key][input]) {
        // key === formName
        setField.call(vm, key, input, value = '', rules)
        setValidate.call(vm, key, input)
      }
    })
  }

  setProxy.call(vm)
}

export default add
