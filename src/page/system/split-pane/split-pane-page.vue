<template>
    <div>
        <Card :padding="0">
            <div class="split-pane-con">
                <split-pane ref="pane" :style="{height: '100%'}" direction="horizontal" v-model="triggerOffsetMin">
                    <div slot="left" style="height: 100%;">
                        <Card>
                            <p slot="title">
                                <Icon type="person-stalker"></Icon>
                                角色列表
                            </p>
                            <Row type="flex" justify="center" align="middle" class="advanced-router">
                                <Col span="24">
                                <Table :columns="userList" :data="userData"></Table>
                                <Page :total="total" class="pager" @on-change="changePage"></Page>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                    <div slot="trigger" 
                        :style="{left: triggerOffsetMin + '%'}" 
                        @mousedown="handleMousedown"
                        class="custom-trigger"></div>
                    <div slot="right" style="background: #fff;height: 100%;border:2px dashed #ccc;padding:10px 50px;">
                         <!-- <Tree :data="menuData" show-checkbox></Tree> -->
                         <Card>
                            <p slot="title">
                                <Icon type="navicon-round"></Icon>
                                菜单列表<span v-if="chooseRole">——</span>{{chooseRole}}
                            </p>
                            <a href="#" slot="extra" @click.prevent="editMenu">
                                <Icon type="edit"></Icon>
                                提交
                            </a>
                            <Row type="flex" justify="center" align="middle" class="advanced-router">
                                <Col span="24">
                                    <Tree :data="menuData" show-checkbox></Tree>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </split-pane>
            </div>
        </Card>
    </div>
</template>
<script>
import splitPane from './split-pane';
export default {
    name: 'split-pane-page',
    components: {
        splitPane
    },
    data () {
        return {
            triggerOffset: '300px',
            triggerOffsetV: 70,
            triggerOffsetMin: 40,
            atMax: false,
            atMin: false,
            token:this.$store.state.token,
            page:1,
            size:10,
            total:10,
            userList:[
            {
                title: '角色名称',
                key: 'nickName',
            },
            {
                title: '类型',
                key: 'userType'
            },
            {
                title: '操作',
                key: 'action',
                width: 150,
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small',
                                row:params.row,
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                this.getMenu(params.row);
                                }
                            }
                        }, '菜单管理')
                    ]);
                }
            }
          
      ],
      userData:[],
      menuData: [],
      showUserId:'',
      chooseRole:''
      };
    },
    created(){
        this.getBackUserList();
    },
    methods: {
        handleMousedown (e) {
            this.$refs.pane.handleMousedown(e);
        },
        handleMoving (e) {
            this.atMax = e.atMax;
            this.atMin = e.atMin;
        },
        getMenu(param){
            let userId = param.id;
            this.showUserId = param.id;
            this.chooseRole = param.nickName;
            this.$api.get('/user/back/queryBackUserMenu/'+userId, {},r => {
                if(r.status == 'SUCCESS'){
                    let json = JSON.parse(r.data);
                    for(let i=0;i<json.length;i++){
                        if(json[i].access == 0){
                            // json[i].checked = json[i].access==1?true:false;
                            json[i].checked = false;
                        }else{
                            json[i].checked = true;
                        }
                        json[i].expand = true;
                        if(json[i].children){
                            let item = json[i].children;
                            for(let j=0;j<item.length;j++){
                                if(item[j].access == 0){
                                    item[j].selected = false;
                                }else{
                                    item[j].selected = true;
                                }
                                item[j].expand = true;
                            }
                        }
                    }
                    this.menuData = json;
                }
            })
        },
        getBackUserList(){
            this.$api.post('/user/back/getBackUser/'+this.token+'/'+this.page+'/'+this.size, {}, r => {
                if(r.status == 'SUCCESS'){
                this.userData = r.data;
                this.total = r.total_count;
                }
            })
        },
        changePage(index){
            this.page = index;
            this.getBackUserList();
        },
        editMenu(){
            let data = this.formatManu();
            let userId = this.showUserId ;
            this.$api.put('/user/back/editMenu/'+userId, data, r => {
                this.getBackUserList();
                this.$Spin.hide();
                if(r.status == 'SUCCESS'){
                    this.$Message.success({
                        content: '菜单修改成功',
                        duration: 3,
                        closable: true
                    });
                }
            })  
            
        },
        formatManu(){
            this.$Spin.show();
            let json = this.menuData;
            let newJson = [];
            for(let i=0;i<json.length;i++){
                let newItem = {};
                newItem.title = json[i].title;
                newItem.path = json[i].path;
                newItem.name = json[i].name;
                if(json[i].access != json[i].checked){
                    if(json[i].checked){
                        json[i].access = 1;
                        newItem.access = 1;
                    }else{
                        json[i].access = 0;
                        newItem.access = 0;
                    }
                    if(json[i].children){
                        let item = json[i].children;
                        let newItem_childArr = [];
                        for(let j=0;j<item.length;j++){
                            let newItem_child = {};
                            newItem_child.title = item[j].title;
                            newItem_child.path = item[j].path;
                            newItem_child.name = item[j].name;
                            if(item[j].access != item[j].checked){
                                if(item[j].checked){
                                    item[j].access = 1;
                                    newItem_child.access = 1;
                                }else{
                                    item[j].access = 0;
                                    newItem_child.access = 0;
                                }
                            }
                            newItem_childArr.push(newItem_child);
                        }
                        newItem.children = newItem_childArr;
                    }
                }else{
                    if(json[i].children){
                        let item = json[i].children;
                        let newItem_childArr = [];
                        for(let j=0;j<item.length;j++){
                            let newItem_child = {};
                            newItem_child.title = item[j].title;
                            newItem_child.path = item[j].path;
                            newItem_child.name = item[j].name;
                            if(item[j].access != item[j].checked){
                                if(item[j].checked){
                                    item[j].access = 1;
                                    newItem_child.access = 1;
                                }else{
                                    item[j].access = 0;
                                    newItem_child.access = 0;
                                }
                            }
                            newItem_childArr.push(newItem_child);
                        }
                        newItem.children = newItem_childArr;
                    }
                }
                newJson.push(newItem);
            }
            let menuData = JSON.stringify(newJson);
            let data = {menu:menuData};
            return data;
        }
    }
};
</script>
<style lang="less" scoped>
.split-pane-con{
    width: 100%;
    height: 89vh;
}
.custom-trigger{
    position: absolute;
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, .1) , 2px 2px 10px 2px rgba(0, 0, 0, .2) inset;
    border: 1px solid #c3c3c3;
    cursor: pointer;
}
.introduce-left-con h4{
    margin-bottom: 20px;
}
.introduce-left-con h5{
    margin-bottom: 10px;
    margin-left: 20px;
}
.split-pane-right-con{
    padding: 30px;
}
.split-pane-right-con p{
    font-size: 26px;
    font-weight: 700;
    color: white;
}
.pager{
    text-align: right;
    background-color: #fff;
    padding-top:20px;
}
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
</style>

