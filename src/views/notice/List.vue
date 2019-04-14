<template>
    <div class="contain">
        <Breadcrumb class="bread_crumb">
            <Breadcrumb-item href="/components/breadcrumb">消息管理</Breadcrumb-item>
            <Breadcrumb-item>消息列表</Breadcrumb-item>
        </Breadcrumb>


        <div class="action_column">
            <div class="search_area">
                <Form ref="searchRules" :model="searchRules" inline class="filters">
                    <FormItem prop="salesName">
                        <Select v-model="searchRules.status" style="width: 160px" placeholder="消息状态">
                            <Option value="">全部</Option>
                            <Option value="UNREAD">未读</Option>
                            <Option value="READED">已读</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="goSearch('searchRules')">搜索</Button>
                    </FormItem>
                </Form>
            </div>
        </div>

        <Table border :columns="columns" :data="list" class="base_table" :loading="loading">
            <template slot-scope="{ row, index }" slot="status">
                {{row.status=='UNREAD'?'未读':'已读'}}
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="error" @click="deleteRow(row)">删除</Button>
            </template>
        </Table>

        <Page :total="pageTotal" :page-size="pageSize" @on-change="pageChange"/>

    </div>
</template>

<script>
    import {tableHeader} from './notice.config'
    import {noticeList, noticeDelete} from "../../service/api";

    export default {
        name: "List",
        data() {
            return {
                list: [],
                columns: tableHeader,
                searchRules: {},
                pageTotal: 1,
                loading: false,
                pageIndex: 1,
                pageSize: 10,

            }
        },
        mounted() {
            this.getList({status: '', pageIndex: this.pageIndex, pageSize: this.pageSize})
        },
        methods: {

            getList(rules, index, size) {
                this.loading = true;
                noticeList(rules, index, size).then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data;
                        this.pageTotal = Number(res.data.page.total)+20;
                        this.loading = false;
                    }
                })
            },
            pageChange(index) {
                this.pageIndex = index;
                this.getList({status: '', pageIndex: this.pageIndex, pageSize: this.pageSize})
            },
            deleteRow(row) {
                noticeDelete({objectId: row.objectId}).then(res => {
                    if (res.data.code == 200) {
                        this.pageIndex = 1;
                        this.getList({status: '', pageIndex: this.pageIndex, pageSize: this.pageSize})
                        this.$Message.success('删除成功')
                    } else {
                        this.$Message.error('删除失败');
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>