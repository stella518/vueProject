<template>
  <div :style="{minWidth:'600px',overflow:'scroll'}"> 
    <layout>
      <Form ref="formInline" :model="formInline" inline :label-width="100" style="float:right;">
        <Row>
          <Col span="8" :sm="8" :md="8" :lg="8" :xs="16">
            <FormItem prop="daterange" label="日期范围">
              <DatePicker type="daterange" placement="bottom-start"  @on-change="formatDatarange" split-panels  v-model="formInline.daterange" placeholder="请选择日期范围" style="width: 260px"></DatePicker>
            </FormItem>
          </Col>
          <Col :sm="0" :md="0" :lg="0" :xs="4">
            <FormItem >
              <Button type="primary"  icon="ios-search" @click="handleSubmit('formInline')" size="large">查询</Button>
            </FormItem>
          </Col>
          <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
            <FormItem prop="orgNo" label="机构编号">
                <Input type="text" v-model="formInline.orgNo" placeholder="机构编号" clearable>
                    <Icon type="android-home" slot="prepend"></Icon>
                </Input>
            </FormItem>
          </Col>
          <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
            <FormItem prop="orgName" label="机构名称">
                <Input type="text" v-model="formInline.orgName" placeholder="机构名称" clearable>
                    <Icon type="android-home" slot="prepend"></Icon>
                </Input>
            </FormItem>
          </Col>
          <Col span="4" :sm="4" :md="4" :lg="4" :xs="0">
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
                      <Icon type="cash"></Icon>
                     当前资金总额：{{balance}}
                  </p>
                  <Row type="flex" justify="center" align="middle" class="advanced-router">
                    <Col span="12">
                      <Table :columns="receiptList" :data="receiptData"></Table>
                    </Col>
                    <Col span="12">
                      <Table :columns="accountList" :data="accountData"></Table>
                    </Col>
                  </Row>
                  <!-- <Page :total="total" class="pager" @on-change="changePage"></Page> -->
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
  .control{
    width: 100%;
    padding: 0 10px;
  }
  .addBtn{
    width: 100px;
    margin:10px 0;
    float: right;
  }
</style>
<script type="text/babel">
export default {
  data () {
    return {
      page:1,
      size:10,
      total:10,
      token:this.$store.state.token,
      choose_index:-1,
      formInline: {
          orgId:'',
          dateStart:'2018-01-01',
          dateEnd:'2018-04-20',
          daterange:['2018-01-01','2018-04-20'],
          orgNo:'',
          orgName:''
      },
      receiptList:[
        {
            title: '机构编号',
            key: 'orgNo'
        },
        {
            title: '机构名称',
            key: 'orgName'
        },
        {
            title: '收款条数',
            key: 'receiptNum'
        },
        {
            title: '收款总金额',
            key: 'receiptAmt'
        },

      ],
      accountList:[
        {
            title: '机构编号',
            key: 'orgNo'
        },
        {
            title: '机构名称',
            key: 'orgName'
        },
        {
            title: '付款条数',
            key: 'paymentNum'
        },
        {
            title: '付款总金额',
            key: 'paymentAmt'
        },
       
      ],
      receiptData:[],
      accountData:[],
      balance:''
    }
  },
  created(){
      this.getaccountBalance();
      this.getReceiptList();
      this.getaccountList();
  },
  methods: {
    handleSubmit(name) {
      console.log('in');
      this.getReceiptList();
      this.getaccountList();
    },
    formatDatarange(date){
      if(date.length==2){
        this.formInline.dateStart = date[0];
        this.formInline.dateEnd = date[1];
      }
    },
    getDate(date){
      var returnDate = '';
      if(date){
        var year = date.getFullYear();
        var month = date.getMonth()+1;    
        var day = date.getDate(); 
        returnDate = year+'-'+month+'-'+day;
      }
      return returnDate;
    },
    getReceiptList(){
      this.$api.get('/trade/accountReceiptSummary?dateStart='+this.formInline.dateStart+"&dateEnd="+this.formInline.dateEnd+"&orgNo="+this.formInline.orgNo+"&orgName="+this.formInline.orgName, {}, r => {
        console.log(r)
        if(r.status == 'SUCCESS'){
          this.receiptData = r.data;
        }
      })
    },
    getaccountList(){
      this.$api.get('/trade/accountPaySummary?dateStart='+this.formInline.dateStart+"&dateEnd="+this.formInline.dateEnd+"&orgNo="+this.formInline.orgNo+"&orgName="+this.formInline.orgName, {}, r => {
        console.log(r)
        if(r.status == 'SUCCESS'){
          this.accountData = r.data;
        }
      })
    },
    getaccountBalance(){
      this.$api.get('/trade/queryAccountBalance', {}, r => {
        console.log(r)
        if(r.status == 'SUCCESS'){
          this.balance = r.data;

        }
      })
    },
  }
}
</script>