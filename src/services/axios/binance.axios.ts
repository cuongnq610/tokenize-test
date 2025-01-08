import axios from "axios";


export const binanceAxiosInstance = axios.create({
    baseURL: "https://api.binance.com/api/v3"
})