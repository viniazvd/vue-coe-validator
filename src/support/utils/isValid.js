function isValid (pattern, required, value) {
  if (pattern) {
    return pattern.test(value)
  }

  return required && !!value
}

export default isValid
