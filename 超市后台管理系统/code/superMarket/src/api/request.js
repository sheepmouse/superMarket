
//axios
import axios from 'axios'
// qs
import qs from "qs";

axios.defaults.baseURL = 'http://127.0.0.1:666'

export default {
    get(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params
            })
       
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            }) 
        })
    },
    post(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
       
            .then(response => {
                resolve(response.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    } 
}