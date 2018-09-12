export default function (value, msg) {
  return !Array.isArray(value) && !/^\s*([0-9a-zA-Z]*)\s*$/.test(value) && (msg || 'Precisa ser um alpha')
}
