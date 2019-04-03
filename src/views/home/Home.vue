<template>
    <div class="layout">
        <Layout class="h100">
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <div class="layout-logo-left">
                    fdsfdfdfds
                </div>
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
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu"
                          size="24"></Icon>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                isCollapsed: false
            }
        },
        computed: {
            rotateIcon() {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses() {
                return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
            }
        },
        methods: {
            collapsedSider() {
                this.$refs.side1.toggleCollapse();
            }
        }
    }
</script>

<style scoped>
    .layout {
        background: #f5f7f9;
        position: relative;
        overflow: hidden;
    }

    .h100 {
        min-height: 100vh;
    }

    .layout-header-bar {
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .layout-logo-left {
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }

    .menu-icon {
        transition: all .3s;
    }

    .rotate-icon {
        transform: rotate(-90deg);
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>