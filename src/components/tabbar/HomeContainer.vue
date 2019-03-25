<template>
  <div>
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in sliderList" :key="item.id">
            <img :src="item.img" alt="">
        </mt-swipe-item>
        </mt-swipe>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-home"></span>
		                    <div class="mui-media-body">Home</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
		                    <div class="mui-media-body">Email</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-chatbubble"></span>
		                    <div class="mui-media-body">Chat</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-location"></span>
		                    <div class="mui-media-body">location</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-search"></span>
		                    <div class="mui-media-body">Search</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-phone"></span>
		                    <div class="mui-media-body">Phone</div></a></li>
		        </ul> 
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
    body{
		background-color: #fff;
	}
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
    .mui-grid-view.mui-grid-9 .mui-media{
        background-color: #fff;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border:0;
    }
</style>



