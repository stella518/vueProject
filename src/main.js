import Vue from 'vue';
import iView from 'iview';
import { router } from './router/index';
import { routers, otherRouter } from './router/router';
import { sync } from 'vuex-router-sync';
import store from './store';
import api from './api/index.js'
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import Util from './libs/util';
import menuUtil from '@/libs/menuUtil'

Vue.use(iView);

Vue.prototype.$api = api;

Vue.router = router
sync(store, router);

Vue.config.productionTip = false;

let userMenu = window.sessionStorage.getItem('userMenu');
let appRouter = [];
if (window.localStorage.getItem('token') && userMenu) {
    //这里是防止用户手动刷新页面，整个app要重新加载,动态新增的路由，会消失，所以我们重新add一次
    let newMenu = JSON.parse(userMenu);
    if (newMenu && newMenu.length > 0) {
        let iconList = store.state.iconList;
        menuUtil(appRouter, newMenu, iconList); //生成路由菜单
        store.commit('APPEND_MENU', appRouter);
        initTagsList(appRouter); //初始化store中的tagsList

        router.options.routes.push(...appRouter); //添加动态路由
        //router.addRoutes(router.options.routes); //动态添加路由

        let stateRouter = [];
        stateRouter.push(router.options.routes[1]);
        stateRouter.push(...appRouter);
        console.log('stateRouter')
        console.log(stateRouter)
        store.commit('SET_ROUTES', stateRouter); //更新store中保存的routers
    }
}
router.beforeEach((to, from, next) => {
    console.log(to);
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    let token = localStorage.getItem("token");
    if (userMenu && to.name === '/login') {
        //这里不使用router进行跳转，是因为，跳转到登录页面的时候，是需要重新登录，获取数据的，这个时候，会再次向router实例里面add路由规则，
        //而next()跳转过去之后，没有刷新页面，之前的规则还是存在的，但是使用location的话，可以刷新页面，当刷新页面的时候，整个app会重新加载
        //而我们在刷新之前已经把sessionStorage里的user移除了，所以上面的添加路由也不行执行
        window.sessionStorage.removeItem('userMenu')
        this.$store.commit('CLEAR_OPENEDSUBMENU');
        window.location.href = '/'
        return false;
    } else if (!token && !userMenu && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
        next({
            name: 'login'
        });
    } else if (token && to.name === 'login') { // 判断是否已经登录且前往的是登录页
        Util.title();
        next({
            name: 'home_index'
        });
    } else {
        if (appRouter && appRouter.length > 0) {
            const curRouterObj = Util.getRouterObjByName([otherRouter, ...appRouter], to.name);
            if (curRouterObj && curRouterObj.access !== undefined) { // 需要判断权限的路由
                if (curRouterObj.access === parseInt(Cookies.get('access'))) {
                    Util.toDefaultPage([otherRouter, ...appRouter], to.name, router, next); // 如果在地址栏输入的是一级菜单则默认打开其第一个二级菜单的页面
                } else {
                    next({
                        replace: true,
                        name: 'error-403'
                    });
                }
            } else { // 没有配置权限的路由, 直接通过
                Util.toDefaultPage([...routers], to.name, router, next);
            }
        } else {
            next();
        }

    }
});

function initTagsList(appRouter) {
    let tagsList = [];
    appRouter.map((item) => {
        if (item.children.length <= 1) {
            tagsList.push(item.children[0]);
        } else {
            tagsList.push(...item.children);
        }
    });
    store.commit('SET_TAGSLIST', tagsList);
}
const app = new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('SET_OPENEDLIST');
        this.$store.commit('INIT_CACHEPAGE');
    },
    created() { //转移至登录后操作
        // let tagsList = [];
        // appRouter.map((item) => {
        //     if (item.children.length <= 1) {
        //         tagsList.push(item.children[0]);
        //     } else {
        //         tagsList.push(...item.children);
        //     }
        // });
        // this.$store.commit('SET_TAGSLIST', tagsList);
    }
});
export { app, router, store }