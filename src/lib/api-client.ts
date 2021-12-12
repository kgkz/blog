import axiosClient from '@aspida/axios'
import axios from 'axios'
import api from '../api/$api'

const configuredAxiosClient = axios.create({
  headers: {
    'X-API-KEY': process.env.API_KEY,
  },
})

export const apiClient = api(axiosClient(configuredAxiosClient))
