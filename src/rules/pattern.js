export default function (value, msg, forms, form, key) {
  const pattern = forms[form][key].pattern

  return !pattern.test(value) && (msg || 'Campo inválido')
}
