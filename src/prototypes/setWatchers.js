import { mutateMessages } from '../support/utils'

export default function (data, validation, validations, messages) {
  if (validation) {
    // overrides default messages based on global message options
    if (validation.messages && messages && messages.length) mutateMessages(messages, validation.messages)

    Object
      .entries(data)
      .find(([ keyForm, valueForm ]) => {
        Object.entries(validation).find(([keyValidation, objectValidations]) => {
          if (keyForm === keyValidation) {
            for (const input in valueForm) {
              this.$watch(keyForm.concat('.', input), value => {
                validations = this.$validator.validate(
                  validations,
                  messages,
                  keyForm,
                  input,
                  value
                )
              })
            }
            validations = {
              ...validations,
              ...this.$validator.init(objectValidations, keyForm)
            }
          }
        })
      })
  } else {
    console.warn('follow the instructions in the documentation to correctly register the data')
  }
}
