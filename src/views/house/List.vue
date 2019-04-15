<template>
    <div class="contain">
        <Breadcrumb class="bread_crumb">
            <Breadcrumb-item href="/components/breadcrumb">房产管理</Breadcrumb-item>
            <Breadcrumb-item>列表</Breadcrumb-item>
        </Breadcrumb>

        <div class="action_column">
            <div class="search_area">
                <Form ref="searchRules" :model="searchRules" inline class="filters">
                    <FormItem prop="name">
                        <Input type="text" v-model="searchRules.name" placeholder="姓名"></Input>
                    </FormItem>
                    <FormItem prop="mobile">
                        <Input type="text" v-model="searchRules.mobile" placeholder="电话"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="goSearch('searchRules')">搜索</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="action_area">
                <Button type="primary" @click="addModal=true">添加</Button>
            </div>
        </div>


        <Table border :columns="columns" :data="list" class="base_table" :loading="loading">
            <template slot-scope="{ row, index }" slot="action">
                <div class="action_box">
                    <Button type="primary" @click="">修改</Button>
                </div>
            </template>
        </Table>

        <Page :total="20" show-elevator @on-change="pageChange" class="button_page"/>


    </div>
</template>

<script>
    import tableHeader from './house.config'
    import {getHouseList} from '../../service/api'

    export default {
        name: "List",
        data() {
            return {
                list: [],
                columns: tableHeader,
                addModal: false,
                loading: false,
                pageIndex: 1,
                pageSize: 10,
                searchRules: {}
            }
        },
        mounted() {
            this.getList({}, this.pageIndex, this.pageSize);
        },
        methods: {
            goSearch() {

            },
            getList(rules, index, size) {
                this.loading = true;
                getHouseList(rules, index, size).then(res => {
                    console.log(res);
                })
            }
        }
    }
</script>

<style scoped>

</style>