<template>
    <div class="contain">

        <Breadcrumb class="bread_crumb">
            <Breadcrumb-item href="/components/breadcrumb">客户管理</Breadcrumb-item>
            <Breadcrumb-item>跟踪记录</Breadcrumb-item>
        </Breadcrumb>

        <div class="action_column">
            <div class="search_area">
                <Form ref="searchRules" :model="searchRules" inline class="filters">
                    <FormItem prop="customerName">
                        <Input type="text" v-model="searchRules.customerName" placeholder="客户姓名"></Input>
                    </FormItem>
                    <FormItem prop="salesName">
                        <Select v-model="searchRules.salesName" style="width: 160px" placeholder="请选择回访人员">
                            <Option value="">全部</Option>
                            <Option v-for="item in sales" :value="item.realName" :key="item.value">{{ item.realName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="goSearch('searchRules')">搜索</Button>
                    </FormItem>
                </Form>
            </div>
        </div>

        <Table border :columns="columns" :data="list" class="base_table" :loading="loading">
            <template slot-scope="{ row, index }" slot="action">
                <div class="action_box">
                    <Button type="primary" @click="showEditForm(row)">修改</Button>
                    <Button type="info" @click="showReserveModal">交定金</Button>
                    <Button type="success" @click="showPrepayModal">按揭进度</Button>
                </div>
            </template>
        </Table>


        <Page :total="pageTotal" :page-size="pageSize"/>

    </div>
</template>

<script>
    import {tableHeader} from './track.config'
    import {customerTrack, getUserByRole} from '../../service/api'

    export default {
        name: "Track",
        data() {
            return {
                list: [],
                loading: false,
                searchRules: {},
                columns: tableHeader,
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                sales: []
            }
        },
        created() {
            getUserByRole().then(res => {
                if (res.data.code == 200) {
                    this.sales = res.data.data;
                }
            })
        },
        mounted() {
            this.getList({}, this.pageIndex, this.pageSize);
        },

        methods: {
            getList(rules, index, size) {
                this.loading = true;
                customerTrack(rules, index, size).then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data;
                        this.totalPage = res.data.page.total;
                        this.loading = false;
                    }
                })
            },
            goSearch() {
                this.pageIndex = 1;
                this.getList(this.searchRules, this.pageIndex, this.pageSize)
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