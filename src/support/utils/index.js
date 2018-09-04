export const isValid = (pattern, required, value) => {
  if (pattern) {
    return pattern.test(value)
  }

  return required && !!value
}

export const defaultForm = (data, defaultFormName) => {
  return Object.keys(data)[0] || defaultFormName
}
