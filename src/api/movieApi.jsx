import axios from "axios";

let api = axios.create({
    baseURL:
    "https://api.themoviedb.org/3",
})
export const apiKey = '31f82acf270f57cb07304a217a4fd5fb';

export default api;