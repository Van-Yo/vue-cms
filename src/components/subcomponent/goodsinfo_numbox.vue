<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" @change="countChanged"/>
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
            this.$emit('getcount',parseInt(this.$refs.numbox.value))
        }
    },
    props:['max'],

    // 这里如果通过父组件向子组件传值的方式，由于promise异步操作，很有可能max的尚未获取到，从而定义为undefined,可以用watch来监听，一旦拿到了，就js操作api,
    // 达到box里面的数据始终无法大于库存值
    watch:{
        max:function(newVal,oldVal){
            mui('.mui-numbox').numbox().setOption("max",newVal);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
