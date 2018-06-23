<template>
  <div :style="{minWidth:'750px',overflow:'scroll'}">
      <layout>
        <Form ref="formInline" :model="formInline" inline :label-width="80" style="float:right;">
            <Row>
                <Col span="8">
                <FormItem prop="realname"  label="真实姓名">
                        <Input type="text" v-model="formInline.realname" placeholder="真实姓名">
                            <Icon type="ios-person" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Col>
                <Col span="8">
                <FormItem prop="idnum" label="身份证号">
                    <Input type="text" v-model="formInline.idnum" placeholder="身份证号">
                        <Icon type="android-person-add" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem prop="phone" label="手机号">
                    <Input type="text" v-model="formInline.phone" placeholder="手机号">
                        <Icon type="iphone"slot="prepend"></Icon>
                    </Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                <FormItem prop="outTradeFlowNo" label="对外流水号">
                    <Input type="text" v-model="formInline.outTradeFlowNo" placeholder="对外流水号">
                        <Icon type="ios-compose-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem prop="tradeFlowNo" label="交易流水号">
                    <Input type="text" v-model="formInline.tradeFlowNo" placeholder="交易流水号">
                        <Icon type="ios-compose-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="合同" >
                    <Select v-model="formInline.flowStage" size="large" style="width:165px">
                        <Option :value="item" v-for="item of flowStageList" :key="item.id">{{item}}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                <FormItem label="交易状态" >
                    <Select v-model="formInline.tradeStatus" size="large" style="width:165px">
                        <Option :value="item" v-for="item of tradeStatusList" :key="item.id">{{item}}</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="产品类型" >
                    <Select v-model="formInline.ztProductEnum" size="large" style="width:165px">
                        <Option :value="item" v-for="item of ztProductEnumList" :key="item.id">{{item}}</Option>
                    </Select>
                </FormItem>

                </Col>
                <Col span="8">
                <FormItem >
                    <Button type="primary"  icon="ios-search" @click="handleSubmit('formInline')" size="large">查询</Button>
                </FormItem>
                </Col>
            </Row>
            </Form>
        </layout>
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="ios-list"></Icon>
                        贷款记录
                    </p>

                    <Row type="flex" justify="center" align="middle" class="advanced-router">
                        <Table height="500" :columns="orderList" :data="orderData"></Table>
                    </Row>
                    <Page :total="total" class="pager" @on-change="changePage"></Page>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<style scoped>
.pager{
    text-align: right;
    background-color: #fff;
    padding-top:20px;
  }
</style>
<script type="text/babel">
export default {
  data () {
    return {
      orderList:[
        // {
        //     title: '交易ID',
        //     key: 'tradeId'
        // },
        {
            title: '还款详情',
            key: 'show_more',
            align: 'center',
            render: (h, params) => {
                return h('Button', {
                    props: {
                        type: 'text',
                        size: 'small'
                    },
                    on: {
                        click: () => {
                            let argu = { no: params.row.tradeId };
                            this.$router.push({
                                name: 'proceeds',
                                params: argu
                            });
                        }
                    }
                }, '分期详情');
            }
        },
        {
            title: '真实姓名',
            key: 'realname'
        },
        {
            title: '身份证号',
            key: 'idnum'
        },
        {
            title: '分期次数',
            key: 'cycleCnt'
        },
        {
            title: '产品类型',
            key: 'ztProductEnum'
        },
        {
            title: '产品编码',
            key: 'productCd'
        },
        {
            title: '还款方式',
            key: 'repayMethod'
        },
        {
            title: '交易流水号',
            key: 'tradeFlowNo'
        },
        {
            title: '对外流水号',
            key: 'outTradeFlowNo'
        },
        {
            title: '申请单号',
            key: 'appNO'
        },
         {
            title: '合同',
            key: 'flowStage'
        },
        {
            title: '合同编号',
            key: 'contractNo'
        },
        {
            title: '交易状态',
            key: 'tradeStatus'
        },
        {
            title: '申请金额',
            key: 'requestAmount'
        },
        {
            title: '实得金额',
            key: 'approvalAmount'
        },
      ],
      orderData:[],
      page:1,
      size:10,
      token:this.$store.state.token,
      total:10,
      formInline: {
          flowStage:null,
          idnum: '',
          outTradeFlowNo:'',
          phone:'',
          realname:'',
          tradeFlowNo:'',
          tradeStatus:null,
          ztProductEnum:null
      },
      flowStageList:['预申请', '审批', '合同', '借据'],
      tradeStatusList:['初始', '正在处理', '通过', '拒绝', '放弃', '驳回待补件', '合同签署成功', '合同签署失败', '打款中', '打款成功', '打款失败', '商户结算', '还款中', '正常完结', '提前结清'],
      ztProductEnumList:['消费贷', '现金贷']
    }
  },
  created(){
    this.getLoanList();
  },
  methods: {
    getLoanList(){
      this.$api.post('/trade/queryTradeBack/'+this.token+'/'+this.page+'/'+this.size, this.formInline, r => {
        console.log(r)
        if(r.status == 'SUCCESS'){
          this.orderData = r.data;
          this.total = r.total_count;
        }
      })

    },
    changePage(index){
      this.page = index;
      this.getLoanList();
    },
    handleSubmit(name) {
      this.getLoanList();
    }
  }
}
</script>