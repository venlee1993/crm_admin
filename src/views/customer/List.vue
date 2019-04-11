<template>
    <div class="contain">

        <Breadcrumb class="bread_crumb">
            <Breadcrumb-item href="/components/breadcrumb">客户管理</Breadcrumb-item>
            <Breadcrumb-item>客户列表</Breadcrumb-item>
        </Breadcrumb>

        <div class="action_column">
            <div class="search_area">
                <Form ref="searchFilter" :model="searchFilter" inline class="filters">
                    <FormItem prop="name">
                        <Input type="text" v-model="searchFilter.name" placeholder="姓名"></Input>
                    </FormItem>
                    <FormItem prop="mobile">
                        <Input type="text" v-model="searchFilter.mobile" placeholder="电话"></Input>
                    </FormItem>
                    <FormItem prop="age">
                        <Input type="text" v-model="searchFilter.age" placeholder="年龄"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('searchFilter')">搜索</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="action_area">
                <Button type="primary" @click="showAddModal(`customerForm`)">添加</Button>
            </div>
        </div>

        <Table border :columns="columns" :data="list" class="base_table" :loading="loading">
            <template slot-scope="{ row, index }" slot="gender">
                {{row.gender=='M'?'男':'女'}}
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <div class="action_box">
                    <Button type="warning">操作</Button>
                </div>
            </template>
        </Table>

        <Page :total="20" show-elevator @on-change="pageChange" class="button_page"/>


        <Modal v-model="addModal" title="添加客户" width="600">
            <div class="modal_inner">
                <Form ref="customerForm" :model="customerForm" label-position="left" :label-width="60">
                    <FormItem label="姓名">
                        <Input v-model="customerForm.input1"></Input>
                    </FormItem>
                    <FormItem label="年龄">
                        <Select v-model="customerForm.model1">
                            <Option v-for="item in ageArea" :value="item" :key="item">{{item}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="性别">
                        <Input v-model="customerForm.input3"></Input>
                    </FormItem>
                    <FormItem label="身份证号">
                        <Input v-model="customerForm.input3"></Input>
                    </FormItem>
                    <FormItem label="意向房型">
                        <Select v-model="customerForm.model2">
                            <Option v-for="item in ageArea" :value="item" :key="item">{{item}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="电话">
                        <Input v-model="customerForm.input3"></Input>
                    </FormItem>
                    <FormItem label="地区">
                        <Input v-model="customerForm.input3"></Input>
                    </FormItem>
                    <FormItem label="来源">
                        <Select v-model="customerForm.model4">
                            <Option v-for="item in ageArea" :value="item" :key="item">{{item}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="状态">
                        <Select v-model="customerForm.model8">
                            <Option v-for="item in ageArea" :value="item" :key="item">{{item}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="注册方式">
                        <Input v-model="customerForm.input3"></Input>
                    </FormItem>
                </Form>
            </div>

            <div slot="footer">
                <Button @click="addModal=false">取消</Button>
                <Button type="primary" @click="addSubmit('customerForm')">确定</Button>
            </div>
        </Modal>


    </div>
</template>

<script>
    import {columns, ageArea} from './config'
    import {customerList, addCustomer} from '../../service/api'

    export default {
        name: "List",
        data() {
            return {
                list: [],
                columns: columns,
                loading: false,
                searchFilter: {},
                pageTotal: 10,
                addModal: false,
                customerForm: {},
                ageArea: ageArea
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                this.loading = true;
                customerList().then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data;
                        this.loading = false;
                    }
                })
            },
            showAddModal(name) {
                this.addModal = true;
                this.$refs[name].resetFields();
            },
            pageChange() {

            },
            addSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .action_column {
        display: flex;
        justify-content: space-between;

        .action_row {
            button {
                margin-right: 20px;
            }
        }
    }
</style>