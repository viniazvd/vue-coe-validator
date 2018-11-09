function watchValidate (dataKey, input) {
  this.$watch(dataKey.concat('.', input), value => {
    this.validations = this.$validator.validate(this.validations, this.messages, dataKey, input, value)
  })
}

function setValidations (validation, form) {
  const instance = this || this.$validator
  const componentID = Object.keys(instance.context.components)[Object.keys(instance.context.components).length - 1]
  const vm = instance.context.components[componentID]

  if (!validation) {
    validation = vm.$options.validation
  } else {
    validation = {
      ...vm.$options.validation,
      [form]: {
        ...vm.$options.validation[form],
        ...validation
      }
    }
  }

  /* eslint-disable */
  const { validations = {}, messages = {}, ...data } = vm.$data
  /* eslint-enable */

  Object.entries(data).forEach(([dataKey, dataValue]) => {
    Object.keys(validation).forEach(validationKey => {
      if ((form && form === dataKey) || validationKey === dataKey) {
        // set validator for each input
        for (const input in dataValue) watchValidate.call(vm, dataKey, input)

        vm.validations = {
          ...vm.validations,
          ...vm.$validator.init(
            dataValue,
            dataKey, (
              validation[dataKey] || // when the validation is created automatically
              validation // quando a validação é criada programaticamente
            )
          )
        }
      }
    })
  })
}

export default setValidations
