import xhr from 'http'

export const login = () => {
    return new Promise(function (resolve, reject) {
        xhr.get('/api/user/login?username=admin&password=123456').then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}