<template>
    <div class="contain">

        <Breadcrumb class="bread_crumb">
            <Breadcrumb-item href="/components/breadcrumb">系统管理</Breadcrumb-item>
            <Breadcrumb-item>角色管理</Breadcrumb-item>
        </Breadcrumb>

        <div class="action_column">
            <div class="search_area">
                <Form ref="searchForm" :model="searchForm" inline class="filters">
                    <FormItem prop="name">
                        <Input type="text" v-model="searchForm.name" placeholder="名称"></Input>
                    </FormItem>
                    <FormItem prop="role">
                        <Input type="text" v-model="searchForm.role" placeholder="角色"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="success" @click="handleReset('searchForm')">重置</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="goSearch">搜索</Button>
                    </FormItem>
                </Form>
            </div>

            <div class="add_box">
                <i-button type="primary" @click="addModel = true">添加角色</i-button>
            </div>
        </div>

        <Table border :columns="columns" :data="list" class="base_table" :loading="loading"></Table>

        <Page :total="totalPage" show-elevator @on-change="pageChange" :page-size="10"/>

        <Modal v-model="addModel" width="600" :mask-closable="false">
            <div slot="header">
                <span>添加角色</span>
            </div>
            <div class="modal_inner">
                <Form ref="addForm" :model="addForm" :label-width="60" :rules="rules">
                    <FormItem label="权限" prop="permissions">
                        <Select v-model="addForm.permissions" multiple filterable>
                            <Option v-for="option in permissions" :value="option.objectId"
                                    :key="option.objectId">{{option.name}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="角色" prop="role">
                        <Input type="text" v-model="addForm.role"></Input>
                    </FormItem>
                    <FormItem label="名称" prop="name">
                        <Input type="text" v-model="addForm.name"></Input>
                    </FormItem>
                    <FormItem label="编码" prop="code">
                        <Input type="text" v-model="addForm.code"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="addModel=false">取消</Button>
                <Button type="primary" @click="addSubmit('addForm')" :loading="addLoading">确定</Button>
            </div>
        </Modal>

    </div>
</template>

<script>
    import {getRoleList, addRole, getPermissionList} from "../../service/api";
    import {tableHeader, Role, rules, Search} from "./role.config";

    export default {
        name: "User",
        data() {
            return {
                columns: tableHeader,
                list: [],
                loading: false,
                addModel: false,
                searchForm: new Search(),
                addForm: new Role(),
                rules: rules,
                totalPage: 0,
                pageIndex: 1,
                pageSize: 13,
                rolesList: [],
                permissions: [],
                addLoading: false
            };
        },
        mounted() {
            this.getList();
            this.getPermission();
        },
        methods: {
            pageChange(index) {
                this.pageIndex = index;
                this.getList();
            },
            addSubmit(name) {
                let result = this.validate(name)
                let role = this.addForm.formData();
                if (result) {
                    this.addLoading = true;
                    addRole(role).then(res => {
                        this.addModel = false;
                        this.loading = true;
                        if (res.data.code == 200) {
                            this.getList();
                            this.addLoading = false;
                            this.$Message.success('添加成功')
                        }
                        else {
                            this.$Message.error('添加失败')
                        }
                    })
                }
            },
            getList() {
                this.loading = true;
                getRoleList(this.searchForm, this.pageIndex, this.pageSize).then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data;
                        this.totalPage = Number(res.data.page.total)
                        this.loading = false;
                    }
                })
            },
            goSearch() {
                this.pageIndex = 1;
                this.getList();
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            getPermission() {
                getPermissionList({}, 1, 30).then(res => {
                    if (res.data.code == 200) {
                        this.permissions = res.data.data;
                    }
                })
            },
            validate(name) {
                let result = false;
                this.$refs[name].validate(valid => {
                    result = valid
                })
                return result;
            }
        }
    };
</script>

<style lang="less" scoped></style>