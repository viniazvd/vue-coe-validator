import { defaultForm } from '../utils'

import RULES from '../../rules/types'
import VALIDATIONS from '../../rules'

export default {
  install (Vue, { defaultFormName }) {
    Vue.prototype.$init = function (data, rules, form = defaultFormName) {
      const defaultState = {
        isTouched: false,
        isDirty: false,
        isFilled: false,
        isValid: false,
        errors: []
      }

      const newForm = {
        [form]: Object.entries(data).reduce((form, [key, value]) => {
          const filled = { isFilled: !!value }

          form[key] = { key, value, ...defaultState, ...filled, ...rules[key] }

          return form
        }, {})
      }

      this.forms = { ...this.forms, ...newForm }
      this.initialForm = { ...this.initialForm, ...newForm }
    }

    Vue.prototype.$getValue = function (input, form = defaultForm(this.forms, defaultFormName)) {
      const isFormLoad = Object.keys(this.forms).length

      if (isFormLoad) {
        const value = Object.keys(this.forms).length > 1 ? this.forms[form][input].value : this.forms[0][input].value

        return value
      }
    }

    Vue.prototype.$synchronize = function (e, inputTouched, formTouched) {
      const value = (e && e.target.value) || ''
      const key = (e && e.target.name) || inputTouched
      const form = (e && e.target && e.target.form.name) || formTouched || defaultFormName

      if (!form) { console.warn('select a form to synchronize the data.') }

      let errors = []

      Object.keys(this.forms[form][key]).forEach(required => {
        RULES.some(rule => {
          if (required === rule) {
            const error = VALIDATIONS[rule](value, this.forms, form, key)
            if (error) errors = [ ...errors, error ]
          }
        })
      })

      const changed = {
        ...this.forms[form][key],
        value,
        errors,
        isTouched: true,
        isDirty: true,
        isFilled: !!value,
        isValid: errors.length <= 0
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

        // forced validation
        this.$synchronize(null, input, form)
      }
    }

    Vue.prototype.$hasError = function (key, form = defaultForm(this.forms, defaultFormName)) {
      const input = Object.keys(this.forms).length > 1 ? this.forms[form][key] : form

      return input.isTouched && !input.isValid && input.errors[0]
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

    // Vue.prototype.$resetForm = function (form = defaultForm(this.forms, defaultFormName)) {
    //   const defaultState = {
    //     isTouched: false,
    //     isDirty: false,
    //     isFilled: false,
    //     isValid: false,
    //     value: '',
    //     errors: []
    //   }
      
    //   const formReseted = Object.entries(this.forms[form]).map(([_, value]) => ({ ...value, ...defaultState }))

    //   this.forms = { ...this.forms, ...formReseted }
    // }
  }
}
