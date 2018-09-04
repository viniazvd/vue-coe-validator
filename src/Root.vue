<template>
  <div id="app">
    <section>
      <h3>form1</h3>
      <form v-if="forms.form1" @prevent.stop>
        <c-input 
          label="input1"
          :validation="$hasError('input1')"
          :value="$getValue('input1', 'form1')"
          @input="value => $synchronize(value, 'input1', 'form1')"
          @blur="$touch('input1', 'form1')"
        />
        
        <c-input 
          label="input2" 
          :validation="$hasError('input2', 'form1')"
          :value="$getValue('input2', 'form1')"
          @input="value => $synchronize(value, 'input2', 'form1')"
          @blur="$touch('input2', 'form1')"
        />
      </form>

      <button @click="submit1('form1')">salvar</button>
    </section>

    <section>
      <h3>form2</h3>
      <form v-if="forms.form2" @prevent.stop>
        <c-input 
          label="input1" 
          :validation="$hasError('input1', 'form2')"
          :value="$getValue('input1', 'form2')"
          @input="value => $synchronize(value, 'input1', 'form2')"
          @blur="$touch('input1', 'form2')"
        />
        
        <c-input 
          label="input2" 
          :validation="$hasError('input2', 'form2')"
          :value="$getValue('input2', 'form2')"
          @input="value => $synchronize(value, 'input2', 'form2')"
          @blur="$touch('input2', 'form2')"
        />
      </form>

      <button @click="submit2('form2')">salvar</button>
    </section>
  </div>
</template>

<script>
// components
import CInput from './components/CInput'

// mixins
import formSetup from './support/mixin/formSetup'

const form1 = { input1: '', input2: '22' }
const form2 = { input1: '33', input2: '' }

const customRules1 = {
  input1: {
    required: true
  },
  input2: {
    required: true,
    errorMsg: 'Digite um e-mail',
    pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i 
  }
}

const customRules2 = {
  input1: {
    required: true
  },
  input2: {
    required: true,
    pattern: /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i 
  }
}

export default {
  name: 'root',

  mixins: [ formSetup ],

  components: { CInput },

  methods: {
    touch () {
      console.log('das')
    },
    submit1 (form) {
      this.$allTouched(form)
      const isValid = this.$isValidForm(form)
      
      if (isValid) {
        console.log('save data form1')
      }
    },
    submit2 (form) {
      this.$allTouched(form)
      const isValid = this.$isValidForm(form)
      
      if (isValid) {
        console.log('save data form2')
      }
    }
  },

  mounted () {
    this.$init(form1, 'form1', customRules1)
    this.$init(form2, 'form2', customRules2)
  }
}
</script>

<style>
.input { margin-bottom: 15px; }
</style>
