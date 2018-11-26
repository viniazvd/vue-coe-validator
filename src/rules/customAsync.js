export default function (value, msg, field) {
  const callbacks = field['customAsync']
  const promisses = callbacks.map(f => f(value))

  return Promise.all(promisses)
    .then(promises => promises.every(promise => promise))
    .then(valid => (!Array.isArray(callbacks) || !valid) && (msg || 'Campo inválido'))
}
