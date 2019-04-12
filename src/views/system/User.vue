<template>
    <div class="user">
        <div class="top_bar">

            <div class="search_box">
                <Form ref="searchForm" :model="searchForm" inline class="filters">
                    <FormItem prop="username">
                        <Input type="text" v-model="searchForm.username" placeholder="用户名"></Input>
                    </FormItem>
                    <FormItem prop="mobile">
                        <Input type="text" v-model="searchForm.mobile" placeholder="手机号"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="success" @click="handleReset('searchForm')">重置</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('searchForm')">搜索</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="add_btn">
                <i-button type="primary" @click="showAddForm">添加用户</i-button>
            </div>
        </div>

        <Table border :columns="columns" :data="list" class="base_table" :loading="loading">
            <template slot-scope="{ row, index }" slot="gender">{{row.gender=='M'?'男':'女'}}</template>
            <template slot-scope="{ row, index }" slot="status">
                <Tag color="default" v-if="row.status=='ENABLE'">禁用</Tag>
                <Tag color="primary" v-else>正常</Tag>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="info" size="small" style="margin-right: 5px" @click="detail(row)">详情</Button>
                <Button type="success" size="small" style="margin-right: 5px" @click="disable(row)"
                        v-if="row.status=='ENABLE'">禁用
                </Button>
                <Button type="success" size="small" style="margin-right: 5px" @click="enable(row)" v-else>启用</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="userEdit(row)">编辑</Button>
            </template>
        </Table>

        <Page :total="pageTotal" show-elevator @on-change="pageChange"/>

        <Modal v-model="editModel" width="400" @on-ok="handleSubmit('editUserForm')">
            <div slot="header">
                <span>编辑用户</span>
            </div>
            <div class="edit_form">
                <Form ref="editUserForm" :model="editUserForm" :label-width="60">
                    <FormItem label="真名" prop="realName">
                        <Input type="text" v-model="editUserForm.realName"></Input>
                    </FormItem>
                    <FormItem label="性别" prop="gender">
                        <Input type="text" v-model="editUserForm.gender"></Input>
                    </FormItem>
                    <FormItem label="电话" prop="mobile">
                        <Input type="text" v-model="editUserForm.mobile"></Input>
                    </FormItem>
                    <FormItem label="身份证" prop="id_no">
                        <Input type="text" v-model="editUserForm.idNo"></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>

        <Modal v-model="userModal" width="750" @on-ok="handleSubmit('addUserForm')">
            <div slot="header">
                <span>添加用户</span>
            </div>
            <div class="role_form">
                <Form ref="userForm" :model="addUserForm" :label-width="100" :rules="addUserRules">
                    <div class="form_inner">
                        <div class="info" inline>
                            <FormItem label="用户姓名" prop="username">
                                <Input type="text" v-model="addUserForm.username"></Input>
                            </FormItem>
                            <FormItem label="用户昵称" prop="nickname">
                                <Input type="text" v-model="addUserForm.nickname"></Input>
                            </FormItem>
                            <FormItem label="用户电话" prop="mobile">
                                <Input type="text" v-model="addUserForm.mobile"></Input>
                            </FormItem>
                            <FormItem label="用户密码" prop="password">
                                <Input type="text" v-model="addUserForm.password"></Input>
                            </FormItem>
                            <FormItem label="用户角色" prop="roles">
                                <Select v-model="addUserForm.roles">
                                    <Option v-for="item in allRoles" :value="item.objectId">{{item.label}}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="身份证" prop="idNo">
                                <Input type="text" v-model="addUserForm.idNo"></Input>
                            </FormItem>
                        </div>
                    </div>
                </Form>
            </div>
        </Modal>

    </div>
</template>

<script>
    import {getUserList, getRoleList, addUser} from "../../service/api";
    import {columns, addRules} from "./user";

    export default {
        name: "User",
        data() {
            return {
                columns: columns,
                list: [],
                searchForm: {username: "", mobile: ""},
                pageTotal: 0,
                editModel: false,
                userModal: false,
                editUserForm: {realName: '', gender: '', mobile: '', idNo: ''},
                addUserForm: {username: '', nickname: '', mobile: '', password: '', roles: '', idNo: ''},
                addUserRules: addRules,
                allRoles: [],
                loading: true
            };
        },
        created() {
            this.userList();
            this.roleList();
        },
        computed: {
            currentRoles() {
                return this.$store.getters.roles.map(item => item.objectId)
            }
        },
        methods: {
            showAddForm() {
                this.userModal = true;
            },
            pageChange(index) {
                console.log(index);
            },
            handleSubmit(form) {
                if (form == 'searchForm') {
                    if (this.searchForm.username == '' && this.searchForm.mobile == '') return;
                    this.userFilter()
                    this.loading = true
                }
                if (form == 'addUserForm') {
                    this.addUser();
                }
            },
            handleReset(name) {
                this.loading = true;
                this.userList();
                this.$refs[name].resetFields();
            },
            userEdit(row) {
                this.editModel = true;
                this.editUserForm = row;
            },

            addUser() {
                this.userModal = true;
                let data = JSON.parse(JSON.stringify(this.addUserForm))
                data.roles = [{objectId: data['roles']}]
                addUser(data).then(res => {
                    if (res.data.code == 200) {
                        this.userList();
                        this.loading = true;
                    }
                })
            },
            userFilter() {
                this.userList(this.searchForm)
            },
            userList(data) {
                getUserList(data).then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data;
                        this.pageTotal = Number(res.data.page.pages)
                        this.loading = false;
                    }
                });
            },
            detail() {

            },
            disable() {

            },
            roleList() {
                getRoleList().then(res => {
                    if (res.data.code == 200 && res.data.data.length > 0) {
                        this.allRoles = res.data.data.map(item => {
                            return Object.assign({}, {
                                'key': item.objectId,
                                'label': item.name,
                                'role': item.role,
                                'objectId': item.objectId
                            });
                        })
                    }
                })
            }
        }
    }
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