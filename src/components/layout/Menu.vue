<template>
    <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
        <MenuItem name="1-1">
            <Icon type="ios-navigate"></Icon>
            <span>房产管理</span>
        </MenuItem>
        <MenuItem name="1-2">
            <Icon type="ios-search"></Icon>
            <span>楼盘管理</span>
        </MenuItem>
        <MenuItem name="1-3">
            <Icon type="ios-settings"></Icon>
            <span>客户管理</span>
        </MenuItem>
        <MenuItem name="1-4">
            <Icon type="ios-settings"></Icon>
            <span>策略管理</span>
        </MenuItem>
        <MenuItem name="1-5">
            <Icon type="ios-settings"></Icon>
            <span>系统管理</span>
        </MenuItem>
        <MenuItem name="1-6">
            <Icon type="ios-settings"></Icon>
            <span>业绩管理</span>
        </MenuItem>
        <MenuItem name="1-7">
            <Icon type="ios-settings"></Icon>
            <span>统计管理</span>
        </MenuItem>
        <MenuItem name="1-7">
            <Icon type="ios-settings"></Icon>
            <span>订单管理</span>
        </MenuItem>
        <MenuItem name="1-8">
            <Icon type="ios-settings"></Icon>
            <span>个人中心</span>
        </MenuItem>
    </Menu>
</template>

<script>
    export default {
        name: "Menu",
        data() {
            return {
                isCollapsed: false
            }
        },
        computed: {
            menuitemClasses() {
                return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
            }
        }
    }
</script>

<style scoped>

</style>