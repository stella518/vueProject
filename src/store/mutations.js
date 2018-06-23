'use strict';
import { otherRouter, appRouter } from '@/router/router';
import Cookies from 'js-cookie';
import Util from '@/libs/util.js';
import {
    SET_TOKEN,
    SET_USERDATA,
    SET_CURRENTPATH,
    SET_OPENEDLIST,
    INIT_CACHEPAGE,
    SET_TAGSLIST,
    SET_CURRENTPAGENAME,
    ADD_OPENSUBMENU,
    PAGE_OPENEDLIST,
    UPDATE_MENULIST,
    SET_MESSAGECOUNT,
    CLEAR_OPENEDSUBMENU,
    INCREATE_TAG,
    CLEAR_ALLTAGS,
    CLEAR_OTHERTAGS,
    REMOVE_TAG,
    CLOSE_PAGE,
    SET_MENULIST,
    EXPAND_MENU,
    APPEND_MENU,
    SET_ROUTES,
} from './mutation-type'

const mutations = {
    [SET_TOKEN](state, items) {
        state.token = items;
    },
    [SET_USERDATA](state, items) {
        state.userData = items;
    },
    [SET_CURRENTPATH](state, pathArr) {
        state.currentPath = pathArr;
    },
    [SET_OPENEDLIST](state) {
        state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
    },
    [INIT_CACHEPAGE](state) {
        if (localStorage.cachePage) {
            state.cachePage = JSON.parse(localStorage.cachePage);
        }
    },
    [SET_TAGSLIST](state, list) {
        state.tagsList.push(...list);
    },
    [SET_CURRENTPAGENAME](state, name) {
        state.currentPageName = name;
    },
    [ADD_OPENSUBMENU](state, name) {
        let hasThisName = false;
        let isEmpty = false;
        if (name.length === 0) {
            isEmpty = true;
        }
        if (state.openedSubmenuArr.indexOf(name) > -1) {
            hasThisName = true;
        }
        if (!hasThisName && !isEmpty) {
            state.openedSubmenuArr.push(name);
        }
    },
    [PAGE_OPENEDLIST](state, get) {
        let openedPage = state.pageOpenedList[get.index];
        if (get.argu) {
            openedPage.argu = get.argu;
        }
        if (get.query) {
            openedPage.query = get.query;
        }
        state.pageOpenedList.splice(get.index, 1, openedPage);
        localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    [SET_MENULIST](state, item) {
        state.menuList = item;
    },
    [UPDATE_MENULIST](state, newRouter) {
        let accessCode = parseInt(Cookies.get('access'));
        let menuList = [];
        newRouter.forEach((item, index) => {
            if (item.access !== undefined) {
                if (Util.showThisRoute(item.access, accessCode)) {
                    if (item.children.length === 1) {
                        menuList.push(item);
                    } else {
                        let len = menuList.push(item);
                        let childrenArr = [];
                        childrenArr = item.children.filter(child => {
                            if (child.access !== undefined) {
                                if (child.access === accessCode) {
                                    return child;
                                }
                            } else {
                                return child;
                            }
                        });
                        menuList[len - 1].children = childrenArr;
                    }
                }
            } else {
                if (item.children.length === 1) {
                    menuList.push(item);
                } else {
                    let len = menuList.push(item);
                    let childrenArr = [];
                    childrenArr = item.children.filter(child => {
                        if (child.access !== undefined) {
                            if (Util.showThisRoute(child.access, accessCode)) {
                                return child;
                            }
                        } else {
                            return child;
                        }
                    });
                    if (childrenArr === undefined || childrenArr.length === 0) {
                        menuList.splice(len - 1, 1);
                    } else {
                        let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
                        handledItem.children = childrenArr;
                        menuList.splice(len - 1, 1, handledItem);
                    }
                }

            }
        });
        state.menuList = menuList;
    },
    [SET_MESSAGECOUNT](state, count) {
        state.messageCount = count;
    },
    [CLEAR_OPENEDSUBMENU](state) {
        state.openedSubmenuArr.length = 0;
    },
    [INCREATE_TAG](state, tagObj) {
        if (!Util.oneOf(tagObj.name, state.dontCache)) {
            state.cachePage.push(tagObj.name);
            localStorage.cachePage = JSON.stringify(state.cachePage);
        }
        state.pageOpenedList.push(tagObj);
        localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    [CLEAR_ALLTAGS](state) {
        state.pageOpenedList.splice(1);
        state.cachePage.length = 0;
        localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    [CLEAR_OTHERTAGS](state, vm) {
        let currentName = vm.$route.name;
        let currentIndex = 0;
        state.pageOpenedList.forEach((item, index) => {
            if (item.name === currentName) {
                currentIndex = index;
            }
        });
        if (currentIndex === 0) {
            state.pageOpenedList.splice(1);
        } else {
            state.pageOpenedList.splice(currentIndex + 1);
            state.pageOpenedList.splice(1, currentIndex - 1);
        }
        let newCachepage = state.cachePage.filter(item => {
            return item === currentName;
        });
        state.cachePage = newCachepage;
        localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
    [REMOVE_TAG](state, name) {
        state.pageOpenedList.map((item, index) => {
            if (item.name === name) {
                state.pageOpenedList.splice(index, 1);
            }
        });
    },
    [CLOSE_PAGE](state, name) {
        state.cachePage.forEach((item, index) => {
            if (item === name) {
                state.cachePage.splice(index, 1);
            }
        });
    },
    [APPEND_MENU](state, menuItem) {
        if (menuItem) {
            state.menuList = [];
            state.menuList.push(...menuItem);
        }
    },
    [SET_ROUTES](state, data) {
        state.routers = [];
        state.routers = data;
    },
    logout(state, vm) {
        Cookies.remove('user');
        Cookies.remove('password');
        Cookies.remove('access');
        localStorage.clear();
        state.menuList = [];
    }
};
export default mutations