<template>
  <div class="page">
    <div class="page-body">
      <div class="page-size page-body-content">
        <div class="page-body-content-title">
          <span class="page-body-content-title-span">
            Водители
          </span>
        </div>
        <div class="page-body-data">
          <div class="page-body-data-search">
            <SearchDictionaryComponent
              :deny-search="denySearch"
              :start-search="startSearch"
              :get-input-text="getInputText"
              :inputs-array="searchInputsArray"
              :inputs-value="inputsName"
            />
          </div>
          <div class="page-body-data-table">
            <TableDictionary
              :objects-array="driversFormatted"
              :table-columns="tableColumns"
              :total-items-in-array="driversCount"
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
    :popup-name="'Карта водителя'"
    @close-popup-card="togglePopupCard"
  />
</template>

<script setup>
import SearchDictionaryComponent from "@/components/UIComponents/Search/SearchDictionaryComponent.vue";
import PopupCard from "@/components/UIComponents/Popups/PopupCard.vue";
import TableDictionary from "@/components/UIComponents/Tables/TableDictionary.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "@/stores/store.js";

const store = useStore();
const drivers = ref([]);
const driversCount = ref(0);
const currentPage = ref(1);
const isPopupCardOpen = ref(false);

const searchInputsArray = [
  { placeholder: "Поиск по имени", type: "text" },
  { placeholder: "Поиск по фамилии", type: "text" },
  { placeholder: "Поиск по отчеству", type: "text" }
];

const popupColumns = [
  { key: "lastname", label: "Фамилия:" },
  { key: "firstname", label: "Имя:" },
  { key: "patronymic", label: "Отчество:" },
  { key: "birthDate", label: "Дата рождения:" },
  { key: "sex", label: "Пол:" },
  { key: "active", label: "Активность:" }
];

const tableColumns = [
  { key: "lastname", content: "Фамилия" },
  { key: "firstname", content: "Имя" },
  { key: "patronymic", content: "Отчество" },
  { key: "birthDate", content: "Дата рождения" },
  { key: "sex", content: "Пол"},
  { key: "active", content: "Активность" }
];

const searchParam = {
  paramFirstName: "firstname",
  paramLastName: "lastname",
  paramPatronymic: "patronymic"
};

const inputsName = ref({
  firstName: "",
  lastName: "",
  patronymic: ""
});

function formatDate(date) {
  const parsedDate = new Date(date);
  const day = parsedDate.getDate().toString().padStart(2, '0');
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = parsedDate.getFullYear();
  return `${day}.${month}.${year}`;
}

function formatSex(sex) {
  return sex === 1 ? "Мужской" : "Женский";
}

function formatActive(active) {
  return active === true ? "Активен" : "Не активен";
}

const driversFormatted = computed(() => {
  return drivers.value.map(driver => {
    return {
      ...driver,
      active: formatActive(driver.active),
      birthDate: formatDate(driver.birthDate),
      sex: formatSex(driver.sex)
    };
  });
});

const getInputText = (key, value) => {
  if (key === 0) {
    inputsName.value.firstName = value;
  } else if (key === 1) {
    inputsName.value.lastName = value;
  } else if (key === 2) {
    inputsName.value.patronymic = value;
  }
};

const startSearch = () => {
  const searchParams = [];

  if (inputsName.value?.firstName?.length > 0) {
    searchParams.push({ param: searchParam.paramFirstName, value: inputsName.value.firstName });
  }

  if (inputsName.value?.lastName?.length > 0) {
    searchParams.push({ param: searchParam.paramLastName, value: inputsName.value.lastName });
  }

  if (inputsName.value?.patronymic?.length > 0) {
    searchParams.push({ param: searchParam.paramPatronymic, value: inputsName.value.patronymic });
  }

  if (searchParams.length > 0) {
    searchParams.forEach(param => {
      store.searchTableDrivers(param.param, param.value);
    });
  } else {
    console.log("пустые инпуты");
  }
};

const denySearch = () => {
  inputsName.value.firstName = "";
  inputsName.value.lastName = "";
  inputsName.value.patronymic = "";
  store.getTableDrivers(currentPage.value);
};


const togglePopupCard = () => {
  isPopupCardOpen.value = !isPopupCardOpen.value;
};

watch(() => store.drivers, (newValue) => {
  drivers.value = newValue;
});

watch(() => store.driversCount, (newValue) => {
  driversCount.value = newValue;
});

watch(currentPage, (newPage) => {
  store.getTableDrivers(newPage);
});

onMounted(async () => {
  await store.getTableDrivers(currentPage.value);
});
</script>

<style lang="scss">
.page-size {
  height: 270vh;
}
</style>
