<template>
    <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-analytics"/>
                房产管理
            </template>
            <MenuItem name="1-1">房产列表</MenuItem>
            <MenuItem name="1-2">房产锁定</MenuItem>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-analytics"/>
                <span>系统管理</span>
            </template>
            <MenuItem name="2-1" to="/system/user">用户管理</MenuItem>
            <MenuItem name="2-2" to="/system/role">角色管理</MenuItem>
            <MenuItem name="2-2" to="/system/auth">权限管理</MenuItem>
        </Submenu>
    </Menu>
</template>

<script>
    export default {
        name: "AdminMenu",
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