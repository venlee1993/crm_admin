<template>
    <div class="list">

        <Breadcrumb class="bread_crumb">
            <Breadcrumb-item href="/components/breadcrumb">楼盘管理</Breadcrumb-item>
            <Breadcrumb-item>楼盘列表</Breadcrumb-item>
        </Breadcrumb>

        <div class="action_bar">
            <Button type="primary" @click="addModal=true">添加</Button>
            <Button type="warning">
                <a href="http://tuan.xidawu.net:9527/house/template" style="color: white">下载房产导入模板</a>
            </Button>
        </div>

        <Table border :columns="columns" :data="list" class="base_table" :loading="loading">
            <template slot-scope="{ row, index }" slot="download">
                <label for="file" class="uploader">
                    <input type="file" value="上传" id="file" @change="uploadAction(row.objectId)">
                    <span>导入房产</span>
                </label>
                <Button type="warning" @click="publish(row.objectId)">发布活动</Button>
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
                    <FormItem label="内容" prop="content">
                        <vue-editor
                                v-model="publishForm.content"
                                :editorToolbar="customToolbar"
                                useCustomImageHandler
                                @imageAdded="handleImageAdded"
                        ></vue-editor>
                    </FormItem>
                </Form>
            </div>
        </Modal>

    </div>
</template>

<script>
    import {getTowerList, addTower, activetyAdd, houseImport, richUpload} from "../../service/api";
    import {VueEditor} from "vue2-editor";
    import config from './config'
    import editorConfig from './editorConfig'

    export default {
        name: "List",
        data() {
            return {
                list: [],
                columns: config,
                loading: true,
                addModal: false,
                publishModal: false,
                publishForm: {},
                addForm: {},
                addRules: {},
                customToolbar: editorConfig
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
            submitAdd() {
                addTower(this.addForm).then(res => {
                    if (res.data.code == 200) {
                        this.$Message.success('添加楼盘成功');
                    } else {
                        this.$Message.success('添加楼盘失败');
                    }
                })
            },
            publish() {
                this.publishModal = true
            },
            publishSubmit() {
                activetyAdd(this.publishForm).then(res => {
                    if (res.data.code == 200) {
                        if (res.data.code == 200) {
                            this.$Message.success('发布成功');
                        } else {
                            this.$Message.error('发布失败');
                        }
                    }
                })
            },
            uploadAction(id) {
                let file = event.target.files[0];
                let formdata = new FormData();
                formdata.append('file', file)
                houseImport(id, formdata).then(res => {
                    if (res.data.code == 200) {
                        this.$Message.success('上传Excel成功');
                    } else {
                        this.$Message.error('上传失败');
                    }
                })
            },
            handleImageAdded(file, Editor, cursorLocation, resetUploader) {
                let formData = new FormData()
                formData.append('file', file)
                richUpload(formData).then(res => {
                    if (res.data.code == 200) {
                        Editor.insertEmbed(cursorLocation, 'image', res.data.data);
                        resetUploader();
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>

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

    .uploader {
        display: inline-block;
        position: relative;
        margin-right: 20px;
        vertical-align: middle;

        span {
            display: block;
            background: #2d8cf0;
            padding: 6px 15px 6px;
            color: white;
            font-weight: 400;
            font-size: 12px;
            touch-action: manipulation;
            user-select: none;
            border: 1px solid transparent;
            border-radius: 4px;
        }

        input {
            position: absolute;
            display: block;
            width: 100%;
            z-index: -1;
        }
    }
</style>