<template>
    <div class="layout">
        <Layout class="full_height">
            <Header :style="{padding: 0}" class="layout-header-bar">
                <div class="header_inner">
                    <div class="layout-logo-left">
                        <img src="../assets/images/logo.png" alt style="width: 68%">
                    </div>
                    <div>
                        <Icon
                            @click.native="collapsedSider"
                            :class="rotateIcon"
                            :style="{margin: '0 20px'}"
                            type="md-menu"
                            size="24"
                        ></Icon>
                    </div>
                </div>
            </Header>
            <Layout>
                <Sider hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                    <AdminMenu :slide="isCollapsed"></AdminMenu>
                </Sider>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    <router-view/>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>


<script>
    import AdminMenu from "../components/layout/AdminMenu";

    export default {
        name: "Login",
        data() {
            return {
                isCollapsed: false
            };
        },
        components: {
            AdminMenu
        },
        computed: {
            rotateIcon() {
                return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
            },
            menuitemClasses() {
                return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
            }
        },
        methods: {
            collapsedSider() {
                this.isCollapsed = !this.isCollapsed;
            }
        }
    };
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
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    }

    .layout-logo-left {
        width: 200px;
        align-self: center;
    }
    .layout-logo-left img{
        margin: 0 auto;
        display: block;
    }
    .header_inner {
        display: flex;
    }
    .menu-icon {
        transition: all 0.3s;
    }

    .rotate-icon {
        transform: rotate(-90deg);
    }
</style>