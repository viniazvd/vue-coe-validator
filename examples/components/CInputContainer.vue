<template>
  <div :class="classes">
    <label v-if="label" class="label">
      <span v-if="required" class="required">*</span>
      {{ label }}
    </label>

    <slot />

    <p v-if="!!validation" class="validation">
      {{ validation }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    validation: [String, Boolean],
    required: Boolean
  },
  computed: {
    classes () {
      return [ 'c-input-container', {
        '-label': this.label,
        '-validation': this.validation
      }]
    }
  }
}
</script>

<style>
.c-input-container { position: relative; }
.label {
  position: absolute;
  top: -20px;
  font-size: 11px;
  margin-bottom: 5px;
  padding-right: 10px;
  text-transform: uppercase;
}
.required { color: red; margin-top: 5px; }
.-label { margin-top: 22px; }
.-validation { margin-bottom: 30px; }
.validation {
  position: absolute;
  bottom: -20px;
  color: red;
}
</style>