<template>
  <!-- <layout>
    <Table :columns="proceedsList" :data="proceedsData"></Table>
    <Page :total="total" class="pager" @on-change="changePage"></Page>
  </layout> -->
   <div>
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="ios-list"></Icon>
                        还款明细
                    </p>
                    <Row type="flex" justify="center" align="middle" class="advanced-router">
                        <Table :columns="proceedsList" :data="proceedsData"></Table>
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
      proceedsList:[
        {
            title: '订单号',
            key: 'tradeFlowNo'
        },

        {
            title: '总还款金额',
            key: 'schdAmt'
        },
        {
            title: '结清日期',
            key: 'paidOutDate'
        },
        {
            title: '到期还款日',
            key: 'pmtDueDate'
        },
        // {
        //     title: 'termId',
        //     key: 'termId'
        // },
        {
            title: '当前期数',
            key: 'termNo'
        },
        {
            title: '期供状态',
            key: 'termStatus'
        },
       
      ],
      proceedsData:[],
      page:1,
      size:10,
      token:this.$store.state.token,
      total:10,
      paramNo:'',
    }
  },
  created(){
    this.paramNo = this.$route.params.no;
    if(this.$route.params.no){
      this.getReceiptListByID()
    }else{
      this.getReceiptList();
    }
    
  },
  methods: {
    getReceiptListByID(){
      this.$api.post('/trade/queryReceiptByTrade/'+this.paramNo, {}, r => {
        console.log(r)
        if(r.status == 'SUCCESS'){
          this.proceedsData = r.data;
          this.total = r.return_count;
        }
      })
    },
    getReceiptList(){
      this.$api.post('/trade/queryReceipt/'+this.token+'/'+this.page+'/'+this.size, {}, r => {
        console.log(r)
        if(r.status == 'SUCCESS'){
          this.proceedsData = r.data;
          this.total = r.total_count;
        }
      })
    },
    changePage(index){
      this.page = index;
      if(this.$route.params.no){
        this.getReceiptListByID()
      }else{
        this.getReceiptList();
      }
    }
  }
}
</script>