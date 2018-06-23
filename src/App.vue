<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                token:this.$store.state.token?this.$store.state.token:localStorage.getItem('token'),
                theme: this.$store.state.themeColor
            };
        },
        created(){
            if(!this.token){
                this.$router.push({path:'/login'});
            }else{
                if(!this.$store.state.token){
                this.$store.commit('SET_TOKEN',this.token);
                }
            }
            
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {
            
        }
    };
</script>

<style>
html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
.app-main{
    width: 100%;
    height: 100%;
}
</style>
