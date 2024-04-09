<template>
  <table class="table">
    <slot name="tableSeacrh" />
    <thead class="table-head">
      <slot name="tableHead" />
    </thead>
    <tbody class="table-body">
      <slot name="tableBody" />
    </tbody>
  </table>
</template>

<style lang="scss">
.table {
    width: 80%;
    padding: 5%;
    border: 1px solid black;
    border-radius: 5px;
}
</style>