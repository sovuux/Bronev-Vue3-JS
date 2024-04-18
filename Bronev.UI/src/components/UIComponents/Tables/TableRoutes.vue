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
        v-for="(route, key) in routes"
        :key="key"
      >
        <td
          v-for="(tableColumn, index) in tableColumns"
          :key="index"
          class="routes-body"
        >
          <span class="routes-body-content">
            {{ route[tableColumn.key] }}
          </span>
        </td>
        <td class="routes-body-img">
          <ButtonBaseComponent
              class="routes-body-img-button"
              @click-action="toggleModalCard(route)"
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
</template>

<script setup>
import TableBaseComponent from '@/components/ BaseComponents/Table/TableBaseComponent.vue';
import ButtonBaseComponent from "@/components/ BaseComponents/Button/ButtonBaseComponent.vue";
import { onMounted, ref, watch } from "vue";
import { useStore } from "@/stores/store.js";
import EyeIcon from "@/assets/SvgImages/eye.svg";

const emit = defineEmits(['openPopupCard'])

const store = useStore()

const routes = ref([])

const tableColumns = ref([
    { key: "name", content: "Название" },
    { key: "shortName", content: "Сокращение" },
    { key: "active", content: "Доступность" },
])

const toggleModalCard = (object) => {
  emit('openPopupCard')
  store.cardObject = object
  console.log(object)
}

watch(() => store.routes, (newValue) => {
  routes.value = newValue
})

onMounted(async () => {
  await store.getTableRoutes()
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