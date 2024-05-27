<template>
  <TableBaseComponent>
    <template #tableHead>
      <th
        v-for="(tableColumn, index) in props.tableColumns"
        :key="index"
        class="table-head"
      >
        <span class="">
          {{ tableColumn.content }}
        </span>
      </th>
    </template>
    <template #tableBody>
      <tr
        v-for="(object, id) in displayedArray"
        :key="id"
      >
        <td
          v-for="(tableColumn, key) in props.tableColumns"
          :key="key"
          class="table-body"
        >
          <span class="table-body-content">
            {{ object[tableColumn.key] }}
          </span>
        </td>
        <td class="table-body-img">
          <ButtonBaseComponent
            class="table-body-img-button"
            @click="openModal(object)"
          >
            <template #buttonContent>
              <img 
                :src="EyeIcon" 
                alt="eye"
                class="table-body-img-button-content"
              >
            </template>
          </ButtonBaseComponent>
        </td>
      </tr>
    </template>
  </TableBaseComponent>
  <Paginator
    v-if="props.totalItemsInArray >=10"
    :rows="rowsPerPage"
    :total-records="props.totalItemsInArray"
    :first="(currentPage - 1) * rowsPerPage"
    @page="onPageChange"
  />
</template>

<script setup>
import TableBaseComponent from '@/components/ BaseComponents/Table/TableBaseComponent.vue';
import ButtonBaseComponent from '@/components/ BaseComponents/Button/ButtonBaseComponent.vue';
import Paginator from 'primevue/paginator';
import EyeIcon from "@/assets/SvgImages/eye.svg";
import { useStore } from '@/stores/store';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from "vue-router";

const emit = defineEmits(["openModalCard"])

const props = defineProps({
  tableColumns: {
    type: Array,
    required: true
  },
  objectsArray: {
    type: Array,
    required: true
  },
  totalItemsInArray: {
    type: Number,
    required: true
  }
})

const store = useStore()
const router = useRouter()
const route = useRoute()
const currentPage = ref(1)
const rowsPerPage = ref(10)

const openModal = (object) => {
  store.cardObject = object
  emit('openModalCard')
}

function onPageChange(event) {
  currentPage.value = event.page + 1
  router.push({query: { ...route.query, page: currentPage.value } })
}

const displayedArray = computed(() => {
  const startIndex = (currentPage.value - 1) * rowsPerPage.value
  const endIndex = startIndex + rowsPerPage.value
  return props.objectsArray.slice(startIndex, endIndex)
})

watch(route, (newRoute) => {
  if (newRoute.query.page) {
    currentPage.value = Number(newRoute.query.page);
  }
})

onMounted(() => {
  if (!route.query.page) {
    router.replace({ query: { ...route.query, page: currentPage.value } });
  }
});
</script>

<style lang="scss" scoped>
.table {
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
