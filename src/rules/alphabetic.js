export default function (value, msg) {
  return !Array.isArray(value) && !/^[a-zA-Z]*$/.test(value) && (msg || 'Precisa ser alphabetic')
}
