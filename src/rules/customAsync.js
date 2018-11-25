export default function (value, msg, validations, form, key) {
  const callbacks = validations[form][key]['customAsync']
  const promisses = callbacks.map(f => f(value))

  return Promise.all(promisses)
    .then(promises => promises.every(promise => promise))
    .then(valid => (!Array.isArray(callbacks) || !valid) && (msg || 'Campo inválido'))
}
