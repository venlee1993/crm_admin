<template>
    <div class="activty">
        <Breadcrumb class="bread_crumb">
            <Breadcrumb-item href="/components/breadcrumb">系统管理</Breadcrumb-item>
            <Breadcrumb-item>权限设置</Breadcrumb-item>
        </Breadcrumb>

        <Table border :columns="columns" :data="list" class="base_table" :loading="loading">
            <template slot-scope="{ row, index }" slot="poster">
                <img :src="row.image" style="max-width: 200px">
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="error" size="small" @click="deleteRow(row)">删除</Button>
            </template>
        </Table>

    </div>
</template>

<script>
    import {getActivtyList, deleteStrategy} from '../../service/api'
    import {activty} from './config'

    export default {
        name: "Activty",
        data() {
            return {
                columns: activty,
                list: [],
                loading: false
            }
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                this.loading = true
                getActivtyList().then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data;
                        this.loading = false;
                    }
                })
            },
            deleteRow(row) {
                deleteStrategy(row.objectId).then(res => {
                    if (res.data.code == 200) {
                        this.$Message.success('删除成功')
                        this.getList();
                    } else {
                        this.$Message.error('删除失败')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .activty {
        padding: 0 20px;
    }

    .bread_crumb {
        margin-top: 20px;
        text-align: left;
    }
</style>