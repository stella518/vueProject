<template>
    <div  :style="{minWidth:'600px',overflow:'scroll'}">
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="ios-list"></Icon>
                        贷款产品子类
                    </p>
                    <Row type="flex" justify="center" align="middle" class="advanced-router">
                        <Table height="700" :columns="productList" :data="productData"></Table>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<style>

</style>
<script type="text/babel">

  export default{
    data (){
        return {
            productList:[
                {
                    title: '产品代码',
                    key: 'productCd',
                    filters: this.productCodeList,
                    filterMultiple: false,
                    filterMethod  (value, row) {
                        return row.productCd == value;
                    }
                },
                {
                    title: '产品子类',
                    key: 'productSubCd'
                },
                {
                    title: '产品类型',
                    key: 'ztProductEnum'
                },
                {
                    title: '还款方式',
                    key: 'repayMethod'
                },
                {
                    title: '期数',
                    key: 'cycleCnt'
                },
                {
                    title: '金额上限',
                    key: 'maxAmt'
                },
                {
                    title: '金额下限',
                    key: 'minAmt'
                },
                {
                    title: '描述',
                    key: 'description'
                },
                {
                    title: '标签',
                    key: 'tag'
                },
            ],
            productData:[],
            token:this.$store.state.token,
            productCodeList:[],
        }
    },
    created(){
        let id = this.$route.params.id;
        if(id){
            this.getSubProductListByID(id)
        }else{
            this.getSubProductList();
        }
    },
    methods: {
        getSubProductListByID(id){
            this.$api.post('/product/getAllSubProduce/'+id,  {}, r => {
                if(r.status == 'SUCCESS'){
                this.productData = r.data;
                }
            })
        },
        getSubProductList(){
            this.$api.post('/product/getAllSubProduce',  {}, r => {
                if(r.status == 'SUCCESS'){
                    this.productData = r.data;
                    let list = r.data;
                    let productCodeList = [];
                    let productList = [];
                    for(let i=0;i<list.length;i++){
                        let item = list[i];
                        let testStr=','+productCodeList.join(",")+","; 
                        if(testStr.indexOf(","+item.productCd+",") == -1){
                            productCodeList.push(item.productCd);
                            productList.push({label:item.productCd,value:item.productCd});
                        }
                    }
                    this.productCodeList = productList;
                    this.productList[0].filters = productList;
                }
            })
        },

    },
  }
</script>
