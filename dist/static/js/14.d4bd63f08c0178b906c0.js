webpackJsonp([14],{"+TpU":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={data:function(){var t=this;return{orderList:[{title:"还款详情",key:"show_more",align:"center",render:function(e,o){return e("Button",{props:{type:"text",size:"small"},on:{click:function(){var e={no:o.row.tradeId};t.$router.push({name:"proceeds",params:e})}}},"分期详情")}},{title:"真实姓名",key:"realname"},{title:"身份证号",key:"idnum"},{title:"分期次数",key:"cycleCnt"},{title:"产品类型",key:"ztProductEnum"},{title:"产品编码",key:"productCd"},{title:"还款方式",key:"repayMethod"},{title:"交易流水号",key:"tradeFlowNo"},{title:"对外流水号",key:"outTradeFlowNo"},{title:"申请单号",key:"appNO"},{title:"合同",key:"flowStage"},{title:"合同编号",key:"contractNo"},{title:"交易状态",key:"tradeStatus"},{title:"申请金额",key:"requestAmount"},{title:"实得金额",key:"approvalAmount"}],orderData:[],page:1,size:10,token:this.$store.state.token,total:10,formInline:{flowStage:null,idnum:"",outTradeFlowNo:"",phone:"",realname:"",tradeFlowNo:"",tradeStatus:null,ztProductEnum:null},flowStageList:["预申请","审批","合同","借据"],tradeStatusList:["初始","正在处理","通过","拒绝","放弃","驳回待补件","合同签署成功","合同签署失败","打款中","打款成功","打款失败","商户结算","还款中","正常完结","提前结清"],ztProductEnumList:["消费贷","现金贷"]}},created:function(){this.getLoanList()},methods:{getLoanList:function(){var t=this;this.$api.post("/trade/queryTradeBack/"+this.token+"/"+this.page+"/"+this.size,this.formInline,function(e){console.log(e),"SUCCESS"==e.status&&(t.orderData=e.data,t.total=e.total_count)})},changePage:function(t){this.page=t,this.getLoanList()},handleSubmit:function(t){this.getLoanList()}}},a={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{style:{minWidth:"750px",overflow:"scroll"}},[o("layout",[o("Form",{ref:"formInline",staticStyle:{float:"right"},attrs:{model:t.formInline,inline:"","label-width":80}},[o("Row",[o("Col",{attrs:{span:"8"}},[o("FormItem",{attrs:{prop:"realname",label:"真实姓名"}},[o("Input",{attrs:{type:"text",placeholder:"真实姓名"},model:{value:t.formInline.realname,callback:function(e){t.$set(t.formInline,"realname",e)},expression:"formInline.realname"}},[o("Icon",{attrs:{slot:"prepend",type:"ios-person"},slot:"prepend"})],1)],1)],1),t._v(" "),o("Col",{attrs:{span:"8"}},[o("FormItem",{attrs:{prop:"idnum",label:"身份证号"}},[o("Input",{attrs:{type:"text",placeholder:"身份证号"},model:{value:t.formInline.idnum,callback:function(e){t.$set(t.formInline,"idnum",e)},expression:"formInline.idnum"}},[o("Icon",{attrs:{slot:"prepend",type:"android-person-add"},slot:"prepend"})],1)],1)],1),t._v(" "),o("Col",{attrs:{span:"8"}},[o("FormItem",{attrs:{prop:"phone",label:"手机号"}},[o("Input",{attrs:{type:"text",placeholder:"手机号"},model:{value:t.formInline.phone,callback:function(e){t.$set(t.formInline,"phone",e)},expression:"formInline.phone"}},[o("Icon",{attrs:{slot:"prepend",type:"iphone"},slot:"prepend"})],1)],1)],1)],1),t._v(" "),o("Row",[o("Col",{attrs:{span:"8"}},[o("FormItem",{attrs:{prop:"outTradeFlowNo",label:"对外流水号"}},[o("Input",{attrs:{type:"text",placeholder:"对外流水号"},model:{value:t.formInline.outTradeFlowNo,callback:function(e){t.$set(t.formInline,"outTradeFlowNo",e)},expression:"formInline.outTradeFlowNo"}},[o("Icon",{attrs:{slot:"prepend",type:"ios-compose-outline"},slot:"prepend"})],1)],1)],1),t._v(" "),o("Col",{attrs:{span:"8"}},[o("FormItem",{attrs:{prop:"tradeFlowNo",label:"交易流水号"}},[o("Input",{attrs:{type:"text",placeholder:"交易流水号"},model:{value:t.formInline.tradeFlowNo,callback:function(e){t.$set(t.formInline,"tradeFlowNo",e)},expression:"formInline.tradeFlowNo"}},[o("Icon",{attrs:{slot:"prepend",type:"ios-compose-outline"},slot:"prepend"})],1)],1)],1),t._v(" "),o("Col",{attrs:{span:"8"}},[o("FormItem",{attrs:{label:"合同"}},[o("Select",{staticStyle:{width:"165px"},attrs:{size:"large"},model:{value:t.formInline.flowStage,callback:function(e){t.$set(t.formInline,"flowStage",e)},expression:"formInline.flowStage"}},t._l(t.flowStageList,function(e){return o("Option",{key:e.id,attrs:{value:e}},[t._v(t._s(e))])}))],1)],1)],1),t._v(" "),o("Row",[o("Col",{attrs:{span:"8"}},[o("FormItem",{attrs:{label:"交易状态"}},[o("Select",{staticStyle:{width:"165px"},attrs:{size:"large"},model:{value:t.formInline.tradeStatus,callback:function(e){t.$set(t.formInline,"tradeStatus",e)},expression:"formInline.tradeStatus"}},t._l(t.tradeStatusList,function(e){return o("Option",{key:e.id,attrs:{value:e}},[t._v(t._s(e))])}))],1)],1),t._v(" "),o("Col",{attrs:{span:"8"}},[o("FormItem",{attrs:{label:"产品类型"}},[o("Select",{staticStyle:{width:"165px"},attrs:{size:"large"},model:{value:t.formInline.ztProductEnum,callback:function(e){t.$set(t.formInline,"ztProductEnum",e)},expression:"formInline.ztProductEnum"}},t._l(t.ztProductEnumList,function(e){return o("Option",{key:e.id,attrs:{value:e}},[t._v(t._s(e))])}))],1)],1),t._v(" "),o("Col",{attrs:{span:"8"}},[o("FormItem",[o("Button",{attrs:{type:"primary",icon:"ios-search",size:"large"},on:{click:function(e){t.handleSubmit("formInline")}}},[t._v("查询")])],1)],1)],1)],1)],1),t._v(" "),o("Row",[o("Col",{attrs:{span:"24"}},[o("Card",[o("p",{attrs:{slot:"title"},slot:"title"},[o("Icon",{attrs:{type:"ios-list"}}),t._v("\n                      贷款记录\n                  ")],1),t._v(" "),o("Row",{staticClass:"advanced-router",attrs:{type:"flex",justify:"center",align:"middle"}},[o("Table",{attrs:{height:"500",columns:t.orderList,data:t.orderData}})],1),t._v(" "),o("Page",{staticClass:"pager",attrs:{total:t.total},on:{"on-change":t.changePage}})],1)],1)],1)],1)},staticRenderFns:[]};var l=o("Z0/y")(n,a,!1,function(t){o("W+oK")},"data-v-03e8077a",null);e.default=l.exports},"W+oK":function(t,e){}});
//# sourceMappingURL=14.d4bd63f08c0178b906c0.js.map