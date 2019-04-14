export const columns = [
    {
        title: "ID",
        key: "objectId"
    },
    {
        title: "策略名称",
        key: "name"
    },
    {
        title: "类型",
        slot: "type"
    },
    {
        title: "创建者",
        key: "username"
    },
    {
        title: "提醒周期(天)",
        key: "timespan"
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