const formSetup = {
  mounted () {
    const validation = this.$options.validation

    if (validation && validation.data) {
      const { data, rules } = validation

      Object
        .entries(data)
        .map(([ key, value ]) => ({ key, value }))
        .find(({ key, value }) => {
          Object.entries(rules).find(([keyRule, valueRule]) => {
            if (key === keyRule) {
              this.$init(value, valueRule, key)
            }
          })
        })
    } else {
      console.warn('follow the instructions in the documentation to correctly register the data')
    }

    // this.$watch('forms.form1.input2', value => {
    //   console.log('value', value)
    // }, { deep: true })
  },

  data () {
    return {
      forms: {},
      initialForm: {}
    }
  }
}

export default formSetup 
