<template>
  <c-input-container v-bind="$attrs" class="c-input">
    <input
      class="input"
      v-bind="$attrs"
      v-on="$listeners"
      :value="value"
      @input="v => $emit('input', v.target.value)"
    >
  </c-input-container>
</template>

<script>
import CInputContainer from './CInputContainer'

export default {
  components: { CInputContainer },

  props: {
    value: String
  }
}
</script>

<style>
.c-input { display: flex; }

.input {
  outline: 0;
  height: 40px;
  border-radius: 5px;
  transition: box-shadow .3s ease;
}
</style>
