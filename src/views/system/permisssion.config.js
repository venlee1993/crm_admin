export const tableHeader = [
    {
        title: "序号",
        type: "index"
    },
    {
        title: "名称",
        key: "name"
    },
    {
        title: "权限",
        key: "permission"
    },
    {
        title: "控制类型",
        key: "resourceType"
    },
    {
        title: "操作",
        slot: "action",
        align: "center"
    }
]


export const rules = {
    name: [
        {required: true, message: '请输入名称', trigger: 'blur'}
    ],
    permission: [
        {required: true, message: '请输入权限', trigger: 'blur'}
    ],
    resourceType: [
        {required: true, message: '请输入类型', trigger: 'change'}
    ]
}


export class Permission {
    constructor(name = '', permission = '', resourceType = '') {
        this.name = name;
        this.permission = permission;
        this.resourceType = resourceType;
    }
}


export class Search {
    constructor(name = '', permission = '', resourceType = '') {
        this.name = name;
        this.permission = permission;
        this.resourceType = resourceType
    }
}