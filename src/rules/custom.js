export default function (value, msg, validations, form, key) {
  const callbacks = validations[form][key]['custom']
  const valid = callbacks.every(f => f(value))

  return (!Array.isArray(callbacks) || !valid) && (msg || 'Campo inválido')
}
