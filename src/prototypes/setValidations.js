function watchValidate (dataKey, input) {
  this.$watch(dataKey.concat('.', input), value => {
    this.validations = this.$validator.validate(this.validations, this.messages, dataKey, input, value)
  })
}

function watchDynamicFields (form) {
  this.$watch(form, (fields, oldFields) => {
    if (Object.keys(fields).length !== Object.keys(oldFields).length) setValidations.call(this)
  })
}

function setValidations (validation, form) {
  if (!validation) validation = this.$options.validation

  /* eslint-disable */
  const { validations = {}, messages = {}, ...data } = this.$data
  /* eslint-enable */

  Object.entries(data).forEach(([dataKey, dataValue]) => {
    Object.keys(validation).forEach(validationKey => {
      if ((form && form === dataKey) || validationKey === dataKey) {
        // if new fields are added dynamically to the form, set the validations again
        watchDynamicFields.call(this, dataKey)

        // set validator for each input
        for (const input in dataValue) watchValidate.call(this, dataKey, input)

        // validation[dataKey] = when the validation is created automatically
        // validation = quando a validação é criada programaticamente
        this.validations = {
          ...this.validations,
          ...this.$validator.init(dataValue, dataKey, (validation[dataKey] || validation))
        }
      }
    })
  })
}

export default setValidations
