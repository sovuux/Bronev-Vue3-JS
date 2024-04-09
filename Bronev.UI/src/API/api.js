import axios from "axios";

const AUTH_URL = "https://core.dev.bronew.ru/auth/sso"
const API_URl = "https://core.dev.bronew.ru/api/";

const ApiQeuries = {
    async getToken() {
        try {
            await axios.post(AUTH_URL)
            const data = await response.json()
            console.log(data)
            return data
        }
        catch(error) {
            console.error(error.message);
        }
    },

    async getRoutes() {
        try {
            const response = await axios.get(API_URl+ "directions")
            console.log(response.data)
            return response.data
        }
        catch(error) {
            console.error(error.message);
        }
    },

    async getDrivers() {
        try {
            const response = await axios.get(API_URl+ "drivers")
            console.log(response.data)
            return response.data
        }
        catch(error) {
            console.error(error.message);
        }
    }
}
export default ApiQeuries