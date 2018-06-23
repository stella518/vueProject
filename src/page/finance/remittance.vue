<template>
  <div :style="{minWidth:'600px',overflow:'scroll'}">
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="ios-list"></Icon>
                    汇款记录
                </p>

                <Row type="flex" justify="center" align="middle" class="advanced-router">
                    <Table height="700" :columns="remittanceList" :data="remittanceData"></Table>
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
      remittanceList:[
        {
            title: '汇款ID',
            key: 'contractId'
        },
        {
            title: '汇款金额',
            key: 'contrPrin'
        },
        {
            title: '汇款时间',
            key: 'createTime'
        },
        {
            title: '状态',
            key: 'loanStatus'
        },
        {
            title: '机构名称',
            key: 'orgName'
        },


      ],
      remittanceData:[],
      page:1,
      size:10,
      token:this.$store.state.token,
      total:10,
    }
  },
  created(){
    this.getPaymentList();
  },
  computed: {
  },
  methods: {
    getPaymentList(){
      this.$api.post('/trade/queryPayment/'+this.token+'/'+this.page+'/'+this.size, {}, r => {
        console.log(r)
        if(r.status == 'SUCCESS'){
          this.remittanceData = r.data;
          this.total = r.total_count;
        }
      })
    },
    changePage(index){
      this.page = index;
      this.getPaymentList();
    }
  }
}
</script>