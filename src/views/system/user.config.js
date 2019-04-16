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
        slot: "gender",
        align: "center"
    },
    {
        title: "手机号",
        key: "mobile"
    },
    {
        title: "状态",
        slot: "status",
        align: "center"
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
    gender: [
        {required: true, message: '请输入性别', trigger: 'blur'}
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


export const User = class User {
    constructor(username = '', realName = '', gender = 'M', mobile = '', password = '', roles = '', idNo = '') {
        this.username = username;
        this.realName = realName;
        this.mobile = mobile;
        this.gender = gender;
        this.password = password;
        this.roles = roles;
        this.idNo = idNo;
    }

    formdata() {
        return {
            username: this.username,
            realName: this.realName,
            mobile: this.mobile,
            gender: this.gender,
            password: this.password,
            roles: [{objectId: this.roles}],
            idNo: this.idNo
        }
    }

    reset() {
        this.username = '';
        this.realName = '';
        this.mobile = '';
        this.password = '';
        this.roles = '';
        this.idNo = '';
    }

    init(data) {
        return {
            realName: data['realName'],
            mobile: data['mobile'],
            gender: data['gender'],
            idNo: data['idNo']
        }
    }
}