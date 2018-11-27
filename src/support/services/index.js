import { getContext } from '../services/context'

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

export const defaultState = {
  isLoading: false,
  isChanged: false,
  isTouched: false,
  isDirty: false,
  isFilled: false,
  isValid: false,
  errors: []
}

export function getData () {
  /* eslint-disable */
  const { validations = {}, messages = {}, ...data } = this.$data
  /* eslint-enable */

  return data
}

export function setValidation (form, field) {
  const unwatch = this.$watch(form.concat('.', field), () => {
    this.$validator.validateField(field, form)
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

function forceValidation (form, element, field = element.name, value = element.value) {
  const vm = getContext.call(this)

  const isTouched = vm.validations[form] && vm.validations[form][field] && vm.validations[form][field].isTouched

  // to prevent unnecessary checks
  if (vm.validations && !isTouched) {
    vm.validations[form][element.name].isTouched = true

    this.$validator.validateField(field, form)
  }
}

export function addTouchListener (formName, inputElement) {
  const inputName = inputElement && inputElement.getAttribute('name')

  // register events only for those who have validation
  const hasValidation = inputElement && this.validations[formName] && this.validations[formName][inputName]

  // check if addEventListener has already been set in the conditional below? worth it?

  if (hasValidation) {
    inputElement.addEventListener('blur', () => forceValidation.call(this, formName, inputElement), { once: true })
  }
}

export function setListener (form, field) {
  const vm = getContext.call(this)

  const inputElement = vm.$el.querySelector(`form[name="${form}"] [name="${field}"] > input`)
  addTouchListener.call(vm, form, inputElement)
}

export function setListeners () {
  const vm = getContext.call(this)

  // dynamically records listeners to activate touch inputs
  vm.$nextTick(() => {
    // TO-DO. issue: does not work in tests
    const formListNode = vm.$el.querySelectorAll('form[name]')

    if (formListNode.length) {
      formListNode.forEach(NodeForm => {
        const form = NodeForm.getAttribute('name')

        Array
          .from(NodeForm)
          .filter(node => !!node.attributes.name)
          .forEach(inputElement => addTouchListener.call(vm, form, inputElement))
      })
    } else {
      console.warn('follow the instructions in the documentation to correctly register the form')
    }
  })
}
