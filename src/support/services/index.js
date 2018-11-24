import { getContext } from '../services/context'
import { validateField } from '../services/validate'
import * as VALIDATIONS from '../../rules'

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

export function getData () {
  /* eslint-disable */
  const { validations = {}, messages = {}, ...data } = this.$data
  /* eslint-enable */

  return data
}

export function watchValidate (formKey, input) {
  const unwatch = this.$watch(formKey.concat('.', input), value => {
    validateField.call(this, formKey, input, value)
  })

  this.$on('hook:beforeDestroy', unwatch)
}

export function setProxy () {
  // issue!?
  // setProxy works...
  // however, it creates a deep proxy reference.

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

export function addTouchListener (formName, inputElement, addByDirective) {
  // register events only for those who have validation
  const hasValidation = inputElement && this.validations[formName] && this.validations[formName][inputElement.name]

  // check if addEventListener has already been set in the conditional below? worth it?

  if (hasValidation || addByDirective) {
    inputElement.addEventListener('blur', () => forceValidation.call(this, formName, inputElement), { once: true })
  }
}

export function setListenersTouch () {
  const vm = getContext.call(this)

  // dynamically records listeners to activate touch inputs
  vm.$nextTick(() => {
    // TODO: find reason for not running tests
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

const RULES = Object.keys(VALIDATIONS)

function hasRule (rule, validations, form, key) {
  return validations[form] && validations[form][key] && validations[form][key][rule]
}

function getMessage (rule, messages, form, key) {
  return messages && messages[form] && messages[form][key] && messages[form][key][rule]
}

function getError (rule, validations, form, key, value, msg) {
  return VALIDATIONS[rule](value, msg, validations, form, key)
}

export function getErrors (validations, messages, form, key, value) {
  let errors = []

  RULES.some(rule => {
    if (hasRule(rule, validations, form, key)) {
      const msg = getMessage(rule, messages, form, key)
      const error = getError(rule, validations, form, key, value, msg)

      if (error) errors = [ ...errors, error ]
    }
  })

  return errors
}