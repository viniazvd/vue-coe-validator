function isValid (pattern, required, value) {
  if (pattern) {
    return pattern.test(value)
  }

  return required && !!value
}

export const validator = function (Vue, options) {
  Vue.prototype.$init = function (form, name, rules) {
    const defaultState = {
      isTouched: false,
      isDirty: false,
      isFilled: false,
      isValid: false
    } 
    
    const newForm = {
      [name]: Object.entries(form).reduce((form, [key, value]) => {
        const isFilled = { $isFilled: !!value }
        form[key] = { key, value, ...defaultState, ...isFilled, ...rules[key] }

        return form
      }, {})
    }

    this.forms = { ...this.forms, ...newForm }
    this.initialForm = { ...this.initialForm, ...newForm }
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
}
