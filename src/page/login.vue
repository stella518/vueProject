<template>
    <div class="base">
        <h1>消费金融管理平台</h1>
        <div class="main_center">
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <FormItem prop="loginName">
                    <Input type="text" v-model="formInline.loginName" placeholder="用户名" :autofocus="true" size="large">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="密码" size="large">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formInline')" long>登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
	
</template>
<style scoped>
  @import "login.css";
</style>
<script type="text/babel">
  import Cookies from 'js-cookie';
  import menuUtil from '@/libs/menuUtil'
  import { mapActions } from 'vuex'
  import {router} from '../main'
 
  var appRouter = [];
  export default{
  	data(){
        return {
            formInline: {
                loginName: '',
                password: ''
            },
            ruleInline: {
                loginName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            userData:{}
        }
    },
    created: function () {
	}, 
	methods: {
         ...mapActions([
            'appendMenu'
        ]),
		handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    Cookies.set('user', this.formInline.loginName);
                    Cookies.set('password', this.formInline.password);
                    this.login()
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        login(){
            this.handleSpinCustom();
        	let param = {
        		loginName:this.formInline.loginName,
        		password:this.formInline.password
        	}
        	this.$api.get('/user/back/login?loginName='+this.formInline.loginName+'&password='+this.formInline.password,null, r => {
		        console.log(r)
		        if(r.status == 'SUCCESS'){
                  this.getMenu(r.data.token);
		          this.userData = r.data;
                  this.$store.commit('SET_TOKEN',r.data.token);
                  this.$store.commit('SET_USERDATA',r.data);
                  localStorage.setItem('token',r.data.token)
                  localStorage.setItem('userData',JSON.stringify(r.data));
                  this.$Spin.hide();
                  this.$router.push({
                        name: 'home_index'
                    });
		        }
		    })
        },
        handleSpinCustom () {
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
        },
        getMenu(token){
            this.$api.get('/user/back/queryMenu/'+token, {}, r => {
                console.log(r)
                if(r.status == 'SUCCESS'){
                    let json = JSON.parse(r.data);
                    let localmenu = window.sessionStorage.getItem('userMenu');
                    if (!localmenu) {
                        window.sessionStorage.setItem('userMenu', JSON.stringify(json));
                        let iconList = this.$store.state.iconList;
                        // json.forEach((item) => {
                        //     let menu = Object.assign({}, item)
                        //     let name = menu.name;
                        //     iconList.forEach((iconObj)=>{
                        //         if(iconObj.name == name){
                        //             menu.icon = iconObj.icon;
                        //         }
                        //     })
                        // })
                        menuUtil(appRouter,json,iconList);//生成路由菜单
                        this.appendMenu(appRouter);//更新store中保存的menuList
                        this.initTagsList(appRouter);//初始化store中的tagsList
                        router.options.routes.push(...appRouter);//添加动态路由

                        this.$router.addRoutes(router.options.routes);//动态添加路由
                        console.log(router.options.routes);
                        let stateRouter = [];
                        stateRouter.push(router.options.routes[1]);
                        stateRouter.push(...appRouter);
                        console.log('stateRouter')
                        console.log(stateRouter)
                        this.$store.commit('SET_ROUTES',stateRouter);//更新store中保存的routers
                    }
                    
                }
            })
        },
        initTagsList(appRouter){
            let tagsList = [];
            appRouter.map((item) => {
                if (item.children.length <= 1) {
                    tagsList.push(item.children[0]);
                } else {
                    tagsList.push(...item.children);
                }
            });
            this.$store.commit('SET_TAGSLIST', tagsList);
        }
	}
  }
</script>