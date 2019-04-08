<template>
  <div>
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in sliderList" :key="item.id">
            <img :src="item.img" alt="">
        </mt-swipe-item>
        </mt-swipe>
      <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/newslist">
		                    <img src="../../images/home-png1.png">
		                    <div class="mui-media-body">新闻资讯</div>
                        </router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/photolist">
		                     <img src="../../images/home-png2.png">
		                    <div class="mui-media-body">图片分享</div>
                        </router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="/home/goodslist">
		                     <img src="../../images/home-png3.png">
		                    <div class="mui-media-body">商品购买</div>
                        </router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                     <img src="../../images/home-png4.png">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                     <img src="../../images/home-png5.png">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                     <img src="../../images/home-png6.png">
		                    <div class="mui-media-body">联系我们</div></a></li>
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

<style lang="scss" scoped>
    body{
        background-color: #ffffff !important;
	}
    .mint-swipe{
        height:200px;
    }
    .mint-swipe-item img{
        width: 100%;
        height: 100%;
    }
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border:0;
        img{
            width: 64px;
            height: 64px;
        }
        .mui-media-body{
            font-size: 13px;
        }
    }
</style>



