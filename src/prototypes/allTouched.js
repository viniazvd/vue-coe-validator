// export default function (form = defaultForm(this.validations, defaultFormName)) {
//   const formToTouch = Object.entries(this.validations[form]).reduce((acc, [key, value]) => {
//     acc[key] = { ...value, isTouched: true }

//     return acc
//   }, {})

//   const formToUpdate = this.validations[form]

//   this.validations = {
//     ...this.validations,
//     [form]: {
//       ...formToUpdate,
//       ...formToTouch
//     }
//   }
// }
