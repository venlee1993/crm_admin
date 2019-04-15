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
    router.push('/user/login')
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


export const getUserByRole = (role = 'SALES') => {
    return new Promise(function (resolve, reject) {
        xhr.post('/user/list-by-role', qs.stringify({
            role: role
        })).then(res => {
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

export const getPermissionList = (pageIndex = 1, pageSize = 10) => {
    return new Promise(function (resolve, reject) {
        xhr.post('/permission/list', qs.stringify({
            pageIndex: pageIndex,
            pageSize: pageSize
        })).then(res => {
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
        xhr.post(`/strategy/add`, qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

//删除策略
export const deleteStrategy = (objectId) => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/strategy/delete`, qs.stringify({objectId: objectId})).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

//删除更新
export const strategyUpdate = (data) => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/strategy/update`, qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}


//客户列表
export const customerList = (rules, pageIndex, pageSize) => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/customer/list`, qs.stringify({
            feilds: Object.keys(rules),
            values: Object.values(rules),
            pageIndex: pageIndex,
            pageSize: pageSize
        }, {
            indices: false
        })).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

//添加客户
export const addCustomer = (data) => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/customer/add`, qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

//更新客户
export const updateCustomer = (data) => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/customer/update`, qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}


//房型列表
export const houseList = () => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/house/type/list`).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

//客户交定金
export const customerReserve = (data) => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/customer/reserve`, data).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}


//客户按揭
export const customerPrepay = (data) => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/customer/prepay`, qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

export const customerOrderList = (customerId) => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/customer/order/list`, qs.stringify({customerId: customerId})).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}


//客户跟踪记录
export const customerTrack = (rules, pageIndex, pageSize) => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/customer/track/list`, qs.stringify({
            feilds: Object.keys(rules),
            values: Object.values(rules),
            pageIndex: pageIndex,
            pageSize: pageSize
        }, {
            indices: false
        })).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}

//房产联级选择
export const customerDropdown = () => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/customer/dropdown`).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}


export const noticeList = (data) => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/notice/list`, qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}


export const noticeDelete = (data) => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/notice/delete`, qs.stringify(data)).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}


export const getHouseList = (rules, pageIndex = 1, pageSize = 6) => {
    return new Promise(function (resolve, reject) {
        xhr.post(`/house/list`, qs.stringify({
            feilds: Object.keys(rules),
            values: Object.values(rules),
            pageIndex: pageIndex,
            pageSize: pageSize
        }, {
            indices: false
        })).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}