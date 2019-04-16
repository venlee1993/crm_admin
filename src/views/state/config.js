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