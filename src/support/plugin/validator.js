import prototypes from '../../prototypes'

export default {
  install (Vue, options) {
    Object.defineProperty(Vue.prototype, '$validator', {
      get () {
        return prototypes
      }
    })
  }
}
