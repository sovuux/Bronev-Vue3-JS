<template>
  <TableBaseComponent>
    <template #tableHead>
      <th
          v-for="(tableColumn, index) in tableColumns"
          :key="index"
          class="routes-head"
      >
        <span class="routes-head-title">
          {{ tableColumn.content }}
        </span>
      </th>
    </template>
    <template #tableBody>
      <tr
          v-for="(person, key) in displayedPeople"
          :key="key"
      >
        <td
            v-for="(tableColumn, index) in tableColumns"
            :key="index"
            class="routes-body"
        >
          <span class="routes-body-content">
            {{ person[tableColumn.key] }}
<!--            //{{ index === 3 ? person[documents] : '-' }}-->
          </span>
        </td>
        <td class="routes-body-img">
          <ButtonBaseComponent
              class="routes-body-img-button"
              @click-action="toggleModalCard(person)"
          >
            <template #buttonContent>
              <img
                  :src="EyeIcon"
                  alt="eye"
                  class="routes-body-img-button-content"
              >
            </template>
          </ButtonBaseComponent>
        </td>
      </tr>
    </template>
  </TableBaseComponent>
  <Paginator
    :rows="rowsPerPage"
    :total-records="store.people.length"
    @page="onPageChange"
  />
</template>

<script setup>
import TableBaseComponent from '@/components/ BaseComponents/Table/TableBaseComponent.vue';
import ButtonBaseComponent from "@/components/ BaseComponents/Button/ButtonBaseComponent.vue";
import Paginator from "primevue/paginator";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "@/stores/store.js";
import EyeIcon from "@/assets/SvgImages/eye.svg";

const emit = defineEmits(["openPopupCard"])

const store = useStore()

const people = ref([])

const tableColumns = ref([
  { key: "lastname", content: "Фамилия" },
  { key: "firstname", content: "Имя" },
  { key: "patronymic", content: "Отчество" },
  { key: "documents", content: "Паспорт" },
  { key: "phone", content: "Телефон" },
])

const rowsPerPage = ref(10)
const currentPage = ref(1)

const displayedPeople = computed(() => {
  const startIndex = (currentPage.value - 1) * rowsPerPage.value;
  const endIndex = startIndex + rowsPerPage.value;
  return people.value.slice(startIndex, endIndex)
})

const onPageChange = (event) => {
  currentPage.value = event.page + 1;
}

const toggleModalCard = (object) => {
  emit('openPopupCard')
  store.cardObject = object
}

watch(() => store.people, (newValue) => {
  people.value = newValue
})

onMounted(async () => {
  await store.getTablePeople()
})
</script>

<style lang="scss" scoped>
.routes {
  &-body {
    &-img {
      border: 0;
      width: 1%;
      &-button {
        border: none;
        padding: 0.5rem;
        transition: 0.2s ease-in-out;
        &:hover {
          border-bottom: 1px solid black;
          padding: 0.5rem;
          border-radius: 0;
          background: none;
          box-shadow: none;
          transition: 0.2s ease-in-out;
        }
        &-content {
          width: 2rem;
          height: 2rem;
        }
      }
    }
  }
}
</style>