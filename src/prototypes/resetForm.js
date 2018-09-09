// export default function (form = defaultForm(this.validations, defaultFormName)) {
//   const defaultState = {
//     isTouched: false,
//     isDirty: false,
//     isFilled: false,
//     isValid: false,
//     value: '',
//     errors: []
//   }
  
//   const formReseted = Object.entries(this.validations[form]).map(([_, value]) => ({ ...value, ...defaultState }))

//   this.validations = { ...this.validations, ...formReseted }
// }