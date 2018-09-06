function isPattern (value, forms, form, key) {
  const pattern = Object.keys(this.forms).length > 1 ? this.forms[form][key].pattern : this.forms[0][key].pattern

  return !pattern.test(value) && 'Campo inválido'
}

export default isPattern
