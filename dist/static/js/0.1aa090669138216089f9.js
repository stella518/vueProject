webpackJsonp([0],{IBng:function(t,e){},"Rw+C":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={props:{row:Object}},n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("Row",{staticClass:"expand-row"},[e("Col",{attrs:{span:"12"}},[e("span",{staticClass:"expand-key"},[this._v("地址: ")]),this._v(" "),e("span",{staticClass:"expand-value"},[this._v(this._s(this.row.address))])])],1)],1)},staticRenderFns:[]};var r=o("Z0/y")(s,n,!1,function(t){o("ZCV+")},"data-v-760a5d96",null).exports,a={data:function(){var t=this;return{storeList:[{type:"expand",width:50,render:function(t,e){return t(r,{props:{row:e.row}})}},{title:"门店名称",key:"storeName"},{title:"门店编号",key:"storeNo"},{title:"联系电话",key:"telephone"},{title:"门店负责人",key:"contactName"},{title:"状态",key:"status"},{title:"操作",key:"action",width:150,align:"center",render:function(e,o){return e("div",[e("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){console.log(o.row.orgId),t.edit(o.row)}}},"编辑"),e("Button",{props:{type:"error",size:"small"},on:{click:function(){t.choose_index=o.index,t.choose_storeID=o.row.storeId,t.deleteMol=!0}}},"删除")])}}],storeData:[],page:1,size:10,total:10,deleteMol:!1,delete_loading:!1,choose_index:-1,choose_storeID:-1,formItem:{storeId:"",storeName:"",contactName:"",telephone:"",address:"",storeNo:"",status:"",token:this.$store.state.token},organizaList:[],storeStatus:["启用","废弃","未开通"],formInline:{storeName:"",telephone:"",contactName:"",status:"",storeNo:""}}},created:function(){this.getStoreList(),this.getSelectOrganizaList()},methods:{getStoreList:function(){var t=this;this.$api.post("/org/getStoreList/"+this.page+"/"+this.size,this.formInline,function(e){console.log(e),"SUCCESS"==e.status&&(t.storeData=e.data,t.total=e.total_count)})},getSelectOrganizaList:function(){var t=this;this.$api.post("/org/getSelectOrganizaList/",{},function(e){console.log(e),"SUCCESS"==e.status&&(t.organizaList=e.data)})},del:function(){var t=this,e=this.choose_storeID;this.delete_loading=!0,this.$api.post("/org/delStore/"+e,{},function(e){console.log(e),t.delete_loading=!1,t.deleteMol=!1,"E030005"==e.status?t.$Message.info({content:e.desc,duration:10}):t.$Message.success(e.desc)})},edit:function(t){var e=this;this.formItem.storeId=t.storeId,this.formItem.storeName=t.storeName,this.formItem.contactName=t.contactName,this.formItem.telephone=t.telephone,this.formItem.address=t.address,this.formItem.storeNo=t.storeNo,this.formItem.status=t.status,this.$Modal.confirm({render:function(o){return o("Form",[o("FormItem",[o("Select",{props:{placeholder:"请选择所属机构",value:t.orgName},on:{"on-change":function(t){e.formItem.orgId=t}}},e.organizaList.map(function(t){return o("Option",{props:{value:t.orgId,label:t.name}})}))]),o("FormItem",[o("Input",{props:{value:t.storeName,autofocus:!0,placeholder:"请输入门店名称"},on:{input:function(t){e.formItem.storeName=t}}})]),o("FormItem",[o("Input",{props:{value:t.storeNo,autofocus:!0,placeholder:"请输入门店编号"},on:{input:function(t){e.formItem.storeNo=t}}})]),o("FormItem",[o("Input",{props:{value:t.telephone,autofocus:!0,placeholder:"请输入联系电话"},on:{input:function(t){e.formItem.telephone=t}}})]),o("FormItem",[o("Input",{props:{value:t.contactName,autofocus:!0,placeholder:"请输入门店负责人"},on:{input:function(t){e.formItem.contactName=t}}})]),o("FormItem",[o("Select",{props:{placeholder:"请选择状态",value:t.status},on:{"on-change":function(t){e.formItem.status=t}}},e.storeStatus.map(function(t){return o("Option",{props:{value:t,label:t}})}))]),o("FormItem",[o("Input",{props:{value:t.address,autofocus:!0,type:"textarea",placeholder:"请输入地址"},on:{input:function(t){e.formItem.address=t}}})])])},onOk:function(){var t=e.formItem.storeId;e.formItem.token;e.$api.post("/org/editStore/"+t,e.formItem,function(t){console.log(t),"SUCCESS"==t.status&&(e.$Message.success(t.desc),e.getStoreList())})}})},addStore:function(){var t=this;this.formItem.storeId="",this.formItem.storeName="",this.formItem.contactName="",this.formItem.telephone="",this.formItem.address="",this.formItem.storeNo="",this.formItem.status="",this.$Modal.confirm({render:function(e){return e("Form",[e("FormItem",[e("Select",{props:{placeholder:"请选择所属机构"},on:{"on-change":function(e){t.formItem.orgId=e}}},t.organizaList.map(function(t){return e("Option",{props:{value:t.orgId,label:t.name}})}))]),e("FormItem",[e("Input",{props:{value:"",autofocus:!0,placeholder:"请输入门店名称"},on:{input:function(e){t.formItem.storeName=e}}})]),e("FormItem",[e("Input",{props:{value:"",autofocus:!0,placeholder:"请输入门店编号"},on:{input:function(e){t.formItem.storeNo=e}}})]),e("FormItem",[e("Input",{props:{value:"",autofocus:!0,placeholder:"请输入联系电话"},on:{input:function(e){t.formItem.telephone=e}}})]),e("FormItem",[e("Input",{props:{value:"",autofocus:!0,placeholder:"请输入门店负责人"},on:{input:function(e){t.formItem.contactName=e}}})]),e("FormItem",[e("Select",{props:{placeholder:"请选择状态"},on:{"on-change":function(e){t.formItem.status=e}}},t.storeStatus.map(function(t){return e("Option",{props:{value:t,label:t}})}))]),e("FormItem",[e("Input",{props:{value:"",autofocus:!0,type:"textarea",placeholder:"请输入地址"},on:{input:function(e){t.formItem.address=e}}})])])},onOk:function(){var e=t.formItem.token;console.log(t.formItem),t.$api.post("/org/addStore/"+e,t.formItem,function(e){console.log(e),"200"==e.code&&(t.$Message.success(e.desc),t.getStoreList())})}})},changePage:function(t){this.page=t,this.getStoreList()},handleSubmit:function(t){this.getStoreList()}}},l={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{style:{minWidth:"600px",overflow:"scroll"}},[o("layout",[o("Form",{ref:"formInline",staticStyle:{float:"right"},attrs:{model:t.formInline,inline:"","label-width":80}},[o("Row",[o("Col",{attrs:{span:"6",sm:6,md:6,lg:6,xs:12}},[o("FormItem",{attrs:{prop:"storeName",label:"门店名称"}},[o("Input",{attrs:{type:"text",placeholder:"门店名称"},model:{value:t.formInline.storeName,callback:function(e){t.$set(t.formInline,"storeName",e)},expression:"formInline.storeName"}},[o("Icon",{attrs:{slot:"prepend",type:"android-home"},slot:"prepend"})],1)],1)],1),t._v(" "),o("Col",{attrs:{span:"6",sm:6,md:6,lg:6,xs:12}},[o("FormItem",{attrs:{prop:"storeNo",label:"门店编号"}},[o("Input",{attrs:{type:"text",placeholder:"门店编号"},model:{value:t.formInline.storeNo,callback:function(e){t.$set(t.formInline,"storeNo",e)},expression:"formInline.storeNo"}},[o("Icon",{attrs:{slot:"prepend",type:"grid"},slot:"prepend"})],1)],1)],1),t._v(" "),o("Col",{attrs:{span:"6",sm:6,md:6,lg:6,xs:12}},[o("FormItem",{attrs:{prop:"contactName",label:"门店负责人"}},[o("Input",{attrs:{type:"text",placeholder:"门店负责人"},model:{value:t.formInline.contactName,callback:function(e){t.$set(t.formInline,"contactName",e)},expression:"formInline.contactName"}},[o("Icon",{attrs:{slot:"prepend",type:"ios-person"},slot:"prepend"})],1)],1)],1),t._v(" "),o("Col",{attrs:{span:"6",sm:6,md:6,lg:6,xs:0}},[o("div",{staticClass:"control"},[o("Button",{staticClass:"addBtn",attrs:{icon:"plus-round",type:"primary"},on:{click:function(e){t.addStore()}}},[t._v("新增")])],1)])],1),t._v(" "),o("Row",[o("Col",{attrs:{span:"6",sm:6,md:6,lg:6,xs:12}},[o("FormItem",{attrs:{prop:"telephone",label:"联系电话"}},[o("Input",{attrs:{type:"text",placeholder:"联系电话"},model:{value:t.formInline.telephone,callback:function(e){t.$set(t.formInline,"telephone",e)},expression:"formInline.telephone"}},[o("Icon",{attrs:{slot:"prepend",type:"iphone"},slot:"prepend"})],1)],1)],1),t._v(" "),o("Col",{attrs:{span:"6",sm:6,md:6,lg:6,xs:12}},[o("FormItem",{attrs:{label:"状态"}},[o("Select",{staticStyle:{width:"165px"},attrs:{size:"large"},model:{value:t.formInline.status,callback:function(e){t.$set(t.formInline,"status",e)},expression:"formInline.status"}},t._l(t.storeStatus,function(e){return o("Option",{key:e.id,attrs:{value:e}},[t._v(t._s(e))])}))],1)],1),t._v(" "),o("Col",{attrs:{sm:0,md:0,lg:0,xs:4}},[o("Button",{staticClass:"addBtn",attrs:{icon:"plus-round",type:"primary",size:"large"},on:{click:function(e){t.addStore()}}},[t._v("新增")])],1),t._v(" "),o("Col",{staticClass:"search",attrs:{span:"12",sm:12,md:12,lg:12,xs:4}},[o("FormItem",[o("Button",{staticClass:"searchBtn",attrs:{type:"primary",icon:"ios-search",size:"large"},on:{click:function(e){t.handleSubmit("formInline")}}},[t._v("查询")])],1)],1)],1)],1),t._v(" "),o("Row",[o("Col",{attrs:{span:"24"}},[o("Card",[o("p",{attrs:{slot:"title"},slot:"title"},[o("Icon",{attrs:{type:"ios-list"}}),t._v("\n                          门店\n                      ")],1),t._v(" "),o("Row",{staticClass:"advanced-router",attrs:{type:"flex",justify:"center",align:"middle"}},[o("Table",{attrs:{height:"500",columns:t.storeList,data:t.storeData}})],1),t._v(" "),o("Page",{staticClass:"pager",attrs:{total:t.total},on:{"on-change":t.changePage}}),t._v(" "),o("modal",{attrs:{width:"360"},model:{value:t.deleteMol,callback:function(e){t.deleteMol=e},expression:"deleteMol"}},[o("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[o("icon",{attrs:{type:"information-circled"}}),t._v(" "),o("span",[t._v("确认删除")])],1),t._v(" "),o("div",{staticStyle:{"text-align":"center"}},[o("p",[t._v("您是否确定删除此条记录")])]),t._v(" "),o("div",{attrs:{slot:"footer"},slot:"footer"},[o("i-button",{attrs:{type:"error",size:"large",long:"",loading:t.delete_loading},on:{click:t.del}},[t._v("删除")])],1)])],1)],1)],1)],1)],1)},staticRenderFns:[]};var i=o("Z0/y")(a,l,!1,function(t){o("IBng")},"data-v-79c54d52",null);e.default=i.exports},"ZCV+":function(t,e){}});
//# sourceMappingURL=0.1aa090669138216089f9.js.map