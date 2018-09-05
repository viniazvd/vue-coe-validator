import { isValid, defaultForm } from '../utils'

export default {
  install (Vue, { defaultFormName }) {
    Vue.prototype.$init = function (data, rules, form = defaultFormName) {
      const defaultState = {
        errorMsg: 'Campo obrigatório',
        isTouched: false,
        isDirty: false,
        isFilled: false,
        isValid: false
      }

      const newForm = {
        [form]: Object.entries(data).reduce((form, [key, value]) => {
          const required = rules[key]['required']
          const pattern = rules[key]['pattern']

          const valid = { isValid: !!value && isValid(pattern, required, value) }
          const filled = { isFilled: !!value }

          form[key] = { key, value, ...defaultState, ...valid, ...filled, ...rules[key] }

          return form
        }, {})
      }

      this.forms = { ...this.forms, ...newForm }
      this.initialForm = { ...this.initialForm, ...newForm }
    }

    Vue.prototype.$touch = function (input, form = defaultForm(this.forms, defaultFormName)) {
      const { isTouched } = this.forms[form][input]

      // to prevent unnecessary checks
      if (!isTouched) {
        const inputToTouch = Object.entries(this.forms[form][input]).reduce((acc, [key, value]) => {
          acc[key] = key === 'isTouched' || value

          return acc
        }, {})

        const formToUpdate = this.forms[form]

        this.forms = {
          ...this.forms,
          [form]: {
            ...formToUpdate,
            [input]: { ...inputToTouch }
          }
        }
      }
    }

    Vue.prototype.$getValue = function (input, form = defaultForm(this.forms, defaultFormName)) {
      const isFormLoad = Object.keys(this.forms).length

      if (isFormLoad) {
        const value = Object.keys(this.forms).length > 1 ? this.forms[form][input].value : this.forms[0][input].value

        return value
      }
    }

    Vue.prototype.$synchronize = function (e) {
      const value = e.target.value
      const key = e.target.name
      const formName = e.target.form.name
      const form = defaultForm(this.forms, formName || defaultFormName)

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

    Vue.prototype.$hasError = function (key, form = defaultForm(this.forms, defaultFormName)) {
      const input = Object.keys(this.forms).length > 1 ? this.forms[form][key] : form

      return input.isTouched && !input.isValid && input.errorMsg
    }

    Vue.prototype.$allTouched = function (form = defaultForm(this.forms, defaultFormName)) {
      const formToTouch = Object.entries(this.forms[form]).reduce((acc, [key, value]) => {
        acc[key] = { ...value, isTouched: true }

        return acc
      }, {})

      const formToUpdate = this.forms[form]

      this.forms = {
        ...this.forms,
        [form]: {
          ...formToUpdate,
          ...formToTouch
        }
      }
    }

    Vue.prototype.$isValidForm = function (form = defaultForm(this.forms, defaultFormName)) {
      const isValid = Object.entries(this.forms[form]).every(([key, { isValid }]) => isValid)

      return isValid
    }
  }
}
