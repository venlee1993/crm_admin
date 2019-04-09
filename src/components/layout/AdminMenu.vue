<template>
    <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses" accordion>
        <MenuItem name="0">
            <Icon type="ios-paper"/>
            <span>首页</span>
        </MenuItem>
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-home"/>
                <span>房产管理</span>
            </template>
            <MenuItem name="1-1">房产列表</MenuItem>
            <MenuItem name="1-2">房产锁定</MenuItem>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-cog"/>
                <span>系统管理</span>
            </template>
            <MenuItem name="2-1" to="/system/user">用户管理</MenuItem>
            <MenuItem name="2-2" to="/system/role">角色管理</MenuItem>
            <MenuItem name="2-3" to="/system/policy">权限管理</MenuItem>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <Icon type="logo-buffer"/>
                <span>楼盘管理</span>
            </template>
            <MenuItem name="3-1" to="/state/list">楼盘列表</MenuItem>
            <MenuItem name="3-2" to="/state/activty">运营活动</MenuItem>
        </Submenu>
        <Submenu name="4">
            <template slot="title">
                <Icon type="ios-people"/>
                <span>客户管理</span>
            </template>
        </Submenu>
        <Submenu name="5">
            <template slot="title">
                <Icon type="ios-timer"/>
                <span>策略管理</span>
            </template>
        </Submenu>
        <Submenu name="6">
            <template slot="title">
                <Icon type="md-barcode"/>
                <span>销售管理</span>
            </template>
        </Submenu>
        <Submenu name="7">
            <template slot="title">
                <Icon type="md-trending-up"/>
                <span>业绩管理</span>
            </template>
        </Submenu>
        <Submenu name="8">
            <template slot="title">
                <Icon type="md-pie"/>
                <span>统计分析</span>
            </template>
        </Submenu>
        <Submenu name="9">
            <template slot="title">
                <Icon type="ios-clipboard"/>
                <span>订单管理</span>
            </template>
        </Submenu>
        <Submenu name="9">
            <template slot="title">
                <Icon type="md-person"/>
                <span>个人中心</span>
            </template>
        </Submenu>
    </Menu>
</template>

<script>
    export default {
        name: "AdminMenu",
        props: ['slide'],
        data() {
            return {}
        },
        computed: {
            menuitemClasses() {
                return ['menu-item', this.slide ? 'collapsed-menu' : '']
            }
        }
    }
</script>

<style scoped>

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width 0.2s ease 0.2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size 0.2s ease, transform 0.2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width 0.2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
        vertical-align: middle;
        font-size: 22px;
    }

    .collapsed-menu .ivu-menu-submenu-title-icon {
        display: none;
    }
</style>