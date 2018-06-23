'use strict';
import { otherRouter, appRouter } from '@/router/router';
import Util from '@/libs/util';
import Cookies from 'js-cookie';
import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
    cachePage: [],
    token: '',
    routers: [
        otherRouter,
        ...appRouter
    ],
    userData: {},
    themeColor: '',
    currentPath: [{
        title: '首页',
        path: '',
        name: 'home_index'
    }], // 面包屑数组
    pageOpenedList: [{
        title: '首页',
        path: '',
        name: 'home_index'
    }],
    tagsList: [...otherRouter.children],
    menuList: [],
    isLoadRoutes: false,
    openedSubmenuArr: [], // 要展开的菜单数组
    dontCache: ['text-editor', 'artical-publish'], // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
    iconList: [{ name: 'partner', icon: 'ios-world-outline' }, { name: 'personnel', icon: 'person-stalker' }, { name: 'orders', icon: 'ios-paper-outline' }, { name: 'finance', icon: 'card' }, { name: 'product', icon: 'bag' }, { name: 'system', icon: 'ios-gear' }, { name: 'third', icon: 'more' }],
};

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
});