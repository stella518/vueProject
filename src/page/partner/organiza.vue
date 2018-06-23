<template>
    <div :style="{minWidth:'600px',overflow:'scroll'}">
        <layout>
            <Form ref="formInline" :model="formInline" inline :label-width="80" style="float:right;">
                <Row>
                    <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
                    <FormItem prop="name"  label="机构名称">
                            <Input type="text" v-model="formInline.name" placeholder="机构名称">
                                <Icon type="android-home" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
                    <FormItem prop="principal" label="机构负责人">
                        <Input type="text" v-model="formInline.principal" placeholder="机构负责人">
                            <Icon type="ios-person" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    </Col>
                    <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
                    <FormItem prop="phone" label="手机号">
                        <Input type="text" v-model="formInline.phone" placeholder="手机号">
                            <Icon type="iphone"slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    </Col>
                    <Col span="6" :sm="6" :md="6" :lg="6" :xs="0">
                        <Button icon="plus-round" type="primary" class="addBtn" @click="addOrg()">新增</Button>
                    </Col>
                    <Col :sm="0" :md="0" :lg="0" :xs="12">
                        <FormItem label="状态" >
                            <Select v-model="formInline.status" size="large" style="width:165px">
                                <Option :value="item" v-for="item of organStatus" :key="item.id">{{item}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
                    <FormItem prop="orgNo" label="机构编号">
                        <Input type="text" v-model="formInline.orgNo" placeholder="机构编号">
                            <Icon type="grid" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    </Col>
                    <Col span="6" :sm="6" :md="6" :lg="6" :xs="12">
                    <FormItem label="类型" >
                        <Select v-model="formInline.type" size="large" style="width:165px">
                            <Option :value="item" v-for="item of organType" :key="item.id">{{item}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="6" :sm="6" :md="6" :lg="6" :xs="0">
                    <FormItem label="状态" >
                        <Select v-model="formInline.status" size="large" style="width:165px">
                            <Option :value="item" v-for="item of organStatus" :key="item.id">{{item}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col :sm="0" :md="0" :lg="0" :xs="12">
                         <Button icon="plus-round" type="primary" class="addBtn" @click="addOrg()">新增</Button>
                    </Col>
                    <Col span="6" :sm="6" :md="6" :lg="6" :xs="12" class="search">
                    <FormItem >
                        <Button type="primary"  icon="ios-search" class="searchBtn" @click="handleSubmit('formInline')" size="large">查询</Button>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
        </layout>
        <Row>
            <Col span="24">
                <Card >
                    <p slot="title">
                        <Icon type="ios-list"></Icon>
                        机构
                    </p>
                    <Row type="flex" justify="center" align="middle" class="advanced-router">
                        <Table height="500" :columns="organList" :data="organData" ref="selection"></Table>
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
  .addBtn{
    width: 100px;
    margin:10px 0;
    float: right;
  }
  @media only screen and (min-width: 320px) and (max-width: 767px) {
      .addBtn{
        text-align: center;
      }
      .searchBtn{
        text-align: center;
        width: 100px;
        margin:10px 0;
        float: right;
        float: left;
      }
  }
  .search{
      text-align: right;
  }
</style>
<script type="text/babel">
import expandRow from './table-expand.vue';
export default {
  components: { expandRow },
  data () {
    return {
      organList:[
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
            title: '机构名称',
            key: 'name',
            render: (h, params) => {
                return h('div', [
                    h('Icon', {
                        props: {
                            type: 'person'
                        }
                    }),
                    h('strong', params.row.name)
                ]);
            }
        },
        {
            title: '机构编号',
            key: 'orgNo'
        },
        {
            title: '联系电话',
            key: 'phone'
        },
        {
            title: '机构负责人',
            key: 'principal'
        },
        {
            title: '状态',
            key: 'status'
        },
        {
            title: '类型',
            key: 'type'
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
                            size: 'small',
                            row:params.row,
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
                                this.deleteMol = true;
                            }
                        }
                    }, '删除')
                ]);
            }
        }
      ],
      organData:[],
      page:1,
      size:10,
      total:10,
      deleteMol:false,
      delete_loading:false,
      choose_index:-1,
      organStatus:['启用', '废弃', '未开通'],
      organType:['资金方', '合作结构', '郑投'],
      formItem: {
        id:'',
        name: '',
        principal: '',
        phone: '',
        descript: '',
        address: '',
        orgNo: '',
        status:'',
        type:'',
        token:this.$store.state.token
      },
       formInline: {
          name:'',
          principal: '',
          phone:'',
          type:'',
          status:'',
          orgNo:''
      },
    }
  },
  created(){
  	this.getOrganizaList();
  },
  methods: {
    getOrganizaList(){
      this.$api.post('/org/getOrganizaList/'+this.page+'/'+this.size,  this.formInline, r => {
        console.log(r)
        if(r.status == 'SUCCESS'){
          this.organData = r.data;
          this.total = r.total_count;
        }
      })
    },
    del(){
      let index = parseInt(this.choose_index);//当前选择的第几个数据
      let id = this.organData[index].orgId;
      this.delete_loading = true;
      this.$api.post('/org/delOrganiza/'+id, {}, r => {
        console.log(r)
        this.delete_loading = false;
        this.deleteMol = false;
        if(r.status == 'E030005'){
          this.$Message.info({
              content: r.desc,
              duration: 10
          });
        }
      })
    },
    edit(param){
      this.formItem.id = param.orgId;
      this.formItem.name = param.name;
      this.formItem.principal = param.principal;
      this.formItem.phone = param.phone;
      this.formItem.descript = param.descript;
      this.formItem.address = param.address;
      this.formItem.orgNo = param.orgNo;
      this.formItem.status  = param.status;
      this.formItem.type = param.type;
      this.$Modal.confirm({
        render: (h) => {
              return h('Form', [
                h('FormItem',[
                   h('Input', {
                      props: {
                          value: param.name,
                          autofocus: true,
                          placeholder: '请输入机构名称',
                          fixed: 'left'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.name = val;
                          }
                      }
                  }),
                ]),
               h('FormItem',[
                   h('Input', {
                      props: {
                          value: param.orgNo,
                          autofocus: true,
                          placeholder: '请输入机构编号'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.orgNo = val;
                          }
                      }
                  }),
                ]),
               h('FormItem',[
                   h('Input', {
                      props: {
                          value: param.phone,
                          autofocus: true,
                          placeholder: '请输入联系电话'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.phone = val;
                          }
                      }
                  }),
                ]),
                h('FormItem',[
                   h('Input', {
                      props: {
                          value: param.principal,
                          autofocus: true,
                          placeholder: '请输入机构负责人'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.principal = val;
                          }
                      }
                  }),
                ]),
                h('FormItem',[
                  h('Select',{
                    props: {
                        placeholder: '请选择状态',
                        value: param.status
                      },
                    on: {  
                        'on-change':(event) => {  
                            this.formItem.status = event; 
                        }  
                    },
                  },
                    this.organStatus.map((item)=>{
                      return h('Option',{
                        props:{
                          value:item,
                          label:item
                        }
                      })
                  }))
                ]),
                h('FormItem',[
                  h('Select',{
                    props: {
                        placeholder: '请选择类型',
                        value: param.type
                      },
                    on: {  
                        'on-change':(event) => {  
                            this.formItem.type = event; 
                        }  
                    },
                  },
                    this.organType.map((item)=>{
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
                h('FormItem',[
                   h('Input', {
                      props: {
                          value: param.descript,
                          autofocus: true,
                          type:'textarea',
                          placeholder: '请输入简述'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.descript = val;
                          }
                      }
                  }),
                ]),
            ]);
          },
        onOk:()=>{
          let id = this.formItem.id;
          this.$api.post('/org/editOrganiza/'+id, this.formItem, r => {
            console.log(r)
            if(r.status == 'SUCCESS'){
              this.$Message.success(r.desc);
              this.getOrganizaList();
            }
          })
        }
      })
    },
    addOrg(){
      this.formItem.id = '';
      this.formItem.name = '';
      this.formItem.principal = '';
      this.formItem.phone = '';
      this.formItem.descript = '';
      this.formItem.address = '';
      this.formItem.orgNo = '';
      this.formItem.status  = '';
      this.formItem.type = '';
      this.$Modal.confirm({
        render: (h) => {
              return h('Form', [
                h('FormItem',[
                   h('Input', {
                      props: {
                          value: '',
                          autofocus: true,
                          placeholder: '请输入机构名称'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.name = val;
                          }
                      }
                  }),
                ]),
               h('FormItem',[
                   h('Input', {
                      props: {
                          value: '',
                          autofocus: true,
                          placeholder: '请输入机构编号'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.orgNo = val;
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
                              this.formItem.phone = val;
                          }
                      }
                  }),
                ]),
                h('FormItem',[
                   h('Input', {
                      props: {
                          value: '',
                          autofocus: true,
                          placeholder: '请输入机构负责人'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.principal = val;
                          }
                      }
                  }),
                ]),
                h('FormItem',[
                  h('Select',{
                    props: {
                        placeholder: '请选择状态'
                      },
                    on: {  
                        'on-change':(event) => {  
                            this.formItem.status = event; 
                        }  
                    },
                  },
                    this.organStatus.map((item)=>{
                      return h('Option',{
                        props:{
                          value:item,
                          label:item
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
                            this.formItem.type = event; 
                        }  
                    },
                  },
                    this.organType.map((item)=>{
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
                h('FormItem',[
                   h('Input', {
                      props: {
                          value: '',
                          autofocus: true,
                          type:'textarea',
                          placeholder: '请输入简述'
                      },
                      on: {
                          input: (val) => {
                              this.formItem.descript = val;
                          }
                      }
                  }),
                ]),

            ]);
          },
        onOk:()=>{
          let token = this.formItem.token;
          console.log(this.formItem);
          this.$api.post('/org/addOrganiza/'+token, this.formItem, r => {
            console.log(r)
            if(r.status == 'SUCCESS'){
              this.$Message.success(r.desc);
              this.getOrganizaList();
            }
          })
        }
      })
    },
    changePage(index){
      this.page = index;
      this.getOrganizaList();
    },
    handleSubmit(name) {
      this.getOrganizaList();
    }
  }
}
</script>