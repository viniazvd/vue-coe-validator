<template>
  <div id="app">
    <section>
      <h3>form1</h3>
      <form v-if="forms.form1" @prevent.stop class="form1">
        <c-input 
          label="input1" 
          :value="forms.form1.input1.value"
          @input="value => $synchronize({ 
            form: 'form1',
            key: forms.form1.input1.key, 
            value, 
            required: true 
          })"
        />
        
        <c-input 
          label="input2" 
          :value="forms.form1.input2.value"
          @input="value => $synchronize({ 
            form: 'form1',
            key: forms.form1.input2.key, 
            value, 
            required: true,
            pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i 
          })"
        />
      </form>
    </section>

    <section>
      <h3>form2</h3>
      <form v-if="forms.form2" @prevent.stop class="form2">
        <c-input 
          label="input1" 
          :value="forms.form2.input1.value"
          @input="value => $synchronize({ 
            form: 'form2',
            key: forms.form2.input1.key, 
            value, 
            required: true 
          })"
        />
        
        <c-input 
          label="input2" 
          :value="forms.form2.input2.value"
          @input="value => $synchronize({ 
            form: 'form2',
            key: forms.form2.input2.key, 
            value, 
            required: true,
            pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([\.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i 
          })"
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

const form1 = { input1: '11', input2: '22' }
const form2 = { input1: '33', input2: '44' }

export default {
  name: 'root',

  mixins: [ formSetup() ],

  components: { CInput },

  mounted () {
    this.$init(form1, 'form1')
    this.$init(form2, 'form2')
  }
}
</script>
