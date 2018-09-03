<template>
  <div id="app">
    <section>
      <h3>form1</h3>
      <form v-if="forms.form1" @prevent.stop>
        <c-input 
          label="input1" 
          :value="forms.form1.input1.value"
          @input="value => $synchronize(value, 'input1', 'form1')"
        />
        
        <c-input 
          label="input2" 
          :value="forms.form1.input2.value"
          @input="value => $synchronize(value, 'input2', 'form1')"
        />
      </form>
    </section>

    <section>
      <h3>form2</h3>
      <form v-if="forms.form2" @prevent.stop>
        <c-input 
          label="input1" 
          :value="forms.form2.input1.value"
          @input="value => $synchronize(value, 'input1', 'form2')"
        />
        
        <c-input 
          label="input2" 
          :value="forms.form2.input2.value"
          @input="value => $synchronize(value, 'input2', 'form2')"
        />
      </form>
    </section>
  </div>
</template>

<script>
// components
import CInput from './components/CInput'

// mixins
import formSetup from './mixin/formSetup'

const form1 = { input1: '', input2: '22' }
const form2 = { input1: '33', input2: '' }

const form1WithRules = {
  input1: {
    required: true
  },
  input2: {
    required: true,
    pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i 
  }
}

const form2WithRules = {
  input1: {
    // key: 'input1',
    required: true
  },
  input2: {
    // key: 'input2',
    required: true,
    pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i 
  }
}

export default {
  name: 'root',

  mixins: [ formSetup() ],

  components: { CInput },

  mounted () {
    this.$init(form1, 'form1', form1WithRules)
    this.$init(form2, 'form2', form2WithRules)
  }
}
</script>
