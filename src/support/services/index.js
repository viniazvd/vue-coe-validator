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

export function initialForm (data, form, validation) {
  if (!form) form = Object.keys(validation)

  const defaultState = {
    isTouched: false,
    isDirty: false,
    isFilled: false,
    isValid: false,
    errors: []
  }

  const createForm = formName => Object.entries(data).reduce((initialForm, [key, value]) => {
    const filled = { isFilled: !!value }
    const dirted = { isDirty: !!value }
    const validations = (validation && validation[key]) || (validation && validation[formName] && validation[formName][key])

    initialForm[key] = { ...defaultState, ...dirted, ...filled, ...validations }

    return initialForm
  }, {})

  // initialize by directive
  if (Array.isArray(form)) {
    let initialForm = {}

    form.forEach(formName => {
      initialForm = {
        ...initialForm,
        [formName]: createForm(formName)
      }
    })

    return initialForm
  }

  // initialized by library configuration object
  return { [form]: createForm({}) }
}

export function setListenersTouch () {
  const componentID = Object.keys(this.$validator.context.components)[Object.keys(this.$validator.context.components).length - 1]
  const vm = this.$validator.context.components[componentID]

  // dynamically records listeners to activate touch inputs
  vm.$nextTick(() => {
    const forms = vm.$el.querySelectorAll('form[id]')

    if (forms.length) {
      forms.forEach(form => {
        Array.from(form.elements).forEach((element, index) => {
          // register events only for those who have validation
          if (vm.validations[form.id][form[index].name]) {
            form[index].addEventListener('blur', () => vm.$handlerBlur(form.id, element), { once: true })
          }
        })
      })
    } else {
      console.warn('follow the instructions in the documentation to correctly register the form')
    }
  })
}
