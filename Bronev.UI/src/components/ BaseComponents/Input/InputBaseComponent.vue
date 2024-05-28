<template>
  <input
    v-model="inputValue"
    type="text"
    :placeholder="props.placeholder"
    class="input"
    @input="onChange"
  >
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(["inputTextChange"]);

const props = defineProps({
  placeholder: {
    type: String,
    default: ""
  },
  value: {
    type: String,
    default: ""
  }
});

const inputValue = ref(props.value);

watch(() => props.value, (newValue) => {
  inputValue.value = newValue;
});

const onChange = (event) => {
  const value = event.target.value;
  emit('inputTextChange', value);
};
</script>

<style lang="scss">
.input {
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 1px;

  padding-left: 0.5rem;

  &:focus {
    outline: none;
  }
}
::placeholder {
  color: gray;
  opacity: 1;
}
</style>