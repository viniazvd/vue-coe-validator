import { setMessages, setListenersTouch } from '../services'
import { setContext } from '../services/context'
import { setSnapshot } from '../services/snapshot'

import validator from '../directives/validator'

const formSetup = {
  created () {
    const { validation, messages } = this.$options

    this.messages = messages || null

    if (validation) {
      // set the component context values
      setContext.call(this)

      // set snapshot of the initial form
      setSnapshot.call(this)

      // overrides default messages based on global message options
      if (this.$validator.messages && this.messages && this.messages.length) {
        setMessages(this.messages, this.$validator.messages)
      }

      // create validation states/rules
      this.$validator.init()

      this.$validator.validateOnBlur && setListenersTouch.call(this)
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
    $hasError (key, form) {
      if (this.validations && Object.keys(this.validations).length) {
        // in a single-form scenario, the scope is unique, and you do not have to explicitly name the form
        if (!form) form = Object.keys(this.validations)[0]

        const input = this.validations[form] && this.validations[form][key]

        return input && input.isTouched && !input.isValid && input.errors[0]
      }

      return false
    }
  }
}

export default formSetup
