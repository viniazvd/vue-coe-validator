export default function (data, rules, form) {
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
