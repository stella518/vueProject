webpackJsonp([7],{X6d5:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={data:function(){return{formInline:{loginName:"",password:""},ruleInline:{user:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{type:"string",min:6,message:"The password length cannot be less than 6 bits",trigger:"blur"}]},userData:{}}},created:function(){window.addEventListener("resize",this.handleResize)},methods:{handleSubmit:function(e){var t=this;this.$refs[e].validate(function(e){e?t.login():t.$Message.error("Fail!")})},login:function(){var e=this;this.formInline.loginName,this.formInline.password;this.$api.post("/user/back/login?loginName="+this.formInline.loginName+"&password="+this.formInline.password,null,function(t){console.log(t),"SUCCESS"==t.status&&(e.userData=t.data,e.$store.commit("SET_TOKEN",t.data.token),e.$router.push({path:"/"}))})}}},r={render:function(){var e=this.$createElement;return(this._self._c||e)("Alert",{attrs:{type:"success","show-icon":"",closable:""}},[this._v("\n    登录成功\n    ")])},staticRenderFns:[]};var i=n("Z0/y")(s,r,!1,function(e){n("bZhR")},"data-v-461445cc",null);t.default=i.exports},bZhR:function(e,t){}});
//# sourceMappingURL=7.0c63ae878cdfb278e0d5.js.map