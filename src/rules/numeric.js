export default function (value, msg) {
  return !Array.isArray(value) && !/^[0-9]*$/.test(value) && (msg || 'Precisa ser numeric')
}
