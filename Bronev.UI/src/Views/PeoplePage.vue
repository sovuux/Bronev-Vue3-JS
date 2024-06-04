<template>
  <div class="page">
    <div class="page-body">
      <div
        class="page-size page-body-content"
      >
        <div class="page-body-content-title">
          <span class="page-body-content-title-span">
            Пассажиры
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
              :objects-array="peopleFormatted"
              :table-columns="tableColumns"
              :total-items-in-array="peopleCount"
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
    :popup-name="'Карта пассажира'"
    @close-popup-card="togglePopupCard"
  />
</template>

<script setup>
import PopupCard from "@/components/UIComponents/Popups/PopupCard.vue";
import TableDictionary from "@/components/UIComponents/Tables/TableDictionary.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "@/stores/store.js";
import SearchDictionaryComponent from "@/components/UIComponents/Search/SearchDictionaryComponent.vue";

const store = useStore();
const people = ref([]);
const peopleCount = ref(0);
const currentPage = ref(1);
const isPopupCardOpen = ref(false);

const searchInputsArray = [
  { placeholder: "Поиск по фамилии", type: "text" },
  { placeholder: "Поиск по имени", type: "text" },
  { placeholder: "Поиск по отчеству", type: "text" },
  { placeholder: "Поиск по телефону", type: "text" }
];

const popupColumns = [
  { key: "lastname", label: "Фамилия:" },
  { key: "firstname", label: "Имя:" },
  { key: "patronymic", label: "Отчество:" },
  { key: "documents", label: "Паспорт:" },
  { key: "phone", label: "Телефон:" },
];

const tableColumns = ref([
  { key: "lastname", content: "Фамилия" },
  { key: "firstname", content: "Имя" },
  { key: "patronymic", content: "Отчество" },
  { key: "documents", content: "Паспорт" },
  { key: "phone", content: "Телефон" },
]);

const searchParam = {
  paramLastName: "lastname",
  paramFirstName: "firstname",
  paramPatronymic: "patronymic",
  paramPhone: "phone"

}

const inputsName = ref({
  lastName: "",
  firstName: "",
  patronymic: "",
  phone: ""
});

const getInputText = (key, value) => {
  if (key === 0) {
    inputsName.value.lastName = value;
  } else if (key === 1) {
    inputsName.value.firstName = value;
  } else if (key === 2) {
    inputsName.value.patronymic = value;
  } else if (key === 3) {
    inputsName.value.phone = value
  }
};

const startSearch = () => {
  const searchParams = [];

  if (inputsName.value.firstName.length > 0) {
    searchParams.push({ param: searchParam.paramFirstName, value: inputsName.value.firstName });
  }

  if (inputsName.value.lastName.length > 0) {
    searchParams.push({ param: searchParam.paramLastName, value: inputsName.value.lastName });
  }

  if (inputsName.value.patronymic.length > 0) {
    searchParams.push({ param: searchParam.paramPatronymic, value: inputsName.value.patronymic });
  }

  if (inputsName.value.phone.length > 0) {
    searchParams.push({ param: searchParam.paramPhone, value: inputsName.value.phone });
  }

  if (searchParams.length > 0) {
    searchParams.forEach(param => {
      store.searchTablePeople(param.param, param.value);
    });
  } else {
    console.log("пустые инпуты");
  }
};

const denySearch = () => {
  inputsName.value.firstName = "";
  inputsName.value.lastName = "";
  inputsName.value.patronymic = "";
  inputsName.value.phone = "";
  store.getTablePeople(currentPage.value);
};

function formatPassport(documents) {
  if (documents) {
    if (documents.length > 0) {
      const serial = documents[0].serial;
      const number = documents[0].number;
      if (serial && number) {
        return `${serial} ${number}`;
      }
    }
  }
  return "";
}

const peopleFormatted = computed(() => {
  return people.value.map(person => {
    return {
      ...person,
      documents: formatPassport(person.documents)
    };
  });
});

const togglePopupCard = () => {
  isPopupCardOpen.value = !isPopupCardOpen.value;
};

watch(() => store.people, (newValue) => {
  people.value = newValue
});

watch(() => store.peopleCount, (newValue) => {
  peopleCount.value = newValue;
});

watch(currentPage, (newPage) => {
  store.getTablePeople(newPage);
});

onMounted(async () => {
  await store.getTablePeople(currentPage.value);
});
</script>
