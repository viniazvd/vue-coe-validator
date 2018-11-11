import { getContext } from '../services/context'
import { validateField } from '../services/validate'

export function setMessages (source, newMessages) {
  for (let form of Object.values(source)) {
    for (let input of Object.values(form)) {
      for (let messageKey of Object.keys(input)) {
        if (newMessages[messageKey]) {
          input[messageKey] = newMessages[messageKey]
        }
      }
    }
  }
}

export function setProxy () {
  const validationsProxy = new Proxy(this.validations, {
    deleteProperty (target, prop) {
      if (prop in target) {
        process.env.NODE_ENV === 'development' && console.warn(`you can not remove validations property`)

        return true
      }
    }
  })

  this.validations = validationsProxy
}

function forceValidation (form, element, key = element.name, value = element.value) {
  const vm = getContext.call(this)

  const isTouched = vm.validations[form] && vm.validations[form][key] && vm.validations[form][key].isTouched

  // to prevent unnecessary checks
  if (vm.validations && !isTouched) {
    vm.validations[form][element.name].isTouched = true

    validateField.call(this, form, key, value || '')
  }
}

function addTouchListener (formName, input) {
  // register events only for those who have validation
  if (this.validations[formName] && this.validations[formName][input.name]) {
    input.addEventListener('blur', () => forceValidation.call(this, formName, input), { once: true })
  }
}

export function setListenersTouch () {
  const vm = getContext.call(this)

  // dynamically records listeners to activate touch inputs
  vm.$nextTick(() => {
    const NodeListForms = vm.$el.querySelectorAll('form[name]')

    if (NodeListForms.length) {
      NodeListForms.forEach(NodeForm => {
        const formName = NodeForm.getAttribute('name')

        Array
          .from(NodeForm)
          .forEach(input => addTouchListener.call(vm, formName, input))
      })
    } else {
      console.warn('follow the instructions in the documentation to correctly register the form')
    }
  })
}
