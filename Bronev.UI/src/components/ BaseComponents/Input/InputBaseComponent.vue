<template>
  <input
    type="text"
    :placeholder="props.placeholder"
    class="input"
    @input="onChange()"
  >
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(["inputTextChange"])

const props = defineProps({
    placeholder: {
        type: String,
        default: ""
    }
})

const inputValue = ref("")

const onChange = (event) => {
    const value = event.target.value
    inputValue.value = value
    emit('inputTextChange', value)
}
</script>

<style lang="scss">
.input {
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 2px;

    padding-left: 0.5rem;
    &:focus {
        border-color:rgb(96, 153, 9);
        -webkit-box-shadow: 0px 5px 5px -5px rgb(96, 153, 9);
        -moz-box-shadow: 0px 5px 5px -5px rgb(96, 153, 9);
        box-shadow: 0px 5px 5px -5px rgb(96, 153, 9);
    }
}
::placeholder {
    color: gray;
    opacity: 1;
}
</style>