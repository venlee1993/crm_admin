import axios from 'axios'
import router from '../router/index'
import qs from 'qs'

const xhr = axios.create({
    baseURL: 'http://tuan.xidawu.net:9527',
    timeout: 3000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})


xhr.interceptors.response.use(response => {
    if (response.data.code == 40000) {
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
            if (res.data.code == 200) {
                resolve(res);
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const getUserList = (data) => {
    return new Promise(function (resolve, reject) {
        let base = '/user/list';
        if (data) {
            let feilds = '?', values = ''
            Object.keys(data).forEach(key => {
                if (data[key] != '') {
                    feilds = feilds + `feilds=${key}&`;
                    values = values + `values=${data[key]}&`
                }
            })
            base = base + feilds + values;
            base = base.substring(0, base.lastIndexOf('&'));
        }
        xhr.post(base).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}


export const addUser = (data) => {
    return new Promise(function (resolve, reject) {
        xhr({
            url: '/user/add',
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
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

export const getCurrentUser = () => {
    return new Promise(function (resolve, reject) {
        xhr.post('/user/current').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export const addRole = (data) => {
    return new Promise(function (resolve, reject) {
        xhr({
            url: '/role/add',
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export const addPermission = (data) => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/permission/add`, qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export const getTowerList = () => {
    return new Promise(function (resolve, reject) {
        xhr.post('/tower/list').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}


export const addTower = (data) => {
    let formdata = new FormData()
    Object.keys(data).forEach(key => {
        formdata.append(key, data[key])
    })
    return new Promise(function (resolve, reject) {
        xhr.post('/tower/add', formdata).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}


export const getActivtyList = () => {
    return new Promise(function (resolve, reject) {
        xhr.post('/tower/activity/list').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export const activetyAdd = (data, towerId, file) => {
    let formdata = new FormData();
    Object.keys(data).forEach(key => {
        formdata.append(key, data[key])
    })
    formdata.append('file', file)
    formdata.append('towerId', towerId)
    return new Promise(function (resolve, reject) {
        xhr.post('/tower/activity/add', formdata).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}


export const houseImport = (towerId, data) => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/house/import?towerId=${towerId}`, data).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

//策略列表
export const strategyList = () => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/strategy/list`).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}


//富文本上传图片
export const richUpload = (data) => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/tower/rich/upload`, data).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}


//添加策略
export const addStrategy = (data) => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/strategy/add`, data).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

//删除策略
export const deleteStrategy = (objectId) => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/tower/activity/delete`, qs.stringify({objectId: objectId})).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

//客户列表
export const customerList = () => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/customer/list`).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}


export const addCustomer = (data) => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/customer/add`, qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}