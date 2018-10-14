export const setMessages = (source, newMessages) => {
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

function setWatcher (dataKey, input) {
  this.$watch(dataKey.concat('.', input), value => {
    this.validations = this.$validator.validate(this.validations, this.messages, dataKey, input, value)
  })
}

function setFormValidations (data, keyForm, validation) {
  return {
    ...this.validations,
    ...this.$validator.init(data, keyForm, validation)
  }
}

export function setValidations (validation) {
  const { validations = {}, messages = {}, ...data } = this.$data

  Object.entries(data).forEach(([dataKey, dataValue]) => {
    Object.keys(validation).forEach(validationKey => {
      if (validationKey === dataKey) {
        for (const input in dataValue) setWatcher.call(this, dataKey, input)

        this.validations = setFormValidations.call(this, dataValue, dataKey, validation[dataKey])
      }
    })
  })

  this.$validator.setListenersTouch.call(this, this.validations, this.messages)
}
