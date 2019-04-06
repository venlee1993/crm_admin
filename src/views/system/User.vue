<template>
    <div class="user">
        <div class="top_bar">
            <div class="search_box">
                <Form ref="formInline" :model="formInline" inline class="filters">
                    <FormItem prop="username">
                        <Input type="text" v-model="formInline.username" placeholder="用户名"></Input>
                    </FormItem>
                    <FormItem prop="mobile">
                        <Input type="text" v-model="formInline.mobile" placeholder="手机号"></Input>
                    </FormItem>
                    <FormItem prop="gender">
                        <Select v-model="formInline.gender" style="width:162px">
                            <Option value="M" key="M">男</Option>
                            <Option value="W" key="W">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem prop="status">
                        <Select v-model="formInline.status" style="width:162px">
                            <Option value="ENABLE" key="M">正常</Option>
                            <Option value="DISABLE" key="W">禁用</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="add_btn">
                <i-button type="primary" @click="addUser">添加用户</i-button>
            </div>
        </div>
        <Table border :columns="columns" :data="list" class="base_table">
            <template slot-scope="{ row, index }" slot="gender">{{row.gender=='M'?'男':'女'}}</template>
            <template slot-scope="{ row, index }" slot="status">
                <Tag color="default" v-if="row.status=='ENABLE'">禁用</Tag>
                <Tag color="primary" v-else>正常</Tag>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="info" size="small" style="margin-right: 5px">查看</Button>
                <Button type="success" size="small" style="margin-right: 5px" @click="roleEdit(row)">角色</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="userEdit(row)">编辑</Button>
                <Button type="warning" size="small">删除</Button>
            </template>
        </Table>
        <Page :total="pageTotal" show-elevator @on-change="pageChange"/>

        <Modal v-model="editModel" width="400" @on-ok="handleSubmit('formCustom')">
            <div slot="header">
                <span>编辑用户</span>
            </div>
            <div class="edit_form">
                <Form ref="formCustom" :model="formCustom" :label-width="60">
                    <FormItem label="真名" prop="realName">
                        <Input type="text" v-model="formCustom.realName"></Input>
                    </FormItem>
                    <FormItem label="性别" prop="gender">
                        <Input type="text" v-model="formCustom.gender"></Input>
                    </FormItem>
                    <FormItem label="电话" prop="mobile">
                        <Input type="text" v-model="formCustom.mobile"></Input>
                    </FormItem>
                    <FormItem label="身份证" prop="id_no">
                        <Input type="text" v-model="formCustom.id_no"></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>

        <Modal v-model="roleModal" width="452" @on-ok="handleSubmit('formCustom')">
            <div slot="header">
                <span>角色分配</span>
            </div>
            <div class="role_form">
                <Transfer
                        :data="allRoles"
                        :target-keys="currentRoles"
                        :render-format="render1"
                        :titles="['未分配角色','已分配角色']"
                        @on-change="transferChange"
                ></Transfer>
            </div>
        </Modal>

        <Modal v-model="userModal" width="750" @on-ok="handleSubmit('formUser')">
            <div slot="header">
                <span>角色分配</span>
            </div>
            <div class="role_form">
                <Form ref="userForm" :model="formUser" :label-width="60">
                    <div class="form_inner">
                        <div class="avatar">
                            <Upload
                                    v-ref:upload
                                    :show-upload-list="false"
                                    :default-file-list="defaultList"
                                    :on-success="handleSuccess"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="2048"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload"
                                    multiple
                                    type="drag"
                                    class="uploader">
                                <div class="preview">
                                    <span>上传图像</span>
                                </div>
                            </Upload>
                        </div>
                        <div class="info" inline>
                            <FormItem label="用户姓名" prop="name">
                                <Input type="text" v-model="formUser.name"></Input>
                            </FormItem>
                            <FormItem label="用户昵称" prop="nickname">
                                <Input type="text" v-model="formUser.nickname"></Input>
                            </FormItem>
                            <FormItem label="用户电话" prop="mobile">
                                <Input type="text" v-model="formUser.mobile"></Input>
                            </FormItem>

                            <FormItem label="用户密码" prop="password">
                                <Input type="text" v-model="formUser.password"></Input>
                            </FormItem>
                            <FormItem label="用户角色" prop="role">
                                <Select v-model="formUser.role">
                                    <Option value="12121212">系统管理员</Option>
                                    <Option value="12121212">总经理</Option>
                                    <Option value="12121212">销售经理</Option>
                                    <Option value="12121212">置业顾问</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="身份证" prop="idNo">
                                <Input type="text" v-model="formUser.idNo"></Input>
                            </FormItem>
                        </div>
                    </div>
                </Form>
            </div>
        </Modal>

    </div>
</template>

<script>
    import {getUserList, getRoleList} from "../../service/api";

    export default {
        name: "User",
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
                        key: "username"
                    },
                    {
                        title: "昵称",
                        key: "nickname"
                    },
                    {
                        title: "姓名",
                        key: "realName"
                    },
                    {
                        title: "性别",
                        slot: "gender"
                    },
                    {
                        title: "手机号",
                        key: "mobile"
                    },
                    {
                        title: "状态",
                        slot: "status"
                    },
                    {
                        title: "操作",
                        slot: "action",
                        width: 300,
                        align: "center"
                    }
                ],
                list: [],
                formInline: {
                    username: "",
                    mobile: "",
                    gender: "",
                    status: "",
                    pageIndex: 1
                },
                pageTotal: 0,
                editModel: false,
                roleModal: false,
                userModal: false,
                formCustom: {
                    realName: '',
                    gender: '',
                    mobile: '',
                    id_no: ''

                },
                formUser: {},
                currentRoles: ['1'],
                allRoles: []
            };
        },
        created() {
            getUserList().then(res => {
                if (res.data.code == 200) {
                    this.list = res.data.data;
                    this.pageTotal = Number(res.data.page.pages)
                }
            });
            getRoleList().then(res => {
                if (res.data.code == 200 && res.data.data.length > 0) {
                    this.allRoles = res.data.data.map(item => {
                        return Object.assign({}, {'key': item.objectId, 'label': item.name, 'disabled': false});
                    })
                }
            })
        },
        methods: {

            pageChange(index) {
                console.log(index);
            },
            handleSubmit(form) {
                console.log(form);
            },
            getListByRules() {

            },
            userEdit(row) {
                this.editModel = true;
                this.formCustom = row;
            },
            roleEdit() {
                this.roleModal = true;
            },
            render1(item) {
                return item.label;
            },
            transferChange(newTargetKeys, direction, moveKeys) {
                console.log(newTargetKeys);
                console.log(direction);
                console.log(moveKeys);
                this.currentRoles = newTargetKeys;
            },
            addUser() {
                this.userModal = true;
            }
        }
    };
</script>

<style lang="less" scoped>
    .user {
        padding: 0 20px;

        .top_bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    .filters {
        padding-top: 24px;
        text-align: left;
    }

    .base_table {
        margin-bottom: 20px;
    }

    .form_inner {
        display: flex;
        padding: 0 20px;

        .avatar {
            margin-right: 20px;
        }

        .info {
            flex: 1;
        }
    }

    .preview {
        width: 150px;
        height: 150px;
        line-height: 150px;
    }

    .uploader {
        display: inline-block;
        width: 150px;
    }
</style>