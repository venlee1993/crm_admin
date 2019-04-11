export const columns = [
    {
        title: "姓名",
        key: "name"
    },
    {
        title: "年龄",
        key: "ageRange"
    },
    {
        title: "性别",
        slot: "gender"
    },
    {
        title: "身份证号",
        key: "idNo"
    },
    {
        title: "意向房型",
        key: "intentionHouseType"
    },
    {
        title: "电话",
        key: "mobile"
    },
    {
        title: "地区",
        key: "region"
    },
    {
        title: "来源",
        key: "source"
    },
    {
        title: "状态",
        key: "status"
    },
    {
        title: "注册方式",
        key: "registedBy"
    },
    {
        title: "操作",
        slot: "action",
        width: '150',
        align: 'center'
    },
]


export const ageArea = ['20以下', '20~35', '35-50', '50以上']


export const rules = {
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
