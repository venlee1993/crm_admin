<template>
    <div class="contain">

        <Breadcrumb class="bread_crumb">
            <Breadcrumb-item href="/components/breadcrumb">系统管理</Breadcrumb-item>
            <Breadcrumb-item>权限设置</Breadcrumb-item>
        </Breadcrumb>

        <div class="action_column">
            <div class="search_area">
                <Form ref="searchForm" :model="searchForm" inline>
                    <FormItem prop="name">
                        <Input type="text" v-model="searchForm.name" placeholder="名称"></Input>
                    </FormItem>
                    <FormItem prop="permission">
                        <Input type="text" v-model="searchForm.permission" placeholder="权限"></Input>
                    </FormItem>
                    <FormItem prop="resourceType">
                        <Select v-model="searchForm.resourceType" style="width: 160px" placeholder="控制类型">
                            <Option value="MENU">MENU</Option>
                            <Option value="BUTTON">BUTTON</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="success" @click="handleReset('searchForm')">重置</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="goSearch">搜索</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="action_box">
                <i-button type="primary" @click="addModal = true">添加权限</i-button>
            </div>
        </div>


        <Table border :columns="columns" :data="list" class="base_table" :loading="loading">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="info" size="small" @click="detail(row)">详情</Button>
            </template>
        </Table>

        <Page :total="pageTotal" :page-size="pageSize" @on-change="pageChange"/>

        <Modal v-model="addModal" width="600">
            <div slot="header">
                <span>添加权限</span>
            </div>
            <div class="modal_inner">
                <Form ref="addForm" :model="addForm" :rules="rules" :label-width="60">
                    <FormItem label="名称" prop="name">
                        <Input type="text" v-model="addForm.name"></Input>
                    </FormItem>
                    <FormItem label="权限" prop="permission">
                        <Input type="text" v-model="addForm.permission"></Input>
                    </FormItem>
                    <FormItem label="类型" prop="resourceType">
                        <Select v-model="addForm.resourceType">
                            <Option value="MENU">MENU</Option>
                            <Option value="BUTTON">BUTTON</Option>
                        </Select>
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
    import {getPermissionList, addPermission} from '../../service/api'
    import {tableHeader, Permission, Search, rules} from './permisssion.config'

    export default {
        name: "Policy",
        data() {
            return {
                searchForm: new Search(),
                addModal: false,
                loading: true,
                columns: tableHeader,
                addForm: new Permission(),
                addLoading: false,
                rules: rules,
                list: [],
                loading: true,
                pageIndex: 1,
                pageSize: 13,
                pageTotal: 1
            }
        },
        mounted() {
            this.getList();
        },

        watch: {
            'addModal': function (status) {
                !status && this.$refs['addForm'].resetFields();
            }
        },

        methods: {
            goSearch() {
                this.pageIndex = 1;
                this.getList()
            },
            detail() {
                console.log(this.pid);
            },
            addSubmit(name) {
                let result = this.validate(name);
                if (result) {
                    this.loading = true;
                    addPermission(this.addForm).then(res => {
                        this.addModal = false;
                        if (res.data.code == 200) {
                            this.$Message.success('添加成功');
                            this.pageIndex = 1;
                            this.$refs['searchForm'].resetFields();
                            this.getList();
                        } else {
                            this.$Message.error('添加失败');
                        }
                    })
                }
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            getList() {
                this.loading = true;
                getPermissionList(this.searchForm, this.pageIndex, this.pageSize).then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data;
                        this.pageTotal = Number(res.data.page.total);
                        this.loading = false;
                    }
                })
            },
            pageChange(index) {
                this.pageIndex = index;
                this.getList();
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