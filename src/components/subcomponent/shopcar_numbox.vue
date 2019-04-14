<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" ref="numbox" @change="countChanged" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default{
    mounted(){
        //初始化数据选择框组件
       mui('.mui-numbox').numbox();
    },
    methods:{
        countChanged(){
            this.$store.commit('listAddToCar',{id:this.initid,count:this.$refs.numbox.value})
        }
    },
    // 父组件向子组件传入localstore里的商品id和count
    props:['initcount','initid']
}
</script>

<style lang="scss" scoped>

</style>
