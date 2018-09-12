import * as prototypes from '../../prototypes'

const messages = options => (options && options.messages && { messages: options.messages }) || {}

export default {
  install (Vue, options) {
    Object.defineProperty(Vue.prototype, '$validator', {
      get () {
        return Object.assign(
          {},
          prototypes,
          messages(options)
        )
      }
    })
  }
}
