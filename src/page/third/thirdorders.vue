<template>
   <div>
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="ios-list"></Icon>
                        第三方用户订单记录
                    </p>
                    <Row type="flex" justify="center" align="middle" class="advanced-router">
                        <Table :columns="orderList" :data="orderData"></Table>
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
        //     title: '订单ID',
        //     key: 'id'
        // },
        {
            title: '订单ID',
            key: 'id',
            align: 'center',
            render: (h, params) => {
                return h('Button', {
                    props: {
                        type: 'text',
                        size: 'small'
                    },
                    on: {
                        click: () => {
                            let thirdOrderId = { thirdOrderId: params.row.id };
                            this.$router.push({
                                name: 'thirdrepayment',
                                params: thirdOrderId
                            });
                        }
                    }
                }, '分期详情');
            }
        },
        {
            title: '订单创建时间',
            key: 'createTime'
        },
        {
            title: '三方订单ID',
            key: 'thirdOrderId'
        },
        {
            title: '三方订单创建时间',
            key: 'thirdCreateTime'
        },
        {
            title: '三方订单编号',
            key: 'thirdOrderNo'
        },
        {
            title: '商品ID',
            key: 'goodId'
        },
        {
            title: '还款期数',
            key: 'orderTerm'
        },
        {
            title: '新旧程度',
            key: 'isnew'
        },
        {
            title: '安装费用',
            key: 'isinstall'
        },
       {
            title: '月供',
            key: 'monthamt'
        },
      ],
      orderData:[],
      page:1,
      size:10,
      token:this.$store.state.token,
      total:10,
      paramNo:'',
      userID:''
    }
  },
  created(){
    this.userID = this.$route.params.userID;
    if(this.userID){
      this.getOrderListByID()
    }
    
  },
  methods: {
    getOrderListByID(){
      this.$api.post('/inner/third/lv/queryThirdOrder/'+this.userID+'/'+this.page+'/'+this.size, {}, r => {
        console.log(r)
        if(r.status == 'SUCCESS'){
          this.orderData = r.data;
          this.total = r.return_count;
        }
      })
    },
    changePage(index){
      this.page = index;
      if(this.userID){
        this.getOrderListByID()
      }
    }
  }
}
</script>