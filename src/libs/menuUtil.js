import lazyLoading from './lazyLoading'
export default (routers, data, iconList) => {
    //这里之所以要重新遍历一下，是因为，通常我们动态路由的时候，是获取服务端数据，这个component属性是一个字符串，或者可能连字段名都是其他的key
    //所以这里要做一些转换
    generaMenu(routers, data, iconList)
}

function generaMenu(routers, data, iconList) {
    data.forEach((item) => {
        let menu = Object.assign({}, item)
            // menu.component = lazyLoading(item.name, '')
            // menu.component = require(`@/page/main.vue`);
        menu.component = resolve => require([`@/page/main.vue`], resolve);
        let name = menu.name;
        iconList.forEach((iconObj) => {
            if (iconObj.name == name) {
                menu.icon = iconObj.icon;
            }
        })
        if (item.children) {
            let children = item.children;
            let childrenList = [];
            children.forEach((childItem) => {
                let menuleaf = Object.assign({}, childItem)
                    // menuleaf.component = lazyLoading(item.name, childItem.name);
                    // menuleaf.component = require(`@/page/${item.name}/${childItem.name}.vue`);
                menuleaf.component = resolve => require([`@/page/${item.name}/${childItem.name}.vue`], resolve);
                childrenList.push(menuleaf);
            })
            item.children = childrenList;
        }
        menu.children = item.children;
        routers.push(menu);
    })
};