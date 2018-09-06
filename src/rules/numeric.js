export default function (value) {
  return !Array.isArray(value) && !/^[0-9]*$/.test(value) && 'Precisa ser numeric'
}
