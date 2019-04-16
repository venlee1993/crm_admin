<template>
    <div class="contain">

        <Breadcrumb class="bread_crumb">
            <Breadcrumb-item href="/components/breadcrumb">系统管理</Breadcrumb-item>
            <Breadcrumb-item>用户管理</Breadcrumb-item>
        </Breadcrumb>

        <div class="action_column">

            <div class="search_area">
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
                        <Button type="primary" @click="goSearch">搜索</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="action_area">
                <i-button type="primary" @click="addModal=true">添加用户</i-button>
            </div>
        </div>

        <Table border :columns="columns" :data="list" class="base_table" :loading="loading">
            <template slot-scope="{ row, index }" slot="gender">{{row.gender=='M'?'男':'女'}}</template>
            <template slot-scope="{ row, index }" slot="status">
                <Tag color="primary" v-if="row.status=='ENABLE'">正常</Tag>
                <Tag color="default" v-else>禁用</Tag>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <div class="action_box">
                    <Button type="info" size="small" @click="detail(row)">详情</Button>
                    <Button type="warning" size="small" @click="disable(row)" v-if="row.status=='ENABLE'">禁用</Button>
                    <Button type="success" size="small" @click="enable(row)" v-else>启用</Button>
                    <!--                    <Button type="primary" size="small" @click="userEdit(row)">编辑</Button>-->
                </div>
            </template>
        </Table>

        <Page :total="pageTotal" :page-size="pageSize" show-elevator @on-change="pageChange"/>

        <Modal v-model="editModel" width="600" @on-ok="editSubmit('editForm')">
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

        <Modal v-model="addModal" width="750" :mask-closable="false">
            <div slot="header">
                <span>添加用户</span>
            </div>
            <div class="modal_inner">
                <Form ref="addForm" :model="addForm" :label-width="100" :rules="userRules">
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
                    <FormItem label="性别" prop="gender">
                        <Select v-model="addForm.gender">
                            <Option value="M">男</Option>
                            <Option value="F">女</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="电话" prop="mobile">
                        <Input type="text" v-model="addForm.mobile"></Input>
                    </FormItem>
                    <FormItem label="身份证" prop="idNo">
                        <Input type="text" v-model="addForm.idNo"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="addModal=false">取消</Button>
                <Button type="primary" @click="addSubmit('addForm')" :loading="addLoading">确定</Button>
            </div>
        </Modal>

    </div>
</template>

<script>
    import {getUserList, getRoleList, addUser, disableUser, enableUser} from "../../service/api";
    import {columns, userRules, Role, User} from "./user.config";

    export default {
        name: "User",
        data() {
            return {
                columns: columns,
                list: [],
                userRules: userRules,
                searchForm: {},
                editModel: false,
                addModal: false,
                loading: true,
                addLoading: false,
                editForm: {},
                addForm: new User(),
                allRoles: [],
                pageIndex: 1,
                pageSize: 13,
                pageTotal: 0
            }
        },
        mounted() {
            this.getList();
            this.roleList();
        },
        methods: {
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            pageChange(index) {
                this.pageIndex = index;
                this.getList();
            },
            goSearch() {
                this.pageIndex = 1;
                this.getList();
            },
            addSubmit(name) {
                let result = this.validate(name);
                if (result) {
                    let user = this.addForm.formdata();
                    this.addLoading = true;
                    addUser(user).then(res => {
                        this.addModal = false;
                        this.addLoading = false;
                        if (res.data.code == 200) {
                            this.getList();
                            this.addForm.reset();
                            this.$Message.success('添加成功')
                        } else {
                            this.$Message.error('添加失败')
                        }
                    })
                }
            },
            editSubmit() {

            },
            userEdit(row) {
                this.editModel = true;
                this.editForm.init(row);
            },
            getList() {
                this.loading = true;
                getUserList(this.searchForm, this.pageIndex, this.pageSize).then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data;
                        this.pageTotal = Number(res.data.page.total)
                        this.loading = false;
                    }
                })
            },
            detail() {

            },
            disable(row) {
                this.modalInstance(row)
            },
            enable(row) {
                this.loading = true;
                enableUser(row.objectId).then(res => {
                    if (res.data.code == 200) {
                        this.getList();
                        this.$Message.success('启用成功')
                    } else {
                        this.$Message.error(res.data.msg)
                    }
                })
            },
            modalInstance(row) {
                this.$Modal.confirm({
                    title: '提示',
                    content: `<p>禁用${row.username}？</p>`,
                    onOk: () => {
                        this.loading = true;
                        disableUser(row.objectId).then(res => {
                            if (res.data.code == 200) {
                                this.getList();
                                this.$Message.success('操作成功')
                            } else {
                                this.$Message.error('操作失败')
                            }
                        })
                    }
                })
            },
            roleList() {
                getRoleList().then(res => {
                    if (res.data.code == 200) {
                        this.allRoles = res.data.data.map(item => new Role(item.obj, item.name, item.roang, item.objectId))
                    }
                })
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

<style lang="less" scoped></style>