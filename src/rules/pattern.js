export default function (value, msg, field) {
  const pattern = field['pattern']

  return value && !pattern.test(value) && (msg || 'Campo inválido')
}
