import axios from 'axios'

const xhr = axios.create({
    baseURL: 'http://tuan.xidawu.net:9527',
    timeout: 3000,
    withCredentials: true
})

export default xhr;
