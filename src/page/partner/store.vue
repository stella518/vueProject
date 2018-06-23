<template>
    <div :style="{minWidth:'600px',overflow:'scroll'}">
        <layout>
            <Form ref="formInline" :model="formInline" inline :label-width="80" style="float:right;">
                <Row>
                    <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
                    <FormItem prop="storeName"  label="门店名称">
                            <Input type="text" v-model="formInline.storeName" placeholder="门店名称">
                                <Icon type="android-home" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
                    <FormItem prop="storeNo" label="门店编号">
                        <Input type="text" v-model="formInline.storeNo" placeholder="门店编号">
                            <Icon type="grid" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    </Col>
                    <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
                    <FormItem prop="contactName" label="门店负责人">
                        <Input type="text" v-model="formInline.contactName" placeholder="门店负责人">
                            <Icon type="ios-person" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    </Col>
                    <Col span="6" :sm="6" :md="6" :lg="6" :xs="0">
                        <div class="control"><Button icon="plus-round" type="primary" class="addBtn" @click="addStore()">新增</Button></div>
                    </Col>
                </Row>
                <Row>
                    <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
                    <FormItem prop="telephone" label="联系电话">
                        <Input type="text" v-model="formInline.telephone" placeholder="联系电话">
                            <Icon type="iphone"slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    </Col>
                    <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
                    <FormItem label="状态" >
                        <Select v-model="formInline.status" size="large" style="width:165px">
                            <Option :value="item" v-for="item of storeStatus" :key="item.id">{{item}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col  :sm="0" :md="0" :lg="0" :xs="4">
                        <Button icon="plus-round" type="primary" class="addBtn" @click="addStore()"  size="large">新增</Button>
                    </Col>
                    <Col span="12" :sm="12" :md="12" :lg="12" :xs="4" class="search">
                        <FormItem >
                            <Button type="primary"  icon="ios-search"  class="searchBtn" @click="handleSubmit('formInline')" size="large">查询</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <Row>
                <Col span="24">
                    <Card>
                        <p slot="title">
                            <Icon type="ios-list"></Icon>
                            门店
                        </p>

                        <Row type="flex" justify="center" align="middle" class="advanced-router">
                            <Table height="500" :columns="storeList" :data="storeData"></Table>
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
        </layout>
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
import expandRow from './store-expand.vue';
export default {
  data () {
    return {
      storeList:[
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
            title: '门店名称',
            key: 'storeName',
        },
        {
            title: '门店编号',
            key: 'storeNo'
        },
        {
            title: '联系电话',
            key: 'telephone'
        },
        {
            title: '门店负责人',
            key: 'contactName'
        },
        {
            title: '状态',
            key: 'status'
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
                              console.log(params.row.orgId)
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
                                this.choose_index = params.index;
                                this.choose_storeID = params.row.storeId;
                                this.deleteMol = true;
                            }
                        }
                    }, '删除')
                ]);
            }
        }
      ],
      storeData:[],
      page:1,
      size:10,
      total:10,
      deleteMol:false,
      delete_loading:false,
      choose_index:-1,
      choose_storeID:-1,
      formItem: {
        storeId:'',
        storeName: '',
        contactName: '',
        telephone: '',
        address: '',
        storeNo: '',
        status :'',
        token:this.$store.state.token
      },
      organizaList:[],
      storeStatus:['启用', '废弃', '未开通'],
      formInline: {
        //   orgId:0,
          storeName: '',
          telephone:'',
          contactName:'',
          status:'',
          storeNo:''
      },
    }
  },
  created(){
    this.getStoreList();
    this.getSelectOrganizaList();
  },
  methods: {
    getStoreList(){
      this.$api.post('/org/getStoreList/'+this.page+'/'+this.size, this.formInline, r => {
        console.log(r)
        if(r.status == 'SUCCESS'){
          this.storeData = r.data;
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
    del(){
      //let index = parseInt(this.choose_index);//当前选择的第几个数据
      //let id = this.organData[index].storeId;
      let id = this.choose_storeID;
      this.delete_loading = true;
      this.$api.post('/org/delStore/'+id, {}, r => {
        console.log(r)
        this.delete_loading = false;
        this.deleteMol = false;
        if(r.status == 'E030005'){
          this.$Message.info({
              content: r.desc,
              duration: 10
          });
        }else{
          this.$Message.success(r.desc);
        }
      })
    },
    edit(param){
      this.formItem.storeId = param.storeId;
      this.formItem.storeName = param.storeName;
      this.formItem.contactName = param.contactName;
      this.formItem.telephone = param.telephone;
      this.formItem.address = param.address;
      this.formItem.storeNo = param.storeNo;
      this.formItem.status = param.status;
      this.$Modal.confirm({
        render: (h) => {
              return h('Form', [
                h('FormItem',[
                  h('Select',{
                    props: {
                        placeholder: '请选择所属机构',
                        value:param.orgName,
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
                   h('Input', {
                      props: {
                          value: param.storeName,
                          autofocus: true,
                          placeholder: '请输入门店名称'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.storeName = val;
                          }
                      }
                  }),
                ]),
               h('FormItem',[
                   h('Input', {
                      props: {
                          value: param.storeNo,
                          autofocus: true,
                          placeholder: '请输入门店编号'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.storeNo = val;
                          }
                      }
                  }),
                ]),
               h('FormItem',[
                   h('Input', {
                      props: {
                          value: param.telephone,
                          autofocus: true,
                          placeholder: '请输入联系电话'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.telephone = val;
                          }
                      }
                  }),
                ]),
                h('FormItem',[
                   h('Input', {
                      props: {
                          value: param.contactName,
                          autofocus: true,
                          placeholder: '请输入门店负责人'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.contactName = val;
                          }
                      }
                  }),
                ]),
                h('FormItem',[
                  h('Select',{
                    props: {
                        placeholder: '请选择状态',
                        value: param.status,
                      },
                    on: {  
                        'on-change':(event) => {  
                            this.formItem.status = event; 
                        }  
                    },
                  },
                    this.storeStatus.map((item)=>{
                      return h('Option',{
                        props:{
                          value:item,
                          label:item
                        }
                      })
                  }))
                ]),
                h('FormItem',[
                   h('Input', {
                      props: {
                          value: param.address,
                          autofocus: true,
                          type:'textarea',
                          placeholder: '请输入地址'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.address = val;
                          }
                      }
                  }),
                ]),
            ]);
          },
        onOk:()=>{
          let id = this.formItem.storeId;
          let token = this.formItem.token;
          this.$api.post('/org/editStore/'+id, this.formItem, r => {
            console.log(r)
            if(r.status == 'SUCCESS'){
              this.$Message.success(r.desc);
              this.getStoreList();
            }
          })
        }
      })
    },
    addStore(){
      this.formItem.storeId = '';
      this.formItem.storeName = '';
      this.formItem.contactName = '';
      this.formItem.telephone = '';
      this.formItem.address = '';
      this.formItem.storeNo = '';
      this.formItem.status = '';
      this.$Modal.confirm({
        render: (h) => {
              return h('Form', [
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
                   h('Input', {
                      props: {
                          value: '',
                          autofocus: true,
                          placeholder: '请输入门店名称'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.storeName = val;
                          }
                      }
                  }),
                ]),
               h('FormItem',[
                   h('Input', {
                      props: {
                          value: '',
                          autofocus: true,
                          placeholder: '请输入门店编号'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.storeNo = val;
                          }
                      }
                  }),
                ]),
               h('FormItem',[
                   h('Input', {
                      props: {
                          value: '',
                          autofocus: true,
                          placeholder: '请输入联系电话'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.telephone = val;
                          }
                      }
                  }),
                ]),
                h('FormItem',[
                   h('Input', {
                      props: {
                          value: '',
                          autofocus: true,
                          placeholder: '请输入门店负责人'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.contactName = val;
                          }
                      }
                  }),
                ]),
                h('FormItem',[
                  h('Select',{
                    props: {
                        placeholder: '请选择状态',
                      },
                    on: {  
                        'on-change':(event) => {  
                            this.formItem.status = event; 
                        }  
                    },
                  },
                    this.storeStatus.map((item)=>{
                      return h('Option',{
                        props:{
                          value:item,
                          label:item
                        }
                      })
                  }))
                ]),
                h('FormItem',[
                   h('Input', {
                      props: {
                          value: '',
                          autofocus: true,
                          type:'textarea',
                          placeholder: '请输入地址'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.address = val;
                          }
                      }
                  }),
                ]),
            ]);
          },
        onOk:()=>{
          let token = this.formItem.token;
          console.log(this.formItem);
          this.$api.post('/org/addStore/'+token, this.formItem, r => {
            console.log(r)
            if(r.code == '200'){
              this.$Message.success(r.desc);
              this.getStoreList();
            }
          })
        }
      })
    },
    changePage(index){
      this.page = index;
      this.getStoreList();
    },
    handleSubmit(name) {
      this.getStoreList();
    }
  }
}
</script>