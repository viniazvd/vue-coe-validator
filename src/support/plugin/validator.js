import * as prototypes from '../../prototypes'
import * as services from '../services'

const messages = options => (options && options.messages && { messages: options.messages }) || {}

export default {
  install (Vue, options) {
    Object.defineProperty(Vue.prototype, '$validator', {
      get () {
        return Object.assign(
          {},
          prototypes,
          services,
          messages(options)
        )
      }
    })
  }
}
