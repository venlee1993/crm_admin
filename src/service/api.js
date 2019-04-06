import axios from 'axios'
import router from '../router/index'

const xhr = axios.create({
    baseURL: 'http://tuan.xidawu.net:9527',
    timeout: 3000,
    withCredentials: true
})


xhr.interceptors.response.use(response => {
    if (response.data.data.code == 40000) {
        router.push('/user/login')
    } else {
        return response
    }
}, error => {
    reject(error)
})


export const login = () => {
    return new Promise(function (resolve, reject) {
        xhr.get('/user/login?username=admin&password=123456').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export const getUserList = () => {
    return new Promise(function (resolve, reject) {
        xhr.post('/user/list').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export const getRoleList = () => {
    return new Promise(function (resolve, reject) {
        xhr.post('/role/list').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export const getPermissionList = () => {
    return new Promise(function (resolve, reject) {
        xhr.post('/permission/list').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}