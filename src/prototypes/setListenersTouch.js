export default function (validations) {
  // dynamically records listeners to activate touch inputs
  this.$nextTick(() => {
    const forms = this.$el.querySelectorAll('form[id]')

    if (forms.length) {
      forms.forEach(form => {
        Array.from(form.elements).forEach((element, index) => {
          // register events only for those who have validation
          if (validations[form.id][form[index].name]) {
            form[index].addEventListener('blur', () => this.$handlerBlur(form.id, element), { once: true })
          }
        })
      })
    } else {
      console.warn('follow the instructions in the documentation to correctly register the form')
    }
  })
}
