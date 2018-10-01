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

export function setWatcher (dataKey, input) {
  this.$watch(dataKey.concat('.', input), value => {
    this.validations = this.$validator.validate(this.validations, this.messages, dataKey, input, value)
  })
}

export function setFormValidations (objectValidations, keyForm) {
  return {
    ...this.validations,
    ...this.$validator.init(objectValidations, keyForm)
  }
}
