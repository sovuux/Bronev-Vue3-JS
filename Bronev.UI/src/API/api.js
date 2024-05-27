import axios from "axios";

const API_URl = import.meta.env.VITE_API_URL;
const API_URL_CITIES = import.meta.env.VITE_API_CITIES_URL;

const token = localStorage.getItem("token")

function createAxios(url) {
        return axios.get(API_URl + url, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/ld+json',
            'Content-Type': 'application/json; charset=UTF-8'
        }
        }).then(response => {
            const data = response.data['hydra:member'];
            const totalItems = response.data['hydra:totalItems'];
            return { data, totalItems };
        }).catch(error => {
            console.log('Ошибка при выполнении запроса:', error);
            throw new error;
        });
}

async function getResponseData(url) {
    return createAxios(url);
}


const ApiQueries = {
    async getRoutes() {
        return await getResponseData("dictionary/directions")
    },

    async searchRoutes(parameter,searchParams) {
        return await getResponseData(`dictionary/directions?${parameter}=${searchParams}`)
    },

    async getDrivers() {
        return await getResponseData("dictionary/drivers")
    },

    async searchDrivers(parameter, searchParams) {
        return await getResponseData(`dictionary/drivers?${parameter}=${searchParams}`)
    },

    async getPeople() {
        return await getResponseData("people/people")
    },

    async searchPeople(parameter, searchParams) {
        return await getResponseData(`people/people?${parameter}=${searchParams}`)
    },

    async getCities() {
        try {
            const response = await axios.get(API_URL_CITIES, {
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

    async searchCities(parameter, searchParams) {
        try {
            const response = await axios.get(API_URl+`?page=1&${parameter}=${searchParams}`, {
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