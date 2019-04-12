<template>
    <div class="contain">

        <Breadcrumb class="bread_crumb">
            <Breadcrumb-item href="/components/breadcrumb">客户管理</Breadcrumb-item>
            <Breadcrumb-item>客户列表</Breadcrumb-item>
        </Breadcrumb>

        <div class="action_column">
            <div class="search_area">
                <Form ref="searchFilter" :model="searchFilter" inline class="filters">
                    <FormItem prop="name">
                        <Input type="text" v-model="searchFilter.name" placeholder="姓名"></Input>
                    </FormItem>
                    <FormItem prop="mobile">
                        <Input type="text" v-model="searchFilter.mobile" placeholder="电话"></Input>
                    </FormItem>
                    <FormItem prop="age">
                        <Input type="text" v-model="searchFilter.age" placeholder="年龄"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('searchFilter')">搜索</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="action_area">
                <Button type="primary" @click="showAddModal(`customerForm`)">添加</Button>
            </div>
        </div>

        <Table border :columns="columns" :data="list" class="base_table" :loading="loading">
            <template slot-scope="{ row, index }" slot="gender">
                {{row.gender=='M'?'男':'女'}}
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <div class="action_box">
                    <Button type="primary" @click="showEditForm(row)">修改</Button>
                    <Button type="info" @click="showReserveModal">交定金</Button>
                    <Button type="success" @click="showPrepayModal">按揭进度</Button>
                </div>
            </template>
        </Table>

        <Page :total="20" show-elevator @on-change="pageChange" class="button_page"/>


        <Modal v-model="addModal" title="添加客户" width="600">
            <div class="modal_inner">
                <Form ref="customerForm" :model="customerForm" label-position="left" :label-width="60">
                    <FormItem label="姓名">
                        <Input v-model="customerForm.username"></Input>
                    </FormItem>
                    <FormItem label="电话">
                        <Input v-model="customerForm.mobile"></Input>
                    </FormItem>
                    <FormItem label="年龄段">
                        <Select v-model="customerForm.ageRange">
                            <Option v-for="item in ageArea" :value="item" :key="item">{{item}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="性别">
                        <Select v-model="customerForm.gender">
                            <Option value="M">男</Option>
                            <Option value="F">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="身份证号">
                        <Input v-model="customerForm.id_no"></Input>
                    </FormItem>
                    <FormItem label="意向房型">
                        <Select v-model="customerForm.intention_house_type" multiple>
                            <Option v-for="item in houselist" :value="item.objectId" :key="item.objectId">
                                {{item.name}}
                            </Option>
                        </Select>
                    </FormItem>

                    <FormItem label="区域">
                        <Input v-model="customerForm.region"></Input>
                    </FormItem>
                    <FormItem label="渠道">
                        <Select v-model="customerForm.source">
                            <Option value="朋友推荐">朋友推荐</Option>
                            <Option value="互联网搜索">互联网搜索</Option>
                            <Option value="线下传单">线下传单</Option>
                            <Option value="朋友推荐">朋友推荐</Option>
                            <Option value="线下广告">线下广告</Option>
                            <Option value="其他">其他</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="addModal=false">取消</Button>
                <Button type="primary" @click="addSubmit('customerForm')">确定</Button>
            </div>
        </Modal>

        <!-- 编辑用户-->
        <Modal v-model="editModal" title="修改客户" width="600">
            <div class="modal_inner">
                <Form ref="editForm" :model="editForm" label-position="left" :label-width="60">
                    <FormItem label="姓名">
                        <Input v-model="editForm.name"></Input>
                    </FormItem>
                    <FormItem label="电话">
                        <Input v-model="editForm.mobile"></Input>
                    </FormItem>
                    <FormItem label="年龄段">
                        <Select v-model="editForm.ageRange">
                            <Option v-for="item in ageArea" :value="item" :key="item">{{item}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="性别">
                        <Select v-model="editForm.gender">
                            <Option value="M">男</Option>
                            <Option value="F">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="身份证号">
                        <Input v-model="editForm.idNo"></Input>
                    </FormItem>
                    <FormItem label="意向房型">
                        <Select v-model="editForm.intentionHouseType" multiple>
                            <Option v-for="item in houselist" :value="item.objectId" :key="item.objectId">
                                {{item.name}}
                            </Option>
                        </Select>
                    </FormItem>

                    <FormItem label="区域">
                        <Input v-model="editForm.region"></Input>
                    </FormItem>
                    <FormItem label="渠道">
                        <Select v-model="editForm.source">
                            <Option value="朋友推荐">朋友推荐</Option>
                            <Option value="互联网搜索">互联网搜索</Option>
                            <Option value="线下传单">线下传单</Option>
                            <Option value="朋友推荐">朋友推荐</Option>
                            <Option value="线下广告">线下广告</Option>
                            <Option value="其他">其他</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="addModal=false">取消</Button>
                <Button type="primary" @click="addSubmit('customerForm')">确定</Button>
            </div>
        </Modal>

        <!--交定金-->

        <Modal v-model="reserveModal" title="修改客户" width="800">
            <div class="modal_inner">
                <Form ref="reserveForm" :model="reserveForm" label-position="left" :label-width="60">
                    <div style="margin-bottom: 20px"><span>姓名：<i>{{}}</i></span><span>电话：{{}}</span></div>
                    <FormItem label="证件上传" prop="file">
                        <div class="upload_card">
                            <div class="card">
                                <label for="post" class="poster">
                                    <div class="preview">
                                        <img :src="previewSrc">
                                    </div>
                                    <span class="upload_icon">身份证正面</span>
                                    <input type="file" value="上传" id="post" @change="preview" ref="poster">
                                </label>
                            </div>
                            <div class="card">
                                <label for="post1" class="poster">
                                    <div class="preview">
                                        <img :src="previewSrc">
                                    </div>
                                    <span class="upload_icon">身份证反面</span>
                                    <input type="file" value="上传" id="post1" @change="preview" ref="poster">
                                </label>
                            </div>
                        </div>
                    </FormItem>

                    <FormItem label="房产">
                        <Cascader :data="data" v-model="value2"></Cascader>
                    </FormItem>

                    <FormItem label="经办人">
                        <Select v-model="editForm.source">
                            <Option value="朋友推荐">朋友推荐</Option>
                            <Option value="互联网搜索">互联网搜索</Option>
                            <Option value="线下传单">线下传单</Option>
                            <Option value="朋友推荐">朋友推荐</Option>
                            <Option value="线下广告">线下广告</Option>
                            <Option value="其他">其他</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="定金金额">
                        <Input v-model="editForm.region"></Input>
                    </FormItem>

                    <FormItem label="备注">
                        <Input v-model="editForm.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="Enter something..."></Input>
                    </FormItem>

                </Form>
            </div>
            <div slot="footer">
                <Button @click="addModal=false">取消</Button>
                <Button type="primary" @click="addSubmit('customerForm')">确定</Button>
            </div>
        </Modal>


        <Modal v-model="prepayModal" title="修改客户" width="800">
            <div class="modal_inner">
                <Form ref="prepayModal" :model="prepayModal" label-position="left" :label-width="60">
                    <Steps :current="0" style="margin-bottom: 20px">
                        <Step title="交首付" content=""></Step>
                        <Step title="签订购房合同" content=""></Step>
                        <Step title="办理按揭手续" content=""></Step>
                        <Step title="银行放款" content=""></Step>
                    </Steps>

                    <div class="info_row">
                        <div class="row"><span>姓名：</span><i>防守对</i></div>
                        <div class="row"><span>电话：</span><i>法撒旦</i></div>
                    </div>
                    <div class="info_row">
                        <div class="row"><span>订单号：</span><i>1212121212</i></div>
                        <div class="row"><span>定金金额：</span><i>222222元</i></div>
                    </div>
                    <FormItem label="经办人">
                        <Select v-model="editForm.source">
                            <Option value="朋友推荐">朋友推荐</Option>
                            <Option value="互联网搜索">互联网搜索</Option>
                            <Option value="线下传单">线下传单</Option>
                            <Option value="朋友推荐">朋友推荐</Option>
                            <Option value="线下广告">线下广告</Option>
                            <Option value="其他">其他</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="首付金额">
                        <Input v-model="editForm.region"></Input>
                    </FormItem>

                    <FormItem label="备注">
                        <Input v-model="editForm.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="Enter something..."></Input>
                    </FormItem>

                </Form>
            </div>
            <div slot="footer">
                <Button @click="addModal=false">取消</Button>
                <Button type="primary" @click="addSubmit('customerForm')">确定</Button>
            </div>
        </Modal>


    </div>
</template>

<script>
    import {columns, ageArea} from './config'
    import {customerList, addCustomer, houseList} from '../../service/api'

    export default {
        name: "List",
        data() {
            return {
                fruit: [''],
                list: [],
                columns: columns,
                loading: false,
                searchFilter: {},
                pageTotal: 10,
                addModal: false,
                customerForm: {
                    gender: "M"
                },
                editForm: {},
                reserveForm: {},
                prepayModal: false,
                ageArea: ageArea,
                houselist: [],
                editModal: false,
                reserveModal: false,
                previewSrc: '',
                value2: ['jiangsu', 'suzhou', 'zhuozhengyuan'],
                data: [{
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
                }]
            }
        },
        mounted() {
            this.getList();
            houseList().then(res => {
                if (res.data.code == 200) {
                    this.houselist = res.data.data;
                }
            })
        },
        methods: {
            getList() {
                this.loading = true;
                customerList().then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data;
                        this.loading = false;
                    }
                })
            },
            showAddModal(name) {
                this.addModal = true;
                this.$refs[name].resetFields();
            },
            pageChange() {

            },
            addSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            showEditForm(data) {
                this.editForm = data;
                this.editModal = true;
            },
            showReserveModal() {
                this.reserveModal = true;
            },
            showPrepayModal() {
                this.prepayModal = true
            },
            preview() {

            }
        }
    }
</script>

<style lang="less" scoped>
    .action_column {
        display: flex;
        justify-content: space-between;

        .action_row {
            button {
                margin-right: 20px;
            }
        }
    }

    .upload_card {
        display: flex;

        .card {
            flex: 1;
        }
    }

    .info_row {
        margin-bottom: 20px;
        display: flex;

        .row {
            margin-right: 20px;

            span {
                display: inline-block;
                width: 60px;
            }

            &:last-child span {
                width: auto;
            }
        }

        i {
            font-style: normal;
        }
    }

    .poster {
        display: block;
        border: 1px solid #dcdee2;
        width: 200px;
        height: 200px;
        position: relative;
        overflow: hidden;

        input {
            position: absolute;
            display: block;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            visibility: hidden;
        }

        .upload_icon {
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -25px;
            margin-top: -25px;
            color: #dcdee2;
        }

        .preview {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2;

            img {
                display: block;
                max-width: 100%;
                max-height: 100%;
            }
        }
    }
</style>