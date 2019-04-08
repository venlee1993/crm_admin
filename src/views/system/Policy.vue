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
                <i-button type="primary" @click="showAddForm">添加权限</i-button>
            </div>
        </div>


        <Table border :columns="columns" :data="list" class="base_table" :loading="loading">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="info" size="small" style="margin-right: 5px" @click="detail(row)">详情</Button>
            </template>
        </Table>


        <Modal v-model="addModal" width="400" @on-ok="handleSubmit('editUserForm')">
            <div slot="header">
                <span>添加权限</span>
            </div>
            <div class="add_form">
                <Form ref="addForm" :model="addForm" :label-width="60">
                    <FormItem label="名称" prop="name">
                        <Input type="text" v-model="addForm.realName"></Input>
                    </FormItem>
                    <FormItem label="权限" prop="permission">
                        <Input type="text" v-model="addForm.gender"></Input>
                    </FormItem>
                    <FormItem label="类型" prop="resourceType">
                        <Input type="text" v-model="addForm.mobile"></Input>
                    </FormItem>
                    <FormItem label="父节点">
                        <Select v-model="permission">
                            <Option v-for="item in pid" :value="item.objectId" :key="item.name">{{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
        </Modal>


    </div>
</template>

<script>
    import {getPermissionList} from '../../service/api'

    export default {
        name: "Policy",
        data() {
            return {
                searchForm: {},
                addModal: false,
                loading: true,
                columns: [
                    {
                        title: "ID",
                        key: "objectId"
                    },
                    {
                        title: "PID",
                        key: "parentId"
                    },
                    {
                        title: "名称",
                        key: "name"
                    },
                    {
                        title: "权限",
                        key: "permission"
                    },
                    {
                        title: "控制类型",
                        key: "resourceType"
                    },
                    {
                        title: "操作",
                        slot: "action",
                        align: "center"
                    }
                ],
                addForm: {},
                list: [],
                permission: ''
            }
        },
        mounted() {
            getPermissionList().then(res => {
                if (res.data.code == 200) {
                    this.list = res.data.data;
                    this.loading = false;
                }
            })
        },
        computed: {
            pid() {
                return this.list.filter(item => item.resourceType == 'MENU');
            }
        },
        methods: {
            showAddForm() {
                this.addModal = true;
            },
            detail() {
                console.log(this.pid);
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