<template>
    <div class="goods-container">
        <!-- 小球动画，用钩子函数实现 -->
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <!-- Goods banner area -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!-- Goods  picture's width in slider shouldn't be 100% -->
                    <slider :sliderList = 'sliderInfo' :isfull="false"></slider>
                </div>
            </div>
        </div>
        <!-- Goods detail area -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsInfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">{{ goodsInfo.sell_price }}</span>
                    </p>
                    <p class="count">购买数量：
                        <numbox @getcount="getGoodsCount" :max="goodsInfo.stock_quantity"></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToChart">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!-- Goods more detail area -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsInfo.goods_no }}</p>
                    <p>库存情况：{{ goodsInfo.stock_quantity }}件</p>
                    <p>上架时间：{{ goodsInfo.add_time | dataFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <!-- 两个编程式导航实现跳转 -->
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import slider from '../subcomponent/slider.vue'
import numbox from "../subcomponent/goodsinfo_numbox.vue";
export default{
    data(){
        return{
            id: this.$route.params.id,
            sliderInfo:[],
            goodsInfo:[],
            ballFlag:false,
            selectedCount:1 //默认选中商品的数量为1
        }
    },
    created(){
        this.getSlider();
        this.getGoodsInfo();
    },
    methods:{
        getSlider(){
            this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/'+this.id).then(result => {
                if(result.body.status == 0){
                    result.body.message.forEach(item => {
                        item.img = item.src
                    })
                    this.sliderInfo = result.body.message;
                }
            })
        },
        getGoodsInfo(){
            this.$http.get('http://www.liulongbin.top:3005/api/goods/getinfo/'+this.id).then(result => {
                if(result.body.status == 0){
                    this.goodsInfo = result.body.message[0];
                }
            })
        },
        goDesc(id){
            this.$router.push("/home/goodsdesc/"+id)
        },
        goComment(id){
            this.$router.push("/home/goodscomment/"+id)
        },
        addToChart(){
            this.ballFlag = !this.ballFlag
        },
        beforeEnter(el){
            // 初始化小球位置
            el.style.transform = "translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;
            // 如果像下面这么写会使得该动画的小球运动只支持当前设备，因为所有的动画偏移量是写死的，所以不应该这么写
            // el.style.transform = "translate(86px,212px)";
            //应该这么写，获取初始位置与结束位置的动态坐标，相减一下，用于动态的数据
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            const badgePosition = document.getElementById('botton-chart').getBoundingClientRect();
            const x_length = badgePosition.left - ballPosition.left;
            const y_length = badgePosition.top - ballPosition.top;
            console.log(x_length,y_length)
            el.style.transform = `translate(${x_length}px,${y_length}px)`;
            el.style.transition = 'all 0.5s cubic-bezier(0.4,-0.3,1,0.68)'
            done()
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        },
        getGoodsCount(count){
            this.selectedCount = count;
            console.log(this.selectedCount)
        }

    },
    components:{
        slider,
        numbox
    }
}
</script>

<style lang="scss" scoped>
    .goods-container{
        background-color: #eee;
        overflow: hidden;
        .now_price{
            color: red;
            font-size: 16px;
            font-weight:bold;
        }
        .count{
            position:relative;
        }
        .ball{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position:absolute;
            z-index: 99;
            top:409px;
            left: 152px;
        }

        
    }
    .mui-card-footer{
        display:block;
        button{
            margin: 15px 0;
        }
    }
</style>
