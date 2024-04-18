<template>
  <table class="table">
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
  width: 99.97%;
  border-collapse: collapse;
  border-radius: 5px;

  &-head {
    background-color: #f2f2f2;
    font-weight: bold;
    font-size: 20px
  }

  &-body {
    font-size: 18px;
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    tr:hover {
      background-color: #e9e9e9;
    }
  }

  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;

    &:first-child {
      border-top-left-radius: 5px;
    }

    &:last-child {
      border-top-right-radius: 5px;
    }
  }

  th {
    background-color: #f2f2f2;
  }

  td {
    background-color: #fff;
  }
}
</style>