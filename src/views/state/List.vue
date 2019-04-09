<template>
    <div class="list">

        <Breadcrumb class="bread_crumb">
            <Breadcrumb-item href="/components/breadcrumb">楼盘管理</Breadcrumb-item>
            <Breadcrumb-item>楼盘列表</Breadcrumb-item>
        </Breadcrumb>

        <div class="action_bar">
            <i-button type="primary" @click="showAddForm">添加</i-button>
            <i-button type="warning">
                <a href="http://tuan.xidawu.net:9527/house/template" style="color: white">下载房产导入模板</a>
            </i-button>
        </div>

        <Table border :columns="columns" :data="list" class="base_table" :loading="loading">
            <template slot-scope="{ row, index }" slot="download">
                <Upload
                        :action="`http://tuan.xidawu.net:9527/house/import?towerId=${row.objectId}`"
                        :headers="{'Content-Type': 'multipart/form-data','Accept': 'application/json'}"
                        :with-credentials="true"
                >
                    <i-button type="primary" icon="ios-cloud-upload-outline">导入房源</i-button>
                </Upload>
                <i-button type="primary" @click="publish(row.objectId)">发布活动</i-button>
            </template>
        </Table>


        <Modal v-model="addModal" width="600" @on-ok="submitAdd">
            <div slot="header">
                <span>发布运营活动</span>
            </div>
            <div class="publish_form">
                <Form ref="publishForm" :model="addForm" :label-width="100">
                    <FormItem label="项目编号" prop="name">
                        <Input type="text" v-model="addForm.projectNo"></Input>
                    </FormItem>
                    <FormItem label="名称" prop="name">
                        <Input type="text" v-model="addForm.name"></Input>
                    </FormItem>
                    <FormItem label="地址" prop="address">
                        <Input type="text" v-model="addForm.address"></Input>
                    </FormItem>
                    <FormItem label="电话" prop="resourceType">
                        <Input type="text" v-model="addForm.tel"></Input>
                    </FormItem>
                    <FormItem label="用地面积" prop="resourceType">
                        <Input type="text" v-model="addForm.landArea"></Input>
                    </FormItem>
                    <FormItem label="建筑面积" prop="resourceType">
                        <Input type="text" v-model="addForm.buildArea"></Input>
                    </FormItem>
                    <FormItem label="总车位数" prop="resourceType">
                        <Input type="text" v-model="addForm.parkingSpaceCounts"></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>


        <Modal v-model="publishModal" @on-ok="publishSubmit" fullscreen>
            <div slot="header">
                <span>发布运营活动</span>
            </div>
            <div class="publish_form">
                <Form ref="publishForm" :model="publishForm" :label-width="60">
                    <FormItem label="标题" prop="title">
                        <Input type="text" v-model="publishForm.title"></Input>
                    </FormItem>
                    <FormItem label="简介" prop="intro">
                        <Input type="text" v-model="publishForm.intro"></Input>
                    </FormItem>
                    <FormItem label="海报" prop="file">
                        <Input type="text" v-model="publishForm.file"></Input>
                    </FormItem>
                    <FormItem label="内容" prop="resourceType">
                        <vue-editor v-model="publishForm.content" :editorToolbar="customToolbar"></vue-editor>
                    </FormItem>
                </Form>
            </div>
        </Modal>

    </div>
</template>

<script>
    import {getTowerList, addTower, activetyAdd} from "../../service/api";
    import {VueEditor} from "vue2-editor";

    export default {
        name: "List",
        data() {
            return {
                columns: [
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
                ],
                list: [],
                loading: true,
                addModal: false,
                publishModal: false,
                publishForm: {},
                addForm: {
                    projectNo: '',
                    landArea: '',
                    address: '',
                    landArea: '',
                    buildArea: '',
                    parkingSpaceCounts: '',
                    tel: '',
                },
                addRules: {},
                customToolbar: [
                    ['bold', 'italic', 'underline'],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    ['image', 'code-block']
                ]
            }
        },
        components: {
            VueEditor
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                getTowerList().then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data;
                        this.loading = false;
                    }
                })
            },
            showAddForm() {
                this.addModal = true;
            },
            download(id) {

            },
            submitAdd() {
                addTower(this.addForm).then(res => {
                    console.log(res);
                })
            },
            publish() {
                this.publishModal = true
            },
            publishSubmit() {
                activetyAdd(this.publishForm).then(res => {
                    console.log(res);
                })
            }
        }
    }
</script>

<style scoped>

    .list {
        padding: 0 20px;
    }

    .bread_crumb {
        margin-top: 20px;
        text-align: left;
        margin-bottom: 20px;
    }

    .action_bar {
        text-align: left;
        margin-bottom: 20px;
    }

    .action_bar button {
        margin-left: 20px;
    }
</style>