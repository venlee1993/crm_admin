<template>
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
                    <Input v-model="editForm.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button @click="addModal=false">取消</Button>
            <Button type="primary" @click="addSubmit('customerForm')">确定</Button>
        </div>
    </Modal>
</template>

<script>
    export default {
        name: "PrePay",
        props: [
            {
                name: 'prepayModal',
                type:Boolean
            }
        ]
    }
</script>

<style scoped>

</style>