import Vue from 'vue'

export default function (validations, messages) {
  const forms = this.$el.querySelectorAll('form[id]')

  if (forms.length) {
    forms.forEach(form => {
      Array.from(form.elements).forEach((element, index) => {
        // register events only for those who have validation
        if (validations[form.id][form[index].name]) {
          form[index].addEventListener('blur', () => {
            validations = {
              ...validations,
              ...this.$validator.touch(validations, messages, form.id, element.name, element.value)
            }

            // solition by @vjoao
            Vue.util.defineReactive(validations, 'validation', validations)

            this.$data.validations[form.id] = validations[form.id]
          }, { once: true, capture: false, passive: false })
        }
      })
    })
  } else {
    console.warn('follow the instructions in the documentation to correctly register the form')
  }
}
