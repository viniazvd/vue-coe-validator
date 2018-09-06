export default function (value) {
  return !Array.isArray(value) && !/^\s*([0-9a-zA-Z]*)\s*$/.test(value) && 'Precisa ser um alpha'
}
