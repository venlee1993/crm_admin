<template>
    <div class="layout">
        <Layout class="full_height">
            <Header :style="{padding: 0}" class="layout-header-bar">
                <div class="layout-logo-left">
                    <img src="../assets/images/logo.png" alt="" style="width: 100%">
                </div>

            </Header>
            <Layout>
                <Sider ref="side" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                    <AdminMenu></AdminMenu>
                </Sider>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    <router-view/>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>


<script>

    import AdminMenu from '../components/layout/AdminMenu'

    export default {
        name: "Login",
        data() {
            return {
                isCollapsed: false
            }
        },
        components: {
            AdminMenu
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
                this.$refs.side.toggleCollapse();
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

    .full_height {
        min-height: 100vh;
    }

    .layout-header-bar {
        background: rgb(152, 131, 117);
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .layout-logo-left {
        width: 200px;
        height: 30px;
        border-radius: 3px;
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