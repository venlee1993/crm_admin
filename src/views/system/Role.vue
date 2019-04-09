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
                        <Button type="primary" @click="handleSubmit('formInline')">搜索</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="add_box">
                <i-button type="primary" @click="showAddModel">添加角色</i-button>
            </div>
        </div>

        <Table border :columns="columns" :data="list" class="base_table">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">编辑</Button>
            </template>
        </Table>

        <Page :total="page" show-elevator @on-change="pageChange"/>

        <Modal v-model="addModel" width="400" @on-ok="handleSubmit('addForm')">
            <div slot="header">
                <span>编辑用户</span>
            </div>
            <div class="add_form">
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
                </Form>
            </div>
        </Modal>

    </div>
</template>

<script>
    import {getRoleList, addRole} from "../../service/api";

    export default {
        name: "User",
        data() {
            return {
                columns: [
                    {
                        title: "ID",
                        key: "objectId"
                    },
                    {
                        title: "名称",
                        key: "name"
                    },
                    {
                        title: "角色",
                        key: "role"
                    },
                    {
                        title: "编码",
                        key: "code"
                    },
                    // {
                    //     title: "操作",
                    //     slot: "action",
                    //     width: 300,
                    //     align: "center"
                    // }
                ],
                list: [],
                editModel: false,
                addModel: false,
                formInline: {name: "", role: ""},
                formRole: {name: "", role: "", code: ""},
                page: 0
            };
        },
        created() {
            this.getList();
        },
        methods: {
            pageChange(index) {
                console.log(index);
            },
            handleSubmit(form) {
                if (form == 'addForm') {
                    addRole(this.formRole).then(res => {
                        if (res.data.code == 200) {
                            this.getList();
                        }
                    })
                }
            },
            edit(row) {
                this.editModel = true;
                this.formRole = row;
            },
            showAddModel() {
                this.addModel = true;
            },
            getList() {
                getRoleList().then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data;
                        this.page = Number(res.data.page.total)
                    }
                });
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