export const defaultForm = (data, defaultFormName) => {
  return Object.keys(data)[0] || defaultFormName
}

export const mutateMessages = (source, newMessages) => {
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
