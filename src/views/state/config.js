export const tableHeader = [
    {
        title: "序号",
        type: "index",
        width: 60,
        align: "center"
    },
    {
        title: "用户名",
        key: "name"
    },
    {
        title: "联系人",
        key: "contacts"
    },
    {
        title: "电话",
        key: "tel"
    },
    {
        title: "房产数量",
        key: "houseCount"
    },
    {
        title: "地址",
        key: "address"
    },
    {
        title: "项目号",
        key: "projectNo"
    },
    {
        title: "操作",
        slot: "download",
        width: 400,
        align: "center"
    }
]

export const options = [
    ['bold', 'italic', 'underline'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['image', 'code-block']
]


export const activty = [
    {
        title: "标题",
        key: "title"
    },
    {
        title: "简介",
        key: "intro"
    },
    {
        title: "海报",
        slot: "poster",
        align: "center"
    },
    {
        title: "内容",
        key: "content"
    },
    {
        title: "状态",
        key: "status"
    },
    {
        title: "状态",
        slot: "action",
        align: "center"
    }
]


export const addRules = {
    projectNo: [
        {required: true, message: '请输入项目编号', trigger: 'blur'}
    ],
    name: [
        {required: true, message: '请输入名称', trigger: 'blur'}
    ],
    address: [
        {required: true, message: '请输入地址', trigger: 'blur'}
    ],
    tel: [
        {required: true, message: '请输入电话', trigger: 'blur', max: 11},
    ],
    landArea: [
        {required: true, message: '请输入用地面积', trigger: 'blur'},
    ],
    buildArea: [
        {required: true, message: '请输入建地面积', trigger: 'blur'},
    ],
    parkingSpaceCounts: [
        {required: true, message: '请输入总车位数', trigger: 'blur'},
    ]
}


export class Tower {
    constructor(projectNo = '', name = '', address = '', tel = '', landArea = '', buildArea = '', parkingSpaceCounts = '') {
        this.projectNo = projectNo;
        this.name = name;
        this.address = address;
        this.tel = tel;
        this.landArea = landArea;
        this.buildArea = buildArea;
        this.parkingSpaceCounts = parkingSpaceCounts;
    }
}


export class Activty {

    constructor(title = '', intro = '', post = null, content = '') {
        this.title = title;
        this.intro = intro;
        this.post = post;
        this.content = content;
    }


    formdate() {
        let data = new FormData();
        data.append('title', this.title)
        data.append('intro', this.intro)
        data.append('post', this.post)
        data.append('content', this.content)
        return data;
    }
}