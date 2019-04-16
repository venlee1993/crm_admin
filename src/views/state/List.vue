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


        <Modal v-model="addModal" width="600">
            <div slot="header">
                <span>添加楼盘</span>
            </div>
            <div class="modal_inner">
                <Form ref="addForm" :model="addForm" :label-width="100" :rules="addRules">
                    <FormItem label="项目编号" prop="projectNo">
                        <Input type="text" v-model="addForm.projectNo"></Input>
                    </FormItem>
                    <FormItem label="名称" prop="name">
                        <Input type="text" v-model="addForm.name"></Input>
                    </FormItem>
                    <FormItem label="地址" prop="address">
                        <Input type="text" v-model="addForm.address"></Input>
                    </FormItem>
                    <FormItem label="电话" prop="tel">
                        <Input type="text" v-model="addForm.tel"></Input>
                    </FormItem>
                    <FormItem label="用地面积" prop="landArea">
                        <Input type="text" v-model="addForm.landArea"></Input>
                    </FormItem>
                    <FormItem label="建筑面积" prop="buildArea">
                        <Input type="text" v-model="addForm.buildArea"></Input>
                    </FormItem>
                    <FormItem label="总车位数" prop="parkingSpaceCounts">
                        <Input type="text" v-model="addForm.parkingSpaceCounts"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="addModal=false">取消</Button>
                <Button type="primary" @click="addSubmit('addForm')" :loading="addLoading">确定</Button>
            </div>
        </Modal>


        <Modal v-model="publishModal" @on-ok="publishSubmit" fullscreen>
            <div slot="header">
                <span>发布运营活动</span>
            </div>
            <div class="modal_inner">
                <Form ref="publishForm" :model="publishForm" :label-width="60">
                    <FormItem label="标题" prop="title">
                        <Input type="text" v-model="publishForm.title"></Input>
                    </FormItem>
                    <FormItem label="简介" prop="intro">
                        <Input type="text" v-model="publishForm.intro"></Input>
                    </FormItem>
                    <FormItem label="海报" prop="file">
                        <label for="post" class="poster">
                            <div class="preview">
                                <img :src="previewSrc">
                            </div>
                            <Icon type="ios-cloud-upload" size="50" class="upload_icon"/>
                            <input type="file" value="上传" id="post" @change="preview" ref="poster">
                        </label>
                    </FormItem>
                    <FormItem label="内容" prop="content">
                        <vue-editor v-model="publishForm.content" :editorToolbar="customToolbar" useCustomImageHandler
                                    @imageAdded="handleImageAdded"></vue-editor>
                    </FormItem>
                </Form>
            </div>
        </Modal>

    </div>
</template>

<script>
    import {getTowerList, addTower, activetyAdd, houseImport, richUpload} from "../../service/api";
    import {VueEditor} from "vue2-editor";
    import {tableHeader, options, Tower, addRules} from './config'

    export default {
        name: "List",
        data() {
            return {
                list: [],
                columns: tableHeader,
                loading: false,
                addLoading: false,
                addModal: false,
                publishModal: false,
                publishForm: {},
                addForm: new Tower(),
                addRules: addRules,
                towerId: '',
                previewSrc: '',
                addLoadling: false,
                customToolbar: options
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
                this.loading = true;
                getTowerList().then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data;
                        this.loading = false;
                    }
                })
            },
            addSubmit(name) {
                let result = this.validate(name);
                if (!result) return;
                this.loading = true;
                this.addLoading = true;
                addTower(this.addForm).then(res => {
                    this.addLoading = false;
                    this.addModal = false;
                    if (res.data.code == 200) {
                        this.getList();
                        this.$Message.success('添加楼盘成功');
                    } else {
                        this.$Message.success('添加楼盘失败');
                    }
                })
            },
            publish(id) {
                this.publishModal = true
                this.towerId = id;
            },
            publishSubmit() {
                let files = this.$refs.poster.files[0]
                activetyAdd(this.publishForm, this.towerId, files).then(res => {
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
                        this.getList();
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
            },
            preview() {
                let that = this
                let image = event.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(image)
                reader.onload = function (e) {
                    that.previewSrc = this.result;
                }
            },
            validate(name) {
                let result = false;
                this.$refs[name].validate((valid) => {
                    result = valid
                })
                return result;
            }
        }
    }
</script>

<style lang="less" scoped>

    .list {
        padding: 0 20px;
    }


    .action_bar {
        text-align: left;
        margin-bottom: 20px;
    }

    .action_bar button {
        margin-left: 20px;
    }

    .action_bar button:first-child {
        margin-left: 0;
    }

    .uploader {
        display: inline-block;
        position: relative;
        margin-right: 20px;
        vertical-align: middle;
        cursor: pointer;

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

    .poster {
        display: block;
        border: 1px solid #dcdee2;
        width: 140px;
        height: 140px;
        position: relative;
        overflow: hidden;

        input {
            position: absolute;
            display: block;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            visibility: hidden;
        }

        .upload_icon {
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -25px;
            margin-top: -25px;
            color: #dcdee2;
        }

        .preview {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2;
            display: flex;
            align-items: center;

            img {
                width: 100%;
            }
        }
    }
</style>