import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    validateStatus: (status) => {
        if(status >= 200 && status < 300){
            return true
        }

        return false
    }
})

axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";

export default instance