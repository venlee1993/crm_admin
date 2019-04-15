export const columns = [
    {
        title: "序号",
        type: "index",
        width: 60,
        align: "center"
    },
    {
        title: "用户名",
        key: "username"
    },
    {
        title: "真实姓名",
        key: "realName"
    },
    {
        title: "性别",
        slot: "gender"
    },
    {
        title: "手机号",
        key: "mobile"
    },
    {
        title: "状态",
        slot: "status"
    },
    {
        title: "操作",
        slot: "action",
        width: 300,
        align: "center"
    }
]

export const userRules = {
    username: [
        {required: true, message: '请输入用户名', trigger: 'blur'}
    ],
    realName: [
        {required: true, message: '请输入真实姓名', trigger: 'blur'}
    ],
    mobile: [
        {required: true, message: '电话', trigger: 'blur'},
    ],
    password: [
        {required: true, message: '密码', trigger: 'blur'},
    ],
    roles: [
        {required: true, message: '请选择角色', trigger: 'blur'},
    ],
    idNo: [
        {required: true, message: '请输入身份证', trigger: 'blur'},
    ]
}


//角色模型
export const Role = class Role {
    constructor(key = '', label = '', role = '', objectId = '') {
        this.key = key;
        this.label = label;
        this.role = role;
        this.objectId = objectId
    }
}

//用户模型
export const User = class User {
    constructor(data) {
        Object.keys(data).forEach(key => {
            if (key == 'roles') {
                this['roles'] = [{objectId: data[key]}]
            } else {
                this[key] = data[key]
            }
        })
    }
}