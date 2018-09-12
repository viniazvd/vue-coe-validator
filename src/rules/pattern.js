export default function (value, msg, forms, form, key) {
  const pattern = Object.keys(forms).length > 1 ? forms[form][key].pattern : this.forms[0][key].pattern

  return !pattern.test(value) && (msg || 'Campo inválido')
}
