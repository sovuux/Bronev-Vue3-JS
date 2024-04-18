<template>
  <input
    type="text"
    :placeholder="props.placeholder"
    class="input"
    @input="onChange"
  >
</template>

<script setup>
const emit = defineEmits(["inputTextChange"])

const props = defineProps({
    placeholder: {
      type: String,
      default: ""
    },
})

const onChange = (event) => {
    const value = event.target.value
    emit('inputTextChange', value)
}
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