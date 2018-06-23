<template>
  <div :style="{minWidth:'600px',overflow:'scroll'}">
      <layout>
        <Form ref="formInline" :model="formInline" inline :label-width="80" style="float:right;">
          <Row>
            <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
              <FormItem prop="name"  label="姓名">
                    <Input type="text" v-model="formInline.name" placeholder="姓名">
                        <Icon type="ios-person" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </Col>
            <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
              <FormItem prop="phone" label="手机">
                  <Input type="text" v-model="formInline.phone" placeholder="手机">
                      <Icon type="iphone"slot="prepend"></Icon>
                  </Input>
              </FormItem>
            </Col>
            <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
              <FormItem prop="idNo" label="身份证">
                  <Input type="text" v-model="formInline.idNo" placeholder="身份证">
                      <Icon type="grid" slot="prepend"></Icon>
                  </Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
              <FormItem prop="zhimaScoreStart" label="芝麻分下限">
                  <Input type="text" v-model="formInline.zhimaScoreStart"  placeholder="芝麻分下限">
                      <Icon type="information-circled" slot="prepend"></Icon>
                  </Input>
              </FormItem>
            </Col>
            <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
              <FormItem prop="zhimaScoreEnd" label="芝麻分上限">
                  <Input type="text" v-model="formInline.zhimaScoreEnd"  placeholder="芝麻分上限">
                      <Icon type="information-circled" slot="prepend"></Icon>
                  </Input>
              </FormItem>
            </Col>
            <Col span="12"  :sm="12" :md="12" :lg="12" :xs="4" class="search">
            <FormItem >
                  <Button type="primary" class="searchBtn"  icon="ios-search" @click="handleSubmit('formInline')" size="large">查询</Button>
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
                      绿悦用户列表
                  </p>

                  <Row type="flex" justify="center" align="middle" class="advanced-router">
                      <Table height="500" :columns="userList" :data="userData"></Table>
                  </Row>
                  <Page :total="total" class="pager" @on-change="changePage"></Page>
              </Card>
          </Col>
      </Row>
      <Modal v-model="modal_risk" width="500">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>风控信息</span>
        </p>
        <div style="text-align:left;">
            <p><b>姓名：</b>{{riskData?riskData.name:''}}</p>
            <p><b>订单号：</b>{{riskData?riskData.idNo:''}}</p>
            <p><b>风控信息：</b><br/>{{riskData?riskData.industryfocus:''}}</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading" @click="close">确定</Button>
        </div>
    </Modal>
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
   .search{
      text-align: right;
  }
   @media only screen and (min-width: 320px) and (max-width: 767px) {
    .addBtn{
      margin-left: 20px;
    }
    .searchBtn{
        text-align: center;
        width: 100px;
        margin:10px 0;
        float: right;
        float: left;
      }
  }
</style>
<script type="text/babel">
import expandRow from './table-expand.vue';
export default {
  components: { expandRow },
  data () {
    return {
      userList:[
        {
            type: 'expand',
            width: 50,
            render: (h, params) => {
                return h(expandRow, {
                    props: {
                        row: params.row
                    }
                })
            }
        },
        {
            title: '姓名',
            key: 'name',
        },
        {
            title: '编号',
            key: 'userNo'
        },
        {
            title: '身份证',
            key: 'idNo'
        },
        {
            title: '电话号码',
            key: 'phone'
        },
        {
            title: '用户类型',
            key: 'userType'
        },
        {
            title: '芝麻信用分',
            key: 'zhimaScore'
        },
        {
            title: '银行卡号',
            key: 'cardNo'
        },
        {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'info',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                              this.checkRisk(params.row);
                            }
                        }
                    }, '风控'),
                    h('Button', {
                        props: {
                            type: 'warning',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                let userID = { userID: params.row.thirdUserId };
                                this.$router.push({
                                    name: 'thirdorders',
                                    params: userID
                                });
                            }
                        }
                    }, '订单')
                ]);
            }
        }
      ],
      userData:[],
      page:1,
      size:10,
      total:10,
      token:this.$store.state.token,
      deleteMol:false,
      delete_loading:false,
      choose_index:-1,
      formItem: {
        name:'',
        phone: '',
        idNo: '',
        zhimaScoreStart:'',
        zhimaScoreEnd: '',
        cardNo:'',
        token:this.$store.state.token
      },
      organizaList:[],
      storeList:[],
      managerTypeList:['后台管理员', '运营人员', '风控人员', '客服人员', '法人', '店员', '店长', '机构管理员', '消费用户'],
      formInline: {
          orgId:null,
          storeId: null,
          nickName:'',
          phone:'',
          userType:'',
      },
      riskData:{},
      modal_loading: false,
      modal_risk:false,
    }
  },
  created(){
    this.getThirdUserList();
  },
  methods: {
    getThirdUserList(){
      this.$api.post('/inner/third/lv/queryThirdUser/'+this.page+'/'+this.size, this.formInline, r => {
        console.log(r)
        if(r.status == 'SUCCESS'){
          this.userData = r.data;
          this.total = r.total_count;
        }
      })
    },
    changePage(index){
      this.page = index;
      this.getThirdUserList();
    },
    handleSubmit(name) {
      this.getThirdUserList();
    },
    checkRisk(param){//获取最近一条风控信息
        this.$api.post('/inner/third/lv/queryThirdUserRisk/'+param.thirdUserId+'/1/1', this.formInline, r => {
        console.log(r)
        if(r.status == 'SUCCESS'){
          this.riskData = r.data[0];
          this.modal_risk=true;
        }
      })
    },
    close () {
        this.modal_risk = false;
        this.modal_loading=false;
    }
  }
}
</script>