const isCustomInput = vnode => vnode.data.model

const model = vnode => vnode.data.directives.reduce((acc, item) => {
  if (item.name === 'model') acc[item.name] = item

  return acc
}, {}).model

export function getFormValues (vnode, el) {
  let form, key, value, inputElement

  // check native or custom input
  if (isCustomInput(vnode)) {
    [ form, key ] = vnode.data.model.expression.split('.')
    value = vnode.data.model.value
    inputElement = el && el.querySelector('input')
  } else {
    [ form, key ] = model(vnode).expression.split('.')
    value = model(vnode).value
    inputElement = el
  }

  return { form, key, value, inputElement }
}
