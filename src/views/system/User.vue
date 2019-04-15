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
                        <Button type="primary" @click="goSearch('searchForm')">搜索</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="add_btn">
                <i-button type="primary" @click="addModal=true">添加用户</i-button>
            </div>
        </div>

        <Table border :columns="columns" :data="list" class="base_table" :loading="loading">
            <template slot-scope="{ row, index }" slot="gender">{{row.gender=='M'?'男':'女'}}</template>
            <template slot-scope="{ row, index }" slot="status">
                <Tag color="default" v-if="row.status=='ENABLE'">禁用</Tag>
                <Tag color="primary" v-else>正常</Tag>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <div class="action_box">
                    <Button type="info" size="small" @click="detail(row)">详情</Button>
                    <Button type="success" size="small" @click="disable(row)" v-if="row.status=='ENABLE'">禁用</Button>
                    <Button type="success" size="small" @click="enable(row)" v-else>启用</Button>
                    <Button type="primary" size="small" @click="userEdit(row)">编辑</Button>
                </div>
            </template>
        </Table>

        <Page :total="pageTotal" show-elevator @on-change="pageChange"/>

        <Modal v-model="editModel" width="400" @on-ok="editSubmit('editForm')">
            <div slot="header">
                <span>编辑用户</span>
            </div>
            <div class="edit_form">
                <Form ref="editForm" :model="editForm" :label-width="60">
                    <FormItem label="真名" prop="realName">
                        <Input type="text" v-model="editForm.realName"></Input>
                    </FormItem>
                    <FormItem label="性别" prop="gender">
                        <Input type="text" v-model="editForm.gender"></Input>
                    </FormItem>
                    <FormItem label="电话" prop="mobile">
                        <Input type="text" v-model="editForm.mobile"></Input>
                    </FormItem>
                    <FormItem label="身份证" prop="idNo">
                        <Input type="text" v-model="editForm.idNo"></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>

        <Modal v-model="addModal" width="750" @on-ok="addSubmit('addForm')">
            <div slot="header">
                <span>添加用户</span>
            </div>
            <div class="role_form">
                <Form ref="userForm" :model="addForm" :label-width="100" :rules="userRules">
                    <div class="form_inner">
                        <div class="info">
                            <FormItem label="用户角色" prop="roles">
                                <Select v-model="addForm.roles">
                                    <Option v-for="item in allRoles" :value="item.objectId">{{item.label}}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="用户名" prop="username">
                                <Input type="text" v-model="addForm.username"></Input>
                            </FormItem>
                            <FormItem label="密码" prop="password">
                                <Input type="text" v-model="addForm.password"></Input>
                            </FormItem>
                            <FormItem label="真实姓名" prop="realName">
                                <Input type="text" v-model="addForm.realName"></Input>
                            </FormItem>
                            <FormItem label="电话" prop="mobile">
                                <Input type="text" v-model="addForm.mobile"></Input>
                            </FormItem>
                            <FormItem label="身份证" prop="idNo">
                                <Input type="text" v-model="addForm.idNo"></Input>
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
    import {columns, userRules, Role, User} from "./user.config";

    export default {
        name: "User",
        data() {
            return {
                columns: columns,
                list: [],
                searchForm: {},
                pageTotal: 0,
                editModel: false,
                addModal: false,
                editForm: {},
                addForm: {},
                userRules: userRules,
                allRoles: [],
                loading: true
            }
        },
        created() {
            this.getList();
            this.roleList();
        },
        methods: {
            pageChange(index) {
                console.log(index);
            },
            goSearch() {
                if (this.searchForm.username == '' && this.searchForm.mobile == '') return;
                this.getList(this.searchForm)
                this.loading = true
            },
            addSubmit() {
                let user = new User(this.addForm);
                addUser(user).then(res => {
                    if (res.data.code == 200) {
                        this.getList();
                    }
                })
            },
            handleReset(name) {
                this.loading = true;
                this.$refs[name].resetFields();
                this.getList();
            },
            userEdit(row) {
                this.editModel = true;
                this.editForm = row;
            },
            getList(data) {
                this.loading = true;
                getUserList(data).then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data;
                        this.pageTotal = Number(res.data.page.pages)
                        this.loading = false;
                    }
                })
            },
            detail() {

            },
            disable() {

            },
            roleList() {
                getRoleList().then(res => {
                    if (res.data.code == 200) {
                        this.allRoles = res.data.data.map(item => new Role(item.obj, item.name, item.roang, item.objectId))
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