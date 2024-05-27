<template>
  <TableBaseComponent>
    <template #tableHead>
      <th
        v-for="(tableColumn, index) in tableColumns"
        :key="index"
        class="cities-head"
      >
        <span class="cities-head-title">
          {{ tableColumn.content }}
        </span>
      </th>
    </template>
    <template #tableBody>
      <tr
        v-for="(city, key) in displayedCities"
        :key="key"
      >
        <td
          v-for="(tableColumn, index) in tableColumns"
          :key="index"
          class="cities-body"
        >
          <span class="cities-body-content">
            {{ city[tableColumn.key] }}
          </span>
        </td>
        <td class="cities-body-img">
          <ButtonBaseComponent
            class="cities-body-img-button"
            @click-action="toggleModalCard(city)"
          >
            <template #buttonContent>
              <img
                :src="EyeIcon"
                alt="eye"
                class="cities-body-img-button-content"
              >
            </template>
          </ButtonBaseComponent>
        </td>
      </tr>
    </template>
  </TableBaseComponent>
  <Paginator
    :rows="rowsPerPage"
    :total-records="store.citiesCount"
    @page="onPageChange"
  />
</template>

<script setup>
import TableBaseComponent from '@/components/ BaseComponents/Table/TableBaseComponent.vue';
import ButtonBaseComponent from "@/components/ BaseComponents/Button/ButtonBaseComponent.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "@/stores/store.js";
import EyeIcon from "@/assets/SvgImages/eye.svg";
import Paginator from "primevue/paginator";

const emit = defineEmits(["openPopupCard"])

const store = useStore()

const cities = ref([])

const tableColumns = ref([
  { key: "shortName", content: "Сокращение" },
  { key: "name", content: "Название" },
  { key: "officialName", content: "Оффициальное название"},
  { key: "okato", content: "ОКАТО" },
  { key: "oktmo", content: "ОКТМО" },
  { key: "longtitude", content: "Долгота" },
  { key: "latitude", content: "Широта" }
])

const rowsPerPage = ref(10);
const currentPage = ref(1);

const displayedCities = computed(() => {
  const startIndex = (currentPage.value - 1) * rowsPerPage.value;
  const endIndex = startIndex + rowsPerPage.value;
  return cities.value.slice(startIndex, endIndex);
})

const onPageChange = (event) => {
  currentPage.value = event.page + 1;
}

const toggleModalCard = (object) => {
  emit('openPopupCard')
  store.cardObject = object
}

watch(() => store.cities, (newValue) => {
  cities.value = newValue
})

onMounted(async () => {
  await store.getTableCities()
})
</script>

<style lang="scss" scoped>
.cities {
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