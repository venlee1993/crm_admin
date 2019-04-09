<template>
    <div class="activty">
        <Breadcrumb class="bread_crumb">
            <Breadcrumb-item href="/components/breadcrumb">系统管理</Breadcrumb-item>
            <Breadcrumb-item>权限设置</Breadcrumb-item>
        </Breadcrumb>

        <Table border :columns="columns" :data="list" class="base_table" :loading="loading">
            <template slot-scope="{ row, index }" slot="action">
                <Button type="info" size="small" style="margin-right: 5px" @click="detail(row)">详情</Button>
            </template>
        </Table>

    </div>
</template>

<script>
    import {getActivtyList} from '../../service/api'

    export default {
        name: "Activty",
        created() {
            this.getList();
        },
        methods: {
            getList() {
                getActivtyList().then(res => {
                    console.log(res);
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