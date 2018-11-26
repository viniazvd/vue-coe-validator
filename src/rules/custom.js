export default function (value, msg, field) {
  const callbacks = field['custom']
  const valid = callbacks.every(f => f(value))

  return (!Array.isArray(callbacks) || !valid) && (msg || 'Campo inválido')
}
