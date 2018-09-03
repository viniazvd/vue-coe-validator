function isValid (pattern, required, value) {
  if (pattern) {
    return pattern.test(value)
  }

  return required && !!value
}

export const validator = function (Vue, options) {
  Vue.prototype.$init = function (form, name) {
    const defaultState = {
      $isTouched: false,
      $isDirty: false,
      $isFilled: false,
      $isValid: false
    } 
    
    const newForm = {
      [name]: Object.entries(form).reduce((form, [key, value]) => {
        form[key] = { key, value, ...defaultState }

        return form
      }, {})
    }

    this.forms = { ...this.forms, ...newForm }
    this.initialForm = { ...this.initialForm, ...newForm }
  }

  Vue.prototype.$synchronize = function ({ 
    form = '',
    key, 
    value, 
    required = false,
    pattern = '' 
  }) {
    if (!form) { console.warn('select a form to synchronize the data.') }
    const changed = {
      ...this.forms[form][key],
      value,
      $isTouched: true,
      $isDirty: true,
      $isFilled: !!value,
      $isValid: isValid(pattern, required, value)
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
