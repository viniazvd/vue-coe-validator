export default function (value, forms, form, key) {
  const pattern = Object.keys(forms).length > 1 ? forms[form][key].pattern : this.forms[0][key].pattern

  return !pattern.test(value) && 'Campo inválido'
}
