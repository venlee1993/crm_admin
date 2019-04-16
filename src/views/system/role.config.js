export const tableHeader = [
    {
        title: "ID",
        key: "objectId"
    },
    {
        title: "名称",
        key: "name"
    },
    {
        title: "角色",
        key: "role"
    },
    {
        title: "编码",
        key: "code"
    }
]


export const rules = {
    name: [
        {required: true, message: '请输入名称', trigger: 'blur'}
    ],
    role: [
        {required: true, message: '请输入角色', trigger: 'blur'}
    ],
    code: [
        {required: true, message: '请输入编码', trigger: 'blur'},
        {type: 'string', max: 8, message: '不得超过八个字符', trigger: 'blur'}
    ],
    permissions: [
        {required: true, message: '请选择权限', trigger: 'change', type: 'array', min: 1},
    ]
}

export class Role {
    constructor(name = '', role = '', code = '', permissions = []) {
        this.name = name;
        this.role = role;
        this.code = code;
        this.permissions = permissions
    }

    formData() {
        let permissions = this.permissions.map(item => {
            return {objectId: item}
        })
        return {
            name: this.name,
            role: this.role,
            code: this.code,
            permissions: permissions
        }

    }
}

export class Search {
    constructor(name = '', role = '') {
        this.name = name;
        this.role = role;
    }
}