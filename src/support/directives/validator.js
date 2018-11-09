export default {
  validator: {
    bind (el, binding, vnode) {
      const [ form ] = vnode.data.model.expression.split('.')

      // if the form property does not exist in validations, set.
      if (!vnode.context.validations[form]) {
        vnode.context.$set.call(vnode, vnode.context.validations, form, {})
      }
    },

    inserted (el, { value: rules }, vnode) {
      const [ form, key ] = vnode.data.model.expression.split('.')
      const data = vnode.context[form]

      const validations = {
        ...vnode.context.validations,
        [form]: {
          ...vnode.context.validations[form],
          [key]: {
            ...vnode.context.validations[form][key],
            ...rules
          }
        }
      }

      vnode.context.validations = vnode.context.$validator.init(data, null, validations)
    }
  }
}
