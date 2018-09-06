export default function (value) {
  return !Array.isArray(value) && !/^[a-zA-Z]*$/.test(value) && 'Precisa ser alphabetic'
}
