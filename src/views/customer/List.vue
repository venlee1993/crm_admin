<template>
    <div class="contain">

        <Breadcrumb class="bread_crumb">
            <Breadcrumb-item href="/components/breadcrumb">客户管理</Breadcrumb-item>
            <Breadcrumb-item>客户列表</Breadcrumb-item>
        </Breadcrumb>

        <div class="action_column">
            <div class="search_area">
                <Form ref="searchFilter" :model="searchFeilds" inline class="filters">
                    <FormItem prop="name">
                        <Input type="text" v-model="searchFeilds.name" placeholder="姓名"></Input>
                    </FormItem>
                    <FormItem prop="mobile">
                        <Input type="text" v-model="searchFeilds.mobile" placeholder="电话"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="goSearch('searchFeilds')">搜索</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="action_area">
                <Button type="primary" @click="addModal=true">添加</Button>
            </div>
        </div>

        <Table border :columns="columns" :data="list" class="base_table" :loading="loading">
            <template slot-scope="{ row, index }" slot="gender">
                {{row.gender=='M'?'男':'女'}}
            </template>

            <template slot-scope="{ row, index }" slot="status">
                {{status[row.status]}}
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <div class="action_box">
                    <Button type="primary" @click="showEditForm(row)" :disabled="['KNOCKED'].indexOf(row.status)!=-1">
                        修改
                    </Button>
                    <Button type="info" @click="showReserveModal(row)">交定金</Button>
                    <Button type="success" @click="showPrepayModal(row)"
                            :disabled="['NEW','CATCHABLE'].indexOf(row.status)!=-1">按揭进度
                    </Button>
                </div>
            </template>
        </Table>

        <Page :total="20" show-elevator @on-change="pageChange" class="button_page"/>


        <!--添加用户start-->
        <Modal v-model="addModal" title="添加客户" width="600">
            <div class="modal_inner">
                <Form ref="addForm" :model="addForm" label-position="left" :label-width="60">
                    <FormItem label="姓名">
                        <Input v-model="addForm.name"></Input>
                    </FormItem>
                    <FormItem label="电话">
                        <Input v-model="addForm.mobile"></Input>
                    </FormItem>
                    <FormItem label="年龄段">
                        <Select v-model="addForm.ageRange">
                            <Option v-for="item in ageArea" :value="item" :key="item">{{item}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="性别">
                        <Select v-model="addForm.gender">
                            <Option value="M">男</Option>
                            <Option value="F">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="身份证号">
                        <Input v-model="addForm.idNo"></Input>
                    </FormItem>

                    <FormItem label="意向房型">
                        <Select v-model="addForm.intentionHouseType" multiple>
                            <Option v-for="item in houselist" :value="item.name" :key="item.objectId">
                                {{item.name}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="区域">
                        <Input v-model="addForm.region"></Input>
                    </FormItem>
                    <FormItem label="渠道">
                        <Select v-model="addForm.source">
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
                <Button type="primary" @click="addSubmit('addForm')">确定</Button>
            </div>
        </Modal>
        <!--添加用户end-->


        <!-- 编辑用户start-->
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
                            <Option v-for="item in houselist" :value="item.name" :key="item.name">
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
                <Button @click="showEditForm(row)">取消</Button>
                <Button type="primary" @click="editSubmit('editForm')">确定</Button>
            </div>
        </Modal>
        <!-- 编辑用户end-->

        <!--交定金start-->
        <Modal v-model="reserveModal" title="交定金" width="800">
            <div class="modal_inner">
                <Form ref="reserveForm" :model="reserveForm" :label-width="60">
                    <div class="info_row">
                        <div class="row">
                            <span>姓名：</span><i>{{reserveCustomer.name}}</i>
                        </div>
                        <div class="row">
                            <span>电话：</span><i>{{reserveCustomer.mobile}}</i>
                        </div>
                    </div>
                    <FormItem label="证件上传" prop="file">
                        <div class="upload_card">
                            <div class="card">
                                <label for="front" class="poster">
                                    <div class="preview">
                                        <img :src="cardFront">
                                    </div>
                                    <span class="upload_icon">身份证正面</span>
                                    <input type="file" id="front" @change="uploadView('front')" ref="cardFront">
                                </label>
                            </div>
                            <div class="card">
                                <label for="back" class="poster">
                                    <div class="preview">
                                        <img :src="cardBack">
                                    </div>
                                    <span class="upload_icon">身份证反面</span>
                                    <input type="file" id="back" @change="uploadView('back')" ref="cardBack">
                                </label>
                            </div>
                        </div>
                    </FormItem>
                    <FormItem label="房产" prop="houseId">
                        <Cascader :data="houseproperty" v-model="reserveForm.houseId" filterable></Cascader>
                    </FormItem>

                    <FormItem label="经办人" prop="userId">
                        <Select v-model="reserveForm.userId">
                            <Option v-for="item in userlist" :value="item.objectId" :key="item.objectId">
                                {{item.username}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="定金金额" prop="amount">
                        <Input v-model="reserveForm.amount"></Input>
                    </FormItem>
                    <FormItem label="备注" prop="remark">
                        <Input v-model="reserveForm.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="..."></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="reserveModal=false">取消</Button>
                <Button type="primary" @click="reserveSubmit('reserveForm')" :loading="reserveLoading">确定</Button>
            </div>
        </Modal>
        <!-- 交定金end-->


        <Modal v-model="prepayModal" title="按揭进度" width="1000">
            <div class="modal_inner">
                <Form ref="prepayForm" :model="prepayForm" label-position="left" :label-width="60">
                    <Steps :current="0" style="margin-bottom: 20px">
                        <Step title="交首付"></Step>
                        <Step title="签订购房合同"></Step>
                        <Step title="办理按揭手续"></Step>
                        <Step title="银行放款"></Step>
                    </Steps>

                    <div class="info_row">
                        <div class="row"><span>姓名：</span><i style="color: #2198f2">{{prepayCustomer.name}}</i></div>
                        <div class="row"><span>电话：</span><i style="color: #2198f2">{{prepayCustomer.mobile}}</i></div>
                    </div>

                    <FormItem label="订单信息">
                        <RadioGroup v-model="prepayForm.orderId" :vertical="true">
                            <Radio :label="item.objectId" v-for="item in prepayOrder" :key="item.orderId"
                                   class="order_info">
                                <Icon type="social-apple"></Icon>
                                <span><b>订单号：</b>:{{item.objectId}}</span>
                                <span><b>房产：</b>:{{item.towerName}}{{item.building}}栋{{item.entrance}}单元{{item.layer}}层{{item.no}}</span>
                                <span><b>订单金额：</b><span style="color: red">{{item.amount}}</span></span>
                                <span><b>经办人：</b>{{item.realName}}</span>
                                <span><b>时间：</b>{{item.createdAt}}</span>
                            </Radio>
                        </RadioGroup>
                    </FormItem>

                    <FormItem label="经办人">
                        <Select v-model="prepayForm.userId">
                            <Option v-for="item in userlist" :value="item.objectId">{{item.realName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="首付金额">
                        <Input v-model="prepayForm.amount"></Input>
                    </FormItem>
                    <FormItem label="备注">
                        <Input v-model="prepayForm.remark" type="textarea" placeholder=".."></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="prepayModal=false">取消</Button>
                <Button type="primary" @click="prepaySubmit('prepayForm')">确定</Button>
            </div>
        </Modal>


    </div>
</template>

<script>
    import {columns, ageArea, status} from './list.config'
    import {
        customerList,
        addCustomer,
        houseList,
        getUserByRole,
        customerDropdown,
        customerReserve,
        customerOrderList,
        updateCustomer,
        customerPrepay
    } from '../../service/api'

    export default {
        name: "List",
        data() {
            return {
                list: [],               //列表数据
                columns: columns,       //表头设置
                status: status,         //状态map
                pageTotal: 1,           //总页数
                loading: false,         //是否在加载
                addModal: false,        //添加客户弹框
                editModal: false,       //编辑客户弹框
                reserveModal: false,    //交定金弹框
                prepayModal: false,     //按揭弹框
                reserveLoading: false,  //定金提交中
                searchFeilds: {},       //搜索过滤表单
                addForm: {gender: "M"}, //添加客户表单
                editForm: {},           //编辑客户表单
                reserveForm: {},        //交定金表单
                prepayForm: {},         //按揭表单
                ageArea: ageArea,       //年龄段下拉数据
                houselist: [],          //房型数据
                previewSrc: '',         //预览图片地址
                houseproperty: [],      //房产列表
                userlist: [],           //经办人列表
                reserveCustomer: {},    //交定金的用户
                prepayOrder: [],        //按揭订单信列表
                prepayCustomer: {},     //选中按揭客户
                cardFront: '',          //身份证正面
                cardBack: '',           //身份张反面
                pageIndex: 1,
                pageSize: 10,
            }
        },
        created() {
            getUserByRole().then(res => {
                if (res.data.code == 200) {
                    this.userlist = res.data.data;
                }
            })
            houseList().then(res => {
                if (res.data.code == 200) {
                    this.houselist = res.data.data;
                }
            })
            customerDropdown().then(res => {
                if (res.data.code == 200) {
                    this.houseproperty = res.data.data;
                }
            })
        },
        mounted() {
            this.getList(this.searchFeilds, this.pageIndex, this.pageSize);
        },
        methods: {
            getList(rules, pageIndex, pageSize) {
                this.loading = true;
                customerList(rules, pageIndex, pageSize).then(res => {
                    if (res.data.code == 200) {
                        this.list = res.data.data;
                        this.pageTotal = res.data.page.pages;
                        this.loading = false;
                    }
                })
            },
            goSearch(name) {
                this.getList(this.searchFeilds)
            },
            pageChange() {
            },
            showAddModal() {
                this.addModal = true;
            },
            showReserveModal(row) {
                this.reserveModal = true;
                this.reserveCustomer = row;
                this.reserveForm.customerId = row.objectId;
            },
            showPrepayModal(row) {
                this.prepayCustomer = row;
                customerOrderList(row.objectId).then(res => {
                    if (res.data.code == 200) {
                        this.prepayModal = true;
                        this.prepayOrder = res.data.data;
                    }
                })
            },
            addSubmit(name) {
                let intentionHouseType = this.addForm.intentionHouseType
                data = Object.assign({}, this.addForm, {intentionHouseType: JSON.stringify(intentionHouseType)})
                addCustomer(data).then(res => {
                    if (res.data.code == 200) {
                        this.addModal = false;
                        this.getList({}, this.pageIndex, this.pageSize);
                        this.$Message.success('添加成功')
                    }
                })
            },
            showEditForm(row) {
                row.intentionHouseType = JSON.parse(row.intentionHouseType)
                this.editForm = row;
                this.editModal = true;
                this.editForm.objectId = row.objectId;
            },
            editSubmit(name) {
                let data = Object.assign({}, this.editForm, {intentionHouseType: JSON.stringify(this.editForm.intentionHouseType)});
                updateCustomer(data).then(res => {
                    if (res.data.code == 200) {
                        this.editModal = false;
                        this.getList({}, this.pageIndex, this.pageSize)
                        this.$Message.success('修改成功')
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                })
            },
            reserveSubmit() {
                let formData = new FormData();
                let cardFront = this.$refs['cardFront'].files[0]
                let cardBack = this.$refs['cardBack'].files[0]
                formData.append('idCardPhotoFront', cardFront)
                formData.append('idCardPhotoBack', cardBack)
                Object.keys(this.reserveForm).forEach(key => {
                    if (key == 'houseId') {
                        formData.append(key, this.reserveForm[key][4])
                    } else {
                        formData.append(key, this.reserveForm[key])
                    }
                })
                this.reserveLoading = true;
                customerReserve(formData).then(res => {
                    this.reserveModal = false;
                    this.reserveLoading = false;
                    this.$refs.reserveForm.resetFields();
                    if (res.data.code == 200) {
                        this.getList({}, this.pageIndex, this.pageSize);
                        this.$Message.success('操作成功');
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                })
            },
            uploadView(type) {
                let that = this
                let image = event.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(image)
                reader.onload = function (e) {
                    if (type == 'front') {
                        that.cardFront = this.result
                    }
                    if (type == 'back') {
                        that.cardBack = this.result
                    }
                }
            },
            prepaySubmit(name) {
                let data = Object.assign({}, this.prepayForm, {userId: this.prepayCustomer.objectId})
                customerPrepay(data).then(res => {
                    this.prepayModal = false;
                    if (res.data.code == 200) {
                        this.getList({}, this.pageIndex, this.pageSize)
                        this.$Message.success('录入成功')
                    } else {
                        this.$Message.error('录入失败')
                    }
                })
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

    .order_info {
        span {
            margin-right: 10px;
        }
    }

    .upload_card {
        display: flex;

        .card {
            margin-right: 20px;
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
        height: 100px;
        position: relative;
        overflow: hidden;
        border-radius: 6px;

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
            margin-left: -30px;
            margin-top: -15px;
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