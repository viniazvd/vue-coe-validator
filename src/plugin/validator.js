function isValid (pattern, required, value) {
  if (pattern) {
    return pattern.test(value)
  }

  return required && !!value
}

export const validator = function (Vue, options) {
  Vue.prototype.$init = function (form, name, rules) {
    const defaultState = {
      errorMsg: 'Campo obrigatório',
      isTouched: false,
      isDirty: false,
      isFilled: false,
      isValid: false
    } 
    
    const newForm = {
      [name]: Object.entries(form).reduce((form, [key, value]) => {
        const isFilled = { isFilled: !!value }
        form[key] = { key, value, ...defaultState, ...isFilled, ...rules[key] }

        return form
      }, {})
    }

    this.forms = { ...this.forms, ...newForm }
    this.initialForm = { ...this.initialForm, ...newForm }
  }

  Vue.prototype.$getValue = function (input, form) {
    const value = Object.keys(this.forms).length > 1 ? this.forms[form][input].value : this.forms[0][input].value
    
    return value
  }

  Vue.prototype.$synchronize = function (value, key, form = '') {
    if (!form) { console.warn('select a form to synchronize the data.') }

    const pattern = Object.keys(this.forms).length > 1 ? this.forms[form][key].pattern : this.forms[0][key].pattern
    const required = Object.keys(this.forms).length > 1 ? this.forms[form][key].required : this.forms[0][key].required

    const changed = {
      ...this.forms[form][key],
      value,
      isTouched: true,
      isDirty: true,
      isFilled: !!value,
      isValid: isValid(pattern, required, value)
    }
    
    const inputUpdated = { [key]: changed }
    const formToUpdate = this.forms[form]

    this.forms = { 
      ...this.forms, 
      [form]: { 
        ...formToUpdate, 
        ...inputUpdated 
      } 
    }
  }

  Vue.prototype.$hasError = function (key, form = Object.keys(this.forms)[0]) {
    const input = Object.keys(this.forms).length > 1 ? this.forms[form][key] : form

    return input.isTouched && !input.isValid && input.errorMsg
  }

  Vue.prototype.$allTouched = function (form = Object.keys(this.forms)[0]) {
    const formTouched = Object.entries(this.forms[form]).reduce((acc, [key, value]) => {
      acc = { ...value, isTouched: true }

      return acc
    }, {})

    console.log(formTouched)
    this.forms = { 
      ...this.forms, 
      [form]: { 
        ...formTouched 
      }
    }
  }
}
