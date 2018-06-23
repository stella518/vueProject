<template>
  <div :style="{minWidth:'600px',overflow:'scroll'}">
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="ios-list"></Icon>
                    贷款产品
                </p>

                <Row type="flex" justify="center" align="middle" class="advanced-router">
                    <Table height="600" :columns="productList" :data="productData"></Table>
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
      productList:[
          {
              title: '产品组',
              key: 'productGroupCd'
          },
          {
              title: '产品代码',
              key: 'productCd'
          },
          {
              title: '产品名称',
              key: 'productName'
          },
          {
              title: '产品描述',
              key: 'description'
          },
          {
              title: '状态',
              key: 'productStatus'
          },
          {
            title: '子产品',
            key: 'id',
            width: 150,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.showSub(params.row.id);
                            }
                        }
                    }, '子产品查看'),
                ]);
            }
        }
      ],
      productData:[],
      token:this.$store.state.token,
      page:1,
      size:10,
      total:10,
    }
  },
  created(){
    this.getProductList();
  },
  computed: {
  },
  methods: {
    getProductList(){
      this.$api.post('/product/getAllProduce/'+this.page+'/'+this.size,  {}, r => {
        console.log(r)
        if(r.status == 'SUCCESS'){
          this.productData = r.data;
          this.total = r.total_count;
        }
      })
    },
    showSub(id){
      this.$router.push({ path: 'loansub/'+id})
    },
    handleSubmit(name) {
      this.getProductList();                                
    },
    changePage(index){
      this.page = index;
      this.getProductList();
    }
  }
}
</script>