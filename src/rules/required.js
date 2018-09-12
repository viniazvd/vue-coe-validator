export default function (value, msg) {
  return !value && (msg || 'Field is required')
}
