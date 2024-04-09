import ApiQeuries from '@/API/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
    const token = ref()

    const setToken = async () => {
      try {
        const response = await ApiQeuries.getToken()
        console.log(22)
        token.value = response.token
      }
      catch(error) {
        console.log(error)
      }
    }

    return {
      token, 
      setToken
    }
  }
)
