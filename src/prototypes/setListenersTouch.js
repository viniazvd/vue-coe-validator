export default function () {
  const componentID = Object.keys(this.context.components)[Object.keys(this.context.components).length - 1]
  const vm = this.context.components[componentID]

  // dynamically records listeners to activate touch inputs
  vm.$nextTick(() => {
    const forms = vm.$el.querySelectorAll('form[id]')

    if (forms.length) {
      forms.forEach(form => {
        Array.from(form.elements).forEach((element, index) => {
          // register events only for those who have validation
          if (vm.validations[form.id][form[index].name]) {
            form[index].addEventListener('blur', () => vm.$handlerBlur(form.id, element), { once: true })
          }
        })
      })
    } else {
      console.warn('follow the instructions in the documentation to correctly register the form')
    }
  })
}
