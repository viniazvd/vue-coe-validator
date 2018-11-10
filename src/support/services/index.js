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
    this.validations = this.$validator.validate(this.validations, this.messages, formKey, input, value)
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

function forceValidation (form, element) {
  const key = element.name
  const value = element.value

  const componentID = Object.keys(this.$validator.context.components)[Object.keys(this.$validator.context.components).length - 1]
  const vm = this.$validator.context.components[componentID]

  const isTouched = vm.validations[form] && vm.validations[form][key] && vm.validations[form][key].isTouched

  // to prevent unnecessary checks
  if (vm.validations && !isTouched) {
    const inputToTouch = Object.entries(vm.validations[form][key]).reduce((acc, [key, value]) => {
      acc[key] = key === 'isTouched' || value

      return acc
    }, {})

    const formToUpdate = vm.validations[form]

    const validationWithTouchedField = {
      ...vm.validations,
      [form]: {
        ...formToUpdate,
        [key]: { ...inputToTouch }
      }
    }

    return this.$validator.validate(validationWithTouchedField, vm.messages, form, key, value || '')
  }
}

function validateField (form, element) {
  this.validations = {
    ...this.validations,
    ...forceValidation.call(this, form, element)
  }
}

function addTouchListener (formName, input) {
  // register events only for those who have validation
  if (this.validations[formName] && this.validations[formName][input.name]) {
    input.addEventListener('blur', () => validateField.call(this, formName, input), { once: true })
  }
}

export function setListenersTouch () {
  const componentID = Object.keys(this.$validator.context.components)[Object.keys(this.$validator.context.components).length - 1]
  const vm = this.$validator.context.components[componentID]

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
