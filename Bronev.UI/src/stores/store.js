import ApiQueries from "@/API/api.js";
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
    const routes = ref([])
    const routesCount = ref(0)
    const drivers = ref([])
    const driversCount = ref(0)
    const people = ref([])
    const peopleCount = ref(0)
    const cities = ref([])
    const citiesCount = ref(0)

    const cardObject = ref({})

    const getTableRoutes = async () => {
        const { data, totalItems } = await ApiQueries.getRoutes()
        routes.value = data
        routesCount.value = totalItems
    }

    const searchTableRoutes = async (parameter,searchParams) => {
        const { data, totalItems } = await ApiQueries.searchRoutes(parameter, searchParams)
        routes.value = data
        routesCount.value = totalItems
    }

    const getTableDrivers = async () => {
        const { data, totalItems } = await ApiQueries.getDrivers()
        drivers.value = data
        driversCount.value = totalItems
    }

    const searchTableDrivers = async (parameter,searchParams) => {
        const { data, totalItems } = await ApiQueries.searchDrivers(parameter, searchParams)
        console.log(parameter, searchParams)
        drivers.value = data
        driversCount.value = totalItems
    }

    const getTablePeople = async () => {
        const { data, totalItems } = await ApiQueries.getPeople()
        people.value = data
        peopleCount.value = totalItems
    }

    const searchTablePeople = async (parameter,searchParams) => {
        const { data, totalItems } = await ApiQueries.searchPeople(parameter, searchParams)
        people.value = data
        peopleCount.value = totalItems
    }

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
        routes,
        routesCount,
        drivers,
        driversCount,
        people,
        peopleCount,
        cities,
        citiesCount,
        cardObject,
        getTableRoutes,
        searchTableRoutes,
        getTableDrivers,
        searchTableDrivers,
        getTablePeople,
        searchTablePeople,
        getTableCities,
        searchTableCities
    }
  }
)
