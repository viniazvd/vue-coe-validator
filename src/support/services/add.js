import { defaultState } from '../services'

function getField (key, value, rules) {
  const filled = { isFilled: !!value }
  const dirted = { isDirty: !!value }

  return {
    [key]: { ...defaultState, ...dirted, ...filled, ...rules }
  }
}

export function setField (form, key, value, rules) {
  this.validations = {
    ...this.validations,
    [form]: {
      ...this.validations[form],
      ...getField(key, value, rules)
    }
  }
}
