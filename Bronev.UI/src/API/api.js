import axios from "axios";

const API_URl = "https://core.dev.bronew.ru/api/";
const API_URL_CITIES = "https://svida.routeam.ru/api/cities"

const token = localStorage.getItem("token");

const ApiQueries = {
    async getRoutes() {
        try {
            const response = await axios.get(API_URl+ "dictionary/directions", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/ld+json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })

            const data = response.data['hydra:member'];
            const totalItems = response.data['hydra:totalItems'];
            return { data, totalItems }
        }
        catch(error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    },

    async searchRoutes(parameter,searchParams) {
        try {
            const response = await axios.get(API_URl+ `dictionary/directions?${parameter}=${searchParams}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/ld+json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })

            const data = response.data['hydra:member'];
            const totalItems = response.data['hydra:totalItems'];
            return { data, totalItems }
        }
        catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    },

    async getDrivers() {
        try {
            const response = await axios.get(API_URl+ "dictionary/drivers", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/ld+json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })

            const data = response.data['hydra:member'];
            const totalItems = response.data['hydra:totalItems'];
            return { data, totalItems }
        }
        catch(error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    },

    async searchDrivers(parameter, searchParams) {
        try {
            const response = await axios.get(API_URl+ `dictionary/drivers?${parameter}=${searchParams}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/ld+json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })

            const data = response.data['hydra:member'];
            const totalItems = response.data['hydra:totalItems'];
            console.log(parameter, searchParams)
            return { data, totalItems }
        }
        catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    },

    async getPeople() {
        try {
            const response = await axios.get(API_URl+ "people/people", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/ld+json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })

            const data = response.data['hydra:member'];
            const totalItems = response.data['hydra:totalItems'];
            return { data, totalItems }
        }
        catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    },

    async searchPeople(parameter, searchParams) {
        try {
            const response = await axios.get(API_URl+ `people/people?${parameter}=${searchParams}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/ld+json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })

            const data = response.data['hydra:member'];
            const totalItems = response.data['hydra:totalItems'];
            console.log(parameter, searchParams)
            return { data, totalItems }
        }
        catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    },

    async getCities() {
        try {
            const response = await axios.get(API_URL_CITIES, {
                headers: {
                    //'Authorization': `Bearer ${token}`, - убрать если понадобится
                    'Accept': 'application/ld+json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })

            const data = response.data['hydra:member'];
            const totalItems = response.data['hydra:totalItems'];
            return { data, totalItems }
        }
        catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    },

    async searchCities(parameter, searchParams) {
        try {
            const response = await axios.get(API_URL_CITIES+`?page=1&${parameter}=${searchParams}`, {
                headers: {
                    'Accept': 'application/ld+json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })

            const data = response.data['hydra:member'];
            const totalItems = response.data['hydra:totalItems'];
            return { data, totalItems }
        }
        catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}
export default ApiQueries