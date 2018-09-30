export default function (form, allData) {
  const { [form]: data, messages = {}, validations = {} } = allData

  return new Promise(resolve => {
    const result = {
      [form]: Object.entries(data).reduce((acc, [key, value]) => {
        acc = {
          ...acc,
          [key]: this.validate(validations, messages, form, key, value)[form][key]
        }

        return acc
      }, {})
    }

    resolve(result)
  })
}
