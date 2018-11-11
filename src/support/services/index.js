import RULES from '../../rules/types'
import * as VALIDATIONS from '../../rules'

export function getSnapshots () {
  const validation = this.$options.validation

  /* eslint-disable */
  const { validations = {}, messages = {}, ...data } = this.$data
  /* eslint-enable */

  return Object.entries(data).reduce((acc, [dataKey, dataValue]) => {
    Object.keys(validation).forEach(validationKey => (validationKey === dataKey) && (acc[dataKey] = dataValue))

    return acc
  }, {})
}

export function setContext () {
  this.$validator.context.components = {
    ...this.$validator.context.components,
    [this._uid]: this
  }
}

export function setSnapshot () {
  this.$validator.snapshots.components = {
    ...this.$validator.snapshots.components,
    [this._uid]: getSnapshots.call(this)
  }
}

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

export function getContext () {
  const vm = this.$validator || this
  const componentID = Object.keys(vm.context.components)[Object.keys(vm.context.components).length - 1]

  return vm.context.components[componentID]
}

export function getValidation (validation, form) {
  return !validation
    ? this.$options.validation
    : {
      ...this.validations,
      [form]: {
        ...this.validations[form],
        ...validation
      }
    }
}

const defaultState = {
  isTouched: false,
  isDirty: false,
  isFilled: false,
  isValid: false,
  errors: []
}

function setFormStates (data, form, validation) {
  return {
    [form]: Object.entries(data).reduce((initialForm, [key, value]) => {
      const filled = { isFilled: !!value }
      const dirted = { isDirty: !!value }
      const validations = validation && validation[key]

      if (validations !== undefined) {
        initialForm[key] = { ...defaultState, ...dirted, ...filled, ...validations }
      }

      return initialForm
    }, {})
  }
}

export function makeInitialForm (validation, formKey, formValue) {
  if (Object.keys(validation).includes(formKey)) {
    this.validations = {
      ...this.validations,
      ...setFormStates(
        formValue,
        formKey, (
          validation[formKey] || // when validation is created automatically
          validation // when validation is created dynamically
        )
      )
    }
  }
}

function watchValidate (formKey, input) {
  this.$watch(formKey.concat('.', input), value => {
    validate.call(this, formKey, input, value)
  })
}

export function setValidations (validation, form, formKey, formValue) {
  Object.keys(validation).forEach(validationKey => {
    if ((form && form === formKey) || validationKey === formKey) {
      // set validator for each input
      for (const input in formValue) watchValidate.call(this, formKey, input)
    }
  })
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

    validate.call(this, form, key, value || '')
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

const defaultStates = ['isDirty', 'isFilled', 'isTouched', 'isValid']

function setValue (state, value) {
  if (defaultStates.includes(state)) return false
  if (state === 'errors') return []

  return value
}

export function resetForm (fields) {
  return Object.entries(fields).reduce((accFields, [key, states]) => {
    accFields[key] = Object.entries(states).reduce((accStates, [state, value]) => {
      accStates[state] = setValue(state, value)

      return accStates
    }, {})

    return accFields
  }, {})
}

function getErrors (validations, messages, form, key, value) {
  const hasRule = rule => validations[form] && validations[form][key] && validations[form][key][rule]
  const getMessage = rule => messages && messages[form][key] && messages[form][key][rule]
  const getError = (rule, msg) => VALIDATIONS[rule](value, msg, validations, form, key)

  let errors = []

  RULES.some(rule => {
    if (hasRule(rule)) {
      const msg = getMessage(rule)
      const error = getError(rule, msg)

      if (error) errors = [ ...errors, error ]
    }
  })

  return errors
}

function validate (form, key, value) {
  const vm = getContext.call(this)

  const validations = vm.validations
  const messages = vm.messages

  const errors = getErrors(validations, messages, form, key, value)
  const isTouched = vm.validations[form] && vm.validations[form][key] && vm.validations[form][key].isTouched

  vm.validations[form][key] = {
    ...validations[form][key],
    errors,
    isTouched: true,
    isDirty: !!value || isTouched,
    isFilled: !!value,
    isValid: errors.length <= 0
  }
}

export const validateField = validate
