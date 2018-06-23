<template>
    <Alert type="success" show-icon closable>
        登录成功
        <!-- <span slot="desc">Content of prompt. Content of prompt. Content of prompt. Content of prompt. </span> -->
    </Alert>
</template>
<style scoped>
 @import "home.css";
  .pager{
    text-align: right;
    background-color: #fff;
    padding-top:20px;
  }
</style>
<script type="text/babel">
export default{
    data(){
        return {
            formInline: {
                loginName: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                ]
            },
            userData:{}
        }
    },
    created: function () {
        console.log(this.$router);
  }, 
  methods: {
  // whenever the document is resized, re-set the 'fullHeight' variable
    handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.login()
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        login(){
          let param = {
            loginName:this.formInline.loginName,
            password:this.formInline.password
          }
          this.$api.post('/user/back/login?loginName='+this.formInline.loginName+'&password='+this.formInline.password,null, r => {
            console.log(r)
            if(r.status == 'SUCCESS'){
              this.userData = r.data;
                  this.$store.commit('SET_TOKEN',r.data.token);
                  this.$router.push({path: '/'}); 
            }
        })
        }
  }
  }
</script>