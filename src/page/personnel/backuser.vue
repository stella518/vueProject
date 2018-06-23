<template>
  <div :style="{minWidth:'600px',overflow:'scroll'}">
      <layout>
        <Form ref="formInline" :model="formInline" inline :label-width="80" style="float:right;">
          <Row>
            <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
              <FormItem prop="nickName"  label="姓名">
                    <Input type="text" v-model="formInline.nickName" placeholder="姓名">
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
              <FormItem prop="orgId" label="机构ID">
                  <Input type="text" v-model="formInline.orgId" placeholder="机构ID">
                      <Icon type="grid" slot="prepend"></Icon>
                  </Input>
              </FormItem>
            </Col>
            <Col span="6" :sm="6" :md="6" :lg="6" :xs="0">
              <div class="control"><Button icon="plus-round" type="primary" class="addBtn" @click="addUser()">新增</Button></div>
            </Col>
          </Row>
          <Row>
            <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
              <FormItem prop="storeId" label="门店ID">
                  <Input type="text" v-model="formInline.storeId" placeholder="门店ID">
                      <Icon type="grid" slot="prepend"></Icon>
                  </Input>
              </FormItem>
            </Col>
            <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
              <FormItem label="类型" >
                  <Select v-model="formInline.userType" size="large" style="width:165px">
                      <Option :value="item" v-for="item of managerTypeList" :key="item.id">{{item}}</Option>
                  </Select>
              </FormItem>
            </Col>
            <Col  :sm="0" :md="0" :lg="0" :xs="4">
              <Button icon="plus-round" type="primary" class="addBtn" @click="addUser()" size="large">新增</Button>
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
                      后台管理人员
                  </p>

                  <Row type="flex" justify="center" align="middle" class="advanced-router">
                      <Table height="500" :columns="userList" :data="userData"></Table>
                  </Row>
                  <Page :total="total" class="pager" @on-change="changePage"></Page>
                  <modal v-model="deleteMol" width="360">
                    <p slot="header" style="color:#f60;text-align:center">
                        <icon type="information-circled"></icon>
                        <span>确认删除</span>
                    </p>
                    <div style="text-align:center">
                        <p>您是否确定删除此条记录</p>
                    </div>
                    <div slot="footer">
                        <i-button type="error" size="large" long :loading="delete_loading" @click="del">删除</i-button>
                    </div>
                  </modal>
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
            title: '姓名',
            key: 'nickName',
        },
        {
            title: '编号',
            key: 'userNo'
        },
        {
            title: '类型',
            key: 'userType'
        },
        {
            title: '隶属机构',
            key: 'orgName'
        },
        {
            title: '隶属门店',
            key: 'storeName'
        },
        {
            title: '创建时间',
            key: 'createTime'
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
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                              this.edit(params.row);
                            }
                        }
                    }, '编辑'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.deleteMol = true;
                            }
                        }
                    }, '删除')
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
        id:'',
        nickName: '',
        storeId: '',
        orgId:'',
        userType: '',
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
    }
  },
  created(){
    this.getBackUserList();
    this.getSelectOrganizaList();
    // this.getSelectStoreList();
  },
  methods: {
    getBackUserList(){
      this.$api.post('/user/back/getBackUser/'+this.token+'/'+this.page+'/'+this.size, this.formInline, r => {
        console.log(r)
        if(r.status == 'SUCCESS'){
          this.userData = r.data;
          this.total = r.total_count;
        }
      })
    },
    getSelectOrganizaList(){
      this.$api.post('/org/getSelectOrganizaList/',{}, r => {
        console.log(r)
        if(r.status == 'SUCCESS'){
          this.organizaList = r.data;
        }
      })
    },
    getSelectStoreList(orgID){
      this.$Spin.show({
          render: (h) => {
              return h('div', [
                  h('Icon', {
                      'class': 'demo-spin-icon-load',
                      props: {
                          type: 'load-c',
                          size: 18
                      }
                  }),
                  h('div', 'Loading')
              ])
          }
      });
      this.$api.post('/org/getSelectStoreList/'+orgID,{}, r => {
        console.log(r)
        this.$Spin.hide();
        if(r.status == 'SUCCESS'){
          this.storeList = r.data;
        }
      })
    },
    addUser(){
      this.formItem.id = '';
      this.formItem.nickName = '';
      this.formItem.storeId = '';
      this.formItem.orgId = '';
      this.formItem.userType = '';
      this.$Modal.confirm({
        render: (h) => {
              return h('Form', [
                h('FormItem',[
                   h('Input', {
                      props: {
                          value: '',
                          autofocus: true,
                          placeholder: '请输入姓名'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.nickName = val;
                          }
                      }
                  }),
                ]),
                h('FormItem',[
                   h('Input', {
                      props: {
                          value: '',
                          autofocus: true,
                          placeholder: '请输入编号'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.userNo = val;
                          }
                      }
                  }),
                ]),
                h('FormItem',[
                  h('Select',{
                    props: {
                        placeholder: '请选择所属机构'
                      },
                    on: {  
                        'on-change':(event) => {  
                            this.formItem.orgId = event; 
                            this.getSelectStoreList(event);
                        }  
                    },
                  },
                    this.organizaList.map((item)=>{
                      return h('Option',{
                        props:{
                          value:item.orgId,
                          label:item.name
                        }
                      })
                  }))
                ]),
                h('FormItem',[
                  h('Select',{
                    props: {
                        placeholder: '请选择隶属门店'
                      },
                    on: {  
                        'on-change':(event) => {  
                            this.formItem.storeId = event; 
                        }  
                    },
                  },
                    this.storeList.map((item)=>{
                      return h('Option',{
                        props:{
                          value:item.storeId,
                          label:item.storeName
                        }
                      })
                  }))
                ]),
                h('FormItem',[
                  h('Select',{
                    props: {
                        placeholder: '请选择类型'
                      },
                    on: {  
                        'on-change':(event) => {  
                            this.formItem.userType = event; 
                        }  
                    },
                  },
                    this.managerTypeList.map((item)=>{
                      return h('Option',{
                        props:{
                          value:item
                        }
                      })
                  }))
                ]),
            ]);
          },
        onOk:()=>{
          let token = this.formItem.token;
          console.log(this.formItem);
          this.$api.post('/user/back/register/'+token, this.formItem, r => {
            console.log(r)
            if(r.status == 'SUCCESS'){
              this.$Message.success(r.desc);
              this.getBackUserList();
            }
          })
        }
      })
    },
    del(){
      let index = parseInt(this.choose_index);//当前选择的第几个数据
      let id = this.organData[index].orgId;
      this.delete_loading = true;
      // this.$api.post('/org/delOrganiza/'+id, {}, r => {
      //   console.log(r)
      //   this.delete_loading = false;
      //   this.deleteMol = false;
      //   if(r.status == 'E030005'){
      //     this.$Message.info({
      //         content: r.desc,
      //         duration: 10
      //     });
      //   }
      // })
    },
    edit(param){
      this.formItem.id = param.id;
      this.formItem.nickName = param.nickName;
      this.formItem.storeId = param.storeId;
      this.formItem.orgId = param.orgId;
      this.formItem.userNo = param.userNo;
      this.formItem.userType = param.userType;
      this.$Modal.confirm({
        render: (h) => {
              return h('Form', [
                h('FormItem',[
                   h('Input', {
                      props: {
                          value: param.nickName,
                          autofocus: true,
                          placeholder: '请输入姓名'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.nickName = val;
                          }
                      }
                  }),
                ]),
               h('FormItem',[
                   h('Input', {
                      props: {
                          value: param.userNo,
                          autofocus: true,
                          placeholder: '请输入编号'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.userNo = val;
                          }
                      }
                  }),
                ]),
               h('FormItem',[
                  h('Select',{
                    props: {
                        placeholder: '请选择所属机构'
                      },
                    on: {  
                        'on-change':(event) => {  
                            this.formItem.orgId = event; 
                        }  
                    },
                  },
                    this.organizaList.map((item)=>{
                      return h('Option',{
                        props:{
                          value:item.orgId,
                          label:item.name
                        }
                      })
                  }))
                ]),
               h('FormItem',[
                  h('Select',{
                    props: {
                        placeholder: '请选择隶属门店'
                      },
                    on: {  
                        'on-change':(event) => {  
                            this.formItem.storeId = event; 
                        }  
                    },
                  },
                    this.storeList.map((item)=>{
                      return h('Option',{
                        props:{
                          value:item.storeId,
                          label:item.storeName
                        }
                      })
                  }))
                ]),
              h('FormItem',[
                  h('Select',{
                    props: {
                        placeholder: '请选择类型',
                        value:param.userType
                      },
                    on: {  
                        'on-change':(event) => {  
                            this.formItem.userType = event; 
                        }  
                    },
                  },
                    this.managerTypeList.map((item)=>{
                      return h('Option',{
                        props:{
                          value:item
                        }
                      })
                  }))
                ]),

            ]);
          },
        onOk:()=>{
          let id = this.formItem.id;
          let token = this.formItem.token;
          this.$api.post('/user/back/editBackUser/'+token+'/'+id, this.formItem, r => {
            console.log(r)
            if(r.status == 'SUCCESS'){
              this.$Message.success(r.desc);
              this.getBackUserList();
            }
          })
        }
      })
    },
    changePage(index){
      this.page = index;
      this.getBackUserList();
    },
    handleSubmit(name) {
      this.getBackUserList();
    }
  }
}
</script>