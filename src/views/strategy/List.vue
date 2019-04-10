<template>
    <div class="list">
        <Breadcrumb class="bread_crumb">
            <Breadcrumb-item href="/components/breadcrumb">策略管理</Breadcrumb-item>
            <Breadcrumb-item>列表</Breadcrumb-item>
        </Breadcrumb>

        <div class="action_column">
            <Button type="primary" @click="showAddModal">添加</Button>
        </div>

        <Table border :columns="columns" :data="list" class="base_table" :loading="loading">
            <template slot-scope="{ row, index }" slot="action">
                <div class="action_box">
                    <Button type="primary">更新</Button>
                    <Button type="warning">删除</Button>
                </div>
            </template>
        </Table>


        <Modal title="添加策略" v-model="addModal" :mask-closable="false" width="600">
            <div class="form_inner">
                <Form :model="addForm" label-position="left" :label-width="60" ref="addForm" :rules="addRules">
                    <FormItem label="名称" prop="name">
                        <Input v-model="addForm.name"></Input>
                    </FormItem>
                    <FormItem label="类型" prop="type">
                        <Select v-model="addForm.type">
                            <Option value="MORTGATE">按揭进度提醒</Option>
                            <Option value="REMIND">回访提醒</Option>
                            <Option value="TRANSFER">抢单</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="周期" prop="timespan">
                        <Input v-model="addForm.timespan"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="default">取消</Button>
                <Button type="primary" @click="handleSubmit('addForm')">确定</Button>
            </div>
        </Modal>


    </div>
</template>

<script>
    import {strategyList, addStrategy} from '../../service/api'
    import columns from './config'
    import addrules from './validate.add'

    export default {
        name: "List",
        data() {
            return {
                list: [],
                loading: true,
                columns: columns,
                addModal: false,
                addForm: {name: '', type: '', timespan: ''},
                addRules: addrules
            }
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                strategyList().then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data;
                        this.loading = false;
                    }
                })
            },
            showAddModal() {
                this.addModal = true
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.addModal = false;
                        this.$refs[name].resetFields();
                        addStrategy(this.addForm).then(res => {
                            if (res.data.code == 200) {
                                this.$Message.success('添加成功')
                                this.loading = true;
                                this.getList();
                            } else {
                                this.$Message.error('添加失败')
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

    .list {
        padding: 0 20px;
    }

    .bread_crumb {
        margin-top: 20px;
        text-align: left;
        margin-bottom: 20px;
    }

    .action_column {
        text-align: left;
        margin-bottom: 20px;
    }
</style>