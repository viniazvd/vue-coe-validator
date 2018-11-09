import { getSnapshots } from '../services'
import validator from '../directives/validator'

const formSetup = {
  created () {
    const { validation, messages } = this.$options

    this.messages = messages || null

    if (validation) {
      // set the component context values
      this.$validator.context.components = {
        ...this.$validator.context.components,
        [this._uid]: this
      }

      // set snapshot of the initial form
      this.$validator.snapshots.components = {
        ...this.$validator.snapshots.components,
        [this._uid]: getSnapshots.call(this)
      }

      // overrides default messages based on global message options
      if (this.$validator.messages && this.messages && this.messages.length) {
        this.$validator.setMessages(this.messages, this.$validator.messages)
      }

      this.$validator.setValidations()
      this.$validator.validateOnBlur && this.$validator.setListenersTouch()
    }
  },

  directives: validator,

  data () {
    return {
      validations: {},
      messages: {}
    }
  },

  methods: {
    // helper method to prototype
    $handlerBlur (form, element) {
      this.validations = {
        ...this.validations,
        ...this.$validator.touch(this.validations, this.messages, form, element.name, element.value)
      }
    },

    $hasError (key, form) {
      if (this.validations && Object.keys(this.validations).length) {
        // in a single-form scenario, the scope is unique, and you do not have to explicitly name the form
        if (!form) form = Object.keys(this.validations)[0]

        const input = this.validations[form][key]

        return input && input.isTouched && !input.isValid && input.errors[0]
      }

      return false
    },

    $isValidForm (form) {
      const isValid = Object
        .entries(this.validations[form])
        .every(([_, { isValid }]) => isValid)

      return isValid
    }
  }
}

export default formSetup
