<template>
    <Layout class="content">
        <div class="login_form">
            <div class="logo"><img src="../../assets/images/logo.png" alt=""></div>
            <Form :model="loginData" :rules="rules" ref="login">
                <FormItem prop="username">
                    <Input v-model="loginData.username" prefix="md-person" placeholder="Enter number"/>
                </FormItem>
                <FormItem prop="password">
                    <Input v-model="loginData.password" prefix="ios-lock-outline" placeholder="Enter number"/>
                </FormItem>
                <Button type="error" long @click="handleSubmit('login')">SUBMIT</Button>
            </Form>
        </div>
    </Layout>
</template>

<script>
    import {login} from "../../service/api";

    export default {
        name: "Login",
        data() {
            return {
                loginData: {
                    username: 'admin',
                    password: '123456'
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {
                            type: 'string',
                            min: 6,
                            message: '密码不能小于6个字符',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        computed: {},
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        login(this.loginData).then(res => {
                            if (res.data.code == 200) {
                                this.$Message.error('success!');
                            }
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .content {
        height: 100vh;
        background: rgb(56, 11, 6);
        align-items: center;
        flex-direction: row;

        .logo {
            margin-bottom: 20px;

            img {
                width: 100%;
            }
        }

        .login_form {
            width: 300px;
            margin: 0 auto;
        }
    }
</style>