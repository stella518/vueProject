webpackJsonp([15],{DHgL:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={data:function(){var t=this;return{fullHeight:document.documentElement.clientHeight-73,contractList:[{title:"合同编号",key:"annexCode"},{title:"合同类型",key:"annexTypeEnum"},{title:"文件",key:"url",width:150,align:"center",render:function(e,n){return e("div",[e("Button",{props:{type:"primary",size:"small",row:n.row},style:{marginRight:"5px"},on:{click:function(){t.seeContract(n.row)}}},"查看")])}}],contractData:[],token:this.$store.state.token,choose_index:-1}},created:function(){this.getContractList()},methods:{getContractList:function(){var t=this;this.$api.post("/contract/getAllContract/"+this.token,{},function(e){console.log(e),"SUCCESS"==e.status&&(t.contractData=e.data)})},handleSuccess:function(t,e){this.getContractList()},handleFormatError:function(t){this.$Notice.warning({title:"文件格式有误",desc:"您的文件 "+t.name+" 格式有误， 请上传PDF文件"})},handleMaxSize:function(t){this.$Notice.warning({title:"上传文件过大",desc:"文件  "+t.name+"过大, 不能超过2M."})},seeContract:function(t){window.open(t.url)}}},a={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("layout",[n("Upload",t._b({attrs:{multiple:"",type:"drag",format:["pdf"],"on-success":t.handleSuccess,"on-format-error":t.handleFormatError,"on-exceeded-size":t.handleMaxSize}},"Upload",{action:"/api/contract/uploadContract/"+t.token},!1),[n("div",{staticStyle:{padding:"20px 0"}},[n("Icon",{staticStyle:{color:"#3399ff"},attrs:{type:"ios-cloud-upload",size:"52"}}),t._v(" "),n("p",[t._v("请点击或拖拽上传文件")])],1)]),t._v(" "),n("Table",{attrs:{height:"600",columns:t.contractList,data:t.contractData}})],1)},staticRenderFns:[]},c=n("Z0/y")(o,a,!1,null,null,null);e.default=c.exports}});
//# sourceMappingURL=15.44f7f43cc99bc59f2941.js.map