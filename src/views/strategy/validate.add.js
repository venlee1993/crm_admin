export default {
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