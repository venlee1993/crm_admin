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
        title: "昵称",
        key: "nickname"
    },
    {
        title: "姓名",
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

export const addRules = {
    username: [
        {required: true, message: '请输入用户名', trigger: 'blur'}
    ],
    nickname: [
        {required: true, message: '请输入昵称', trigger: 'blur'}
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