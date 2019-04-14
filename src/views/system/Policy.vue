<template>
    <div class="policy">

        <Breadcrumb class="bread_crumb">
            <Breadcrumb-item href="/components/breadcrumb">系统管理</Breadcrumb-item>
            <Breadcrumb-item>权限设置</Breadcrumb-item>
        </Breadcrumb>

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
                <i-button type="primary" @click="addModal = true">添加权限</i-button>
            </div>
        </div>


        <Table border :columns="columns" :data="list" class="base_table" :loading="loading">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="info" size="small" style="margin-right: 5px" @click="detail(row)">详情</Button>
            </template>
        </Table>

        <Page :total="pageTotal" :page-size="pageSize" @on-change="pageChange"/>

        <Modal v-model="addModal" width="400" @on-ok="handleSubmit">
            <div slot="header">
                <span>添加权限</span>
            </div>
            <div class="add_form">
                <Form ref="addForm" :model="addForm" :label-width="60">
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
        </Modal>
    </div>
</template>

<script>
    import {getPermissionList, addPermission} from '../../service/api'
    import {tableHeader} from './policy.config'

    export default {
        name: "Policy",
        data() {
            return {
                searchForm: {},
                addModal: false,
                loading: true,
                columns: tableHeader,
                addForm: {name: '', permission: '', resourceType: ''},
                list: [],
                loading: true,
                pageIndex: 1,
                pageSize: 10,
                pageTotal: 1
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            detail() {
                console.log(this.pid);
            },
            handleSubmit() {
                addPermission(this.addForm).then(res => {
                    if (res.data.code == 200) {
                        this.$Message.success('添加成功');
                        this.getList();
                    } else {
                        this.$Message.error('添加失败');
                    }
                })
            },
            getList() {
                this.loading = true;
                getPermissionList(this.pageIndex, this.pageSize).then(res => {
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
            }
        }
    }
</script>

<style lang="less" scoped>
    .policy {
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
</style>