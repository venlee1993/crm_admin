export const columns = [
    {
        title: "ID",
        key: "objectId"
    },
    {
        title: "类型",
        key: "type"
    },
    {
        title: "创建者",
        key: "username"
    },
    {
        title: "创建者",
        key: "createdAt"
    },
    {
        title: "操作",
        slot: "action",
        align: 'center'
    }
]

export const rules = {
    name: [
        {required: true, message: '策略名称不能为空', trigger: 'blur'}
    ],
    type: [
        {required: true, message: '类型不能为空', trigger: 'blur'}
    ],
    timespan: [
        {required: true, message: '周期不能为空', trigger: 'blur'}
    ]
}