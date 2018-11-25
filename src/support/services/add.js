import { defaultState } from '../services'

function setFormState (key, value, rules) {
  const filled = { isFilled: !!value }
  const dirted = { isDirty: !!value }

  return {
    [key]: { ...defaultState, ...dirted, ...filled, ...rules }
  }
}

export function setFieldStates (form, key, value, rules) {
  this.validations = {
    ...this.validations,
    [form]: {
      ...this.validations[form],
      ...setFormState(key, value, rules)
    }
  }
}
