<template>
  <div class="page">
    <div class="page-body">
      <div
        class="page-body-content"
      >
        <div class="page-body-content-title">
          <span class="page-body-content-title-span">
            Список направлений
          </span>
        </div>
        <div class="page-body-data">
          <div class="page-body-data-search">
            <SearchDictionaryComponent
              :inputs-value="inputsName"
              :deny-search="denySearch"
              :start-search="startSearch"
              :get-input-text="getInputText"
              :inputs-array="searchInputsArray"
            />
          </div>
          <div class="page-body-data-table">
            <TableDictionary
              :objects-array="routesFormatted"
              :table-columns="tableColumns"
              :total-items-in-array="routesCount"
              @open-modal-card="togglePopupCard"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <PopupCard
    v-if="isPopupCardOpen"
    :form-columns="popupColumns"
    :popup-name="'Карта маршрута'"
    @close-popup-card="togglePopupCard"
  />
</template>
  
<script setup>
import PopupCard from "@/components/UIComponents/Popups/PopupCard.vue";
import TableDictionary from "@/components/UIComponents/Tables/TableDictionary.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "@/stores/store.js";
import SearchDictionaryComponent from "@/components/UIComponents/Search/SearchDictionaryComponent.vue";

const store = useStore()
const isPopupCardOpen = ref(false)
const routes = ref([])
const routesCount = ref(0)

const searchInputsArray = [
  { placeholder: "Поиск по наименованию", type: "text" },
  { placeholder: "Поиск по сокращению", type: "text" }
]

const popupColumns = [
  { key: "name", label: "Название:" },
  { key: "shortName", label: "Сокращение:" },
  { key: "active", label: "Доступность:" },
]

const tableColumns = ref([
  { key: "name", content: "Название" },
  { key: "shortName", content: "Сокращение" },
  { key: "active", content: "Доступность" },
])

const searchParam = {
  paramFullName: "name",
  paramShortName: "shortName",
}

const inputsName = ref({
  fullName: "",
  shortName: ""
})

const getInputText = (key, value) => {
  if (key === 0) {
    inputsName.value.fullName = value;
  } else if (key === 1) {
    inputsName.value.shortName = value;
  }
}

const startSearch = () => {
  const searchParams = [];

  if (inputsName.value.fullName.length > 0) {
    searchParams.push({ param: searchParam.paramFullName, value: inputsName.value.fullName });
  }

  if (inputsName.value.shortName.length > 0) {
    searchParams.push({ param: searchParam.paramShortName, value: inputsName.value.shortName });
  }

  if (searchParams.length > 0) {
    searchParams.forEach(param => {
      store.searchTableRoutes(param.param, param.value);
    })
  } else {
    console.log("пустые инпуты");
  }
};

const denySearch = () => {
  inputsName.value.fullName = "";
  inputsName.value.shortName = "";
  store.getTableRoutes();
};

function formatActive(active) {
  return active === true ? "Доступен" : "Не доступен";
}

const routesFormatted = computed(() => {
  return routes.value.map(route => {
    return {
      ...route,
      active: formatActive(route.active)
    }
  })
})

const togglePopupCard = () => {
  isPopupCardOpen.value = !isPopupCardOpen.value
}

watch(() => store.routesCount, (newValue) => {
  routesCount.value = newValue
})

watch(() => store.routes, (newValue) => {
  routes.value = newValue
})

onMounted(async () => {
  await store.getTableRoutes()
})
</script>

<style scoped lang="scss">
.page-body-content{
  height: 100vh;
}
</style>