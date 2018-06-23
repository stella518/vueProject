import Main from '@/page/main.vue';
// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () =>
        import ('@/page/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () =>
        import ('@/page/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () =>
        import ('@/page/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () =>
        import ('@/page/error-page/500.vue')
};



// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [{
        path: 'home',
        title: '首页',
        name: 'home_index',
        component: () =>
            import ('@/page/home/home.vue')
    }, ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
// export const appRouter = [{
//         path: '/partner',
//         icon: 'ios-world-outline',
//         name: 'partner',
//         title: '合作方',
//         component: Main,
//         children: [{
//                 path: 'organiza',
//                 icon: '',
//                 name: 'organiza',
//                 title: '机构',
//                 component: () =>
//                     import ('@/page/partner/organiza.vue')
//             },
//             {
//                 path: 'store',
//                 icon: '',
//                 name: 'store',
//                 title: '门店',
//                 component: () =>
//                     import ('@/page/partner/store.vue')
//             }
//         ]
//     },
//     {
//         path: '/personnel',
//         icon: 'person-stalker',
//         name: 'personnel',
//         title: '人员',
//         component: Main,
//         children: [{
//                 path: 'backuser',
//                 title: '后台管理人员',
//                 name: 'backuser',
//                 icon: '',
//                 component: () =>
//                     import ('@/page/personnel/backuser.vue')
//             },
//             {
//                 path: 'customer',
//                 title: '客户',
//                 name: 'customer',
//                 icon: '',
//                 component: () =>
//                     import ('@/page/personnel/customer.vue')
//             }

//         ]
//     },
//     {
//         path: '/orders',
//         icon: 'ios-paper-outline',
//         name: 'orders',
//         title: '订单',
//         component: Main,
//         children: [{
//             path: 'loan',
//             title: '贷款记录',
//             name: 'loan',
//             icon: '',
//             component: () =>
//                 import ('@/page/orders/loan.vue')
//         }]
//     },
//     {
//         path: '/finance',
//         icon: 'card',
//         name: 'finance',
//         title: '财务管理',
//         component: Main,
//         children: [{
//                 path: 'remittance',
//                 title: '汇款记录',
//                 name: 'remittance',
//                 icon: '',
//                 component: () =>
//                     import ('@/page/finance/remittance.vue')
//             },
//             {
//                 path: 'proceeds/:no',
//                 title: '收款记录',
//                 name: 'proceeds',
//                 icon: '',
//                 component: () =>
//                     import ('@/page/finance/proceeds.vue')
//             },
//             {
//                 path: 'fund',
//                 title: '资金管理',
//                 name: 'fund',
//                 icon: '',
//                 component: () =>
//                     import ('@/page/finance/fund.vue')
//             }

//         ]
//     },
//     {
//         path: '/product',
//         icon: 'bag',
//         name: 'product',
//         title: '产品管理',
//         component: Main,
//         children: [{
//                 path: 'contract',
//                 title: '合同模板',
//                 name: 'contract',
//                 icon: '',
//                 component: () =>
//                     import ('@/page/product/contract.vue')
//             },
//             {
//                 path: 'loanproducts',
//                 title: '贷款产品',
//                 name: 'loanproducts',
//                 icon: '',
//                 component: () =>
//                     import ('@/page/product/loanproducts.vue')
//             },
//             {
//                 path: 'loansub/:id',
//                 title: '贷款产品子类',
//                 name: 'loansub',
//                 icon: '',
//                 component: () =>
//                     import ('@/page/product/loansub.vue')
//             }
//         ]
//     },
//     {
//         path: '/system',
//         icon: 'ios-gear',
//         name: 'system',
//         title: '系统管理',
//         component: Main,
//         children: [{
//             path: 'role',
//             title: '角色管理',
//             name: 'role',
//             icon: '',
//             component: () =>
//                 import ('@/page/system/role.vue')
//         }]
//     }
// ];
export const appRouter = [{
    path: '/',
    name: 'appRouter',
    redirect: '/home',
    component: Main,
    children: []
}];
// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
];