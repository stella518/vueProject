<template>
  <div :style="{minWidth:'800px',overflow:'scroll'}"> 
      <split-pane>
          
      </split-pane>
  </div>
</template>
<style scoped>
.ivu-col-span-6 {
    display: block;
    width: 25%;
    padding: 0 40px;
    background-color: #fff;
    border-right: 1px dashed #ccc;
}
</style>
<script type="text/babel">
import splitPane from './split-pane/split-pane-page.vue';
export default {
    components: {
        splitPane
    },  
    data () {
        return {
            triggerOffsetMin: 40,
        }
    },
    methods: {
        handleMousedown (e) {
            this.$refs.pane.handleMousedown(e);
        },
       
    }
}
</script>