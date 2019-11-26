
<template>
  <div>
    <section>
      <h1>EXAMPLE 2</h1>
      <form-example-2 :form="form" />
    </section>
  </div>
</template>

<script>
import FormExample2 from './components/FormExample2.vue'

export default {
  name: 'example2',

  components: { FormExample2 },

  data () {
    return {
      form: {
        name: '',
        email: ''
      }
    }
  }
}
</script>