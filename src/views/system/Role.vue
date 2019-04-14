<template>
    <div class="user">

        <Breadcrumb class="bread_crumb">
            <Breadcrumb-item href="/components/breadcrumb">系统管理</Breadcrumb-item>
            <Breadcrumb-item>角色管理</Breadcrumb-item>
        </Breadcrumb>

        <div class="top_bar">
            <div class="search_box">
                <Form ref="formInline" :model="formInline" inline class="filters">
                    <FormItem prop="username">
                        <Input type="text" v-model="formInline.username" placeholder="名称"></Input>
                    </FormItem>
                    <FormItem prop="mobile">
                        <Input type="text" v-model="formInline.mobile" placeholder="角色"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="AddSubmit">搜索</Button>
                    </FormItem>
                </Form>
            </div>

            <div class="add_box">
                <i-button type="primary" @click="addModel = true">添加角色</i-button>
            </div>
        </div>

        <Table border :columns="columns" :data="list" class="base_table" :loading="loading">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">编辑</Button>
            </template>
        </Table>

        <Page :total="totalPage" show-elevator @on-change="pageChange" :page-size="10"/>

        <Modal v-model="addModel" width="600" @on-ok="handleSubmit('addForm')">
            <div slot="header">
                <span>编辑用户</span>
            </div>
            <div class="form_inner">
                <Form ref="addForm" :model="formRole" :label-width="60">
                    <FormItem label="角色" prop="role">
                        <Input type="text" v-model="formRole.role"></Input>
                    </FormItem>
                    <FormItem label="名称" prop="name">
                        <Input type="text" v-model="formRole.name"></Input>
                    </FormItem>
                    <FormItem label="编码" prop="code">
                        <Input type="text" v-model="formRole.code"></Input>
                    </FormItem>
                    <FormItem label="权限" prop="code">
                        <Input type="text" v-model="formRole.code"></Input>
                    </FormItem>
                </Form>
            </div>
        </Modal>

    </div>
</template>

<script>
    import {getRoleList, addRole} from "../../service/api";
    import {tableHeader} from "./role.config";

    export default {
        name: "User",
        data() {
            return {
                columns: tableHeader,
                list: [],
                loading: false,
                editModel: false,
                addModel: false,
                formInline: {name: "", role: ""},
                formRole: {name: "", role: "", code: ""},
                totalPage: 0,
                pageIndex: 1,
                rolesList: []
            };
        },
        created() {
            getRoleList().then(res => {
                console.log(res);
            })
        },
        mounted() {
            this.getList();
        },
        methods: {
            pageChange(index) {
                console.log(index);
            },
            addSubmit() {
                addRole(this.formRole).then(res => {
                    if (res.data.code == 200) {
                        this.getList();
                    }
                })
            },
            edit(row) {
                this.editModel = true;
                this.formRole = row;
            },
            getList() {
                this.loading = true;
                getRoleList().then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data;
                        this.totalPage = Number(res.data.page.total)
                        this.loading = false;
                    }
                })
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

        .bread_crumb {
            margin-top: 20px;
            text-align: left;
        }
    }

    .filters {
        padding-top: 24px;
        text-align: left;
    }

    .base_table {
        margin-bottom: 20px;
    }
</style>