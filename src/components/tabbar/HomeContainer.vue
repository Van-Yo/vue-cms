<template>
  <div>
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in sliderList" :key="item.id">
            <img :src="item.img" alt="">
        </mt-swipe-item>
        </mt-swipe>
      <h3>HomeContainer</h3>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default{
    data(){
        return{
            sliderList:[]
        }
    },
    created(){
        this.getSlider()     
    },
    methods:{
        getSlider(){
            this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(result =>{
                if(result.body.status == 0){
                    this.sliderList = result.body.message;
                }else{
                    Toast('加载轮播图失败')
                }
            })
        }
    }
}
</script>

<style scoped>
    .mint-swipe{
        height:200px;
    }
    .mint-swipe-item:nth-child(1){
        background-color: green;
    }
    .mint-swipe-item:nth-child(2){
        background-color: red;
    }
    .mint-swipe-item:nth-child(3){
        background-color: yellow;
    }
    .mint-swipe-item img{
        width: 100%;
        height: 100%;
    }
</style>



