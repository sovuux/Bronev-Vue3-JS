import ApiQueries from "@/API/api.js";
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
    const dataObjects = {
        routes: ref([]),
        routesCount: ref(0),
        drivers: ref([]),
        driversCount: ref(0),
        people: ref([]),
        peopleCount: ref(0),
        // cities: ref([]),
        // citiesCount: ref(0)
    };

    const cities = ref([])
    const citiesCount = ref(0)

    const cardObject = ref({});

    const handleResponse = (response) => {
        const { data, totalItems } = response;
        return {
            data,
            totalItems
        };
    };

    const getData = async (key, apiQuery) => {
        try {
            const { data, totalItems } = handleResponse(await apiQuery());
            dataObjects[key].value = data;
            dataObjects[`${key}Count`].value = totalItems;
        } catch (error) {
            console.error('Ошибка', error);
            throw error;
        }
    };

    const searchData = async (key, parameter, searchParams, apiQuery) => {
        try {
            const { data, totalItems } = handleResponse(await apiQuery(parameter, searchParams));
            dataObjects[key].value = data;
            dataObjects[`${key}Count`].value = totalItems;
        } catch (error) {
            console.error('Ошибка', error);
            throw error;
        }
    };

    const getTableRoutes = () => getData('routes', ApiQueries.getRoutes);
    const searchTableRoutes = (parameter, searchParams) => searchData('routes', parameter, searchParams, ApiQueries.searchRoutes);

    const getTableDrivers = () => getData('drivers', ApiQueries.getDrivers);
    const searchTableDrivers = (parameter, searchParams) => searchData('drivers', parameter, searchParams, ApiQueries.searchDrivers);

    const getTablePeople = () => getData('people', ApiQueries.getPeople);
    const searchTablePeople = (parameter, searchParams) => searchData('people', parameter, searchParams, ApiQueries.searchPeople);

    const getTableCities = async () => {
        const { data, totalItems } = await ApiQueries.getCities()
        cities.value = data
        citiesCount.value = totalItems
    }

    const searchTableCities = async (parameter,searchParams) => {
        const { data, totalItems } = await ApiQueries.searchCities(parameter, searchParams)
        cities.value = data
        citiesCount.value = totalItems
    }

    return {
        ...dataObjects,
        cardObject,
        cities,
        citiesCount,
        getTableRoutes,
        searchTableRoutes,
        getTableDrivers,
        searchTableDrivers,
        getTablePeople,
        searchTablePeople,
        getTableCities,
        searchTableCities
    };
});
