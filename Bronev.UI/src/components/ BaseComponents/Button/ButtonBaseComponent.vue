<template>
  <button
    class="button"
    @click="emit('clickAction')"
  >
    <slot name="buttonContent">
      {{ props.buttonName }}
    </slot>
  </button>
</template>

<script setup>
const emit = defineEmits(['clickAction'])

const props = defineProps({
  buttonName: {
    type: String,
    default: ""
  }
})
</script>

<style lang="scss">
.button {
  background: white;
  border: 2px solid #0088ff;
  border-radius: 5px;
  cursor: pointer;
  appearance: none;
  user-select: none;
  color: #0088ff;
  padding: 1%;
  font-size: 16px;

  &:hover {
    background: #0088ff;
    color: whitesmoke;
    -webkit-box-shadow: 0px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
    -moz-box-shadow: 0px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
    box-shadow: 0px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
  }
}
</style>