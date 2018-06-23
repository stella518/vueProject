<template>
  <div  :style="{minWidth:'600px',overflow:'scroll'}">
      <layout>
        <Form ref="formInline" :model="formInline" inline :label-width="90" style="float:right;">
          <Row>
            <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
              <FormItem prop="realname"  label="姓名">
                    <Input type="text" v-model="formInline.realname" placeholder="姓名">
                        <Icon type="ios-person" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </Col>
            <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
              <FormItem prop="phone" label="电话">
                  <Input type="text" v-model="formInline.phone" placeholder="电话">
                      <Icon type="iphone"slot="prepend"></Icon>
                  </Input>
              </FormItem>
            </Col>
            <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
              <FormItem prop="orgId" label="机构ID">
                  <Input type="text" v-model="formInline.orgId" placeholder="机构ID">
                      <Icon type="grid" slot="prepend"></Icon>
                  </Input>
              </FormItem>
            </Col>
            <Col span="6" :sm="6" :md="6" :lg="6" :xs="0">
              <div class="control"><Button icon="plus-round" type="primary" class="addBtn" @click="addStore()">新增</Button></div>
            </Col>
          </Row>
          <Row>
            <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
              <FormItem prop="idnum" label="ID">
                  <Input type="text" v-model="formInline.idnum" placeholder="ID">
                      <Icon type="grid" slot="prepend"></Icon>
                  </Input>
              </FormItem>
            </Col>
            <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
              <FormItem label="用户信息状态" >
                  <Select v-model="formInline.isUserInfoComplete" size="large" style="width:165px">
                      <Option :value="item" v-for="item of userInfoComplete" :key="item.id">{{item}}</Option>
                  </Select>
              </FormItem>
            </Col>
            <Col span="6" :sm="0" :md="0" :lg="0" :xs="4">
              <Button icon="plus-round" type="primary" class="addBtn" @click="addStore()" size="large">新增</Button>
            </Col>
            <Col span="12" :sm="12" :md="12" :lg="12" :xs="4" class="search">
            <FormItem >
                  <Button type="primary"  icon="ios-search" class="searchBtn"  @click="handleSubmit('formInline')" size="large">查询</Button>
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
                      后台管理人员
                  </p>

                  <Row type="flex" justify="center" align="middle" class="advanced-router">
                      <Table height="500" :columns="userList" :data="userData"></Table>
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
export default {
  data () {
    return {
      fullHeight: document.documentElement.clientHeight-73,
      userList:[
        {
            title: '编号',
            key: 'userNo'
        },
        {
            title: '电话',
            key: 'phone'
        },
        {
            title: '工作',
            key: 'socialTypeEnum'
        },
        {
            title: '用户信息状态',
            key: 'userInfoCompleteEnum'
        },
        // {
        //     title: '是否有交易密码',
        //     key: 'hasTradePwd'
        // },
        {
            title: '是否有交易密码',
            key: 'hasTradePwd',
            render: (h, params) => {
                const row = params.row;
                const color = row.hasTradePwd === true ? 'green' : 'red';
                const text = row.hasTradePwd ===  true? '是' : '否';

                return h('Tag', {
                    props: {
                        type: 'dot',
                        color: color
                    }
                }, text);
            }
        },
        {
            title: '可用金额',
            key: 'canUseAmt'
        },
        {
            title: '已用金额',
            key: 'creditAmt'
        },
        {
            title: '最近登录时间',
            key: 'lastLoginTime'
        },
      ],
      userData:[],
      page:1,
      size:10,
      total:10,
      token:this.$store.state.token,
      choose_index:-1,
      formItem: {
        id:'',
        userNo: '',
        phone: '',
        socialTypeEnum: '',
        token:this.$store.state.token
      },
      formInline: {
        phone:null,
        orgId:null,
        realname:'',
        idnum:'',
        isUserInfoComplete:''
      },
      userInfoComplete:['未完善','已完善'],
    }
  },
  created(){
    this.getConsumerList();
  },
  methods: {
    getConsumerList(){
      this.$api.post('/user/back/getConsumerUser/'+this.token+'/'+this.page+'/'+this.size, this.formInline, r => {
        console.log(r)
        if(r.status == 'SUCCESS'){
          this.userData = r.data;
          this.total = r.total_count;
        }
      })
    },
    changePage(index){
      this.page = index;
      this.getConsumerList();
    },
    handleSubmit(name) {
      this.getConsumerList();
    },
  }
}
</script>