<template>
    <div class="goods-list">
        <div class="go-back" @click="goback()"><返回</div>
        <!-- 这里可以用router-link来实现路由跳转，也可以使用路由导航对象，实用JS代码实现路由的前进后退跳转到url地址 -->
        <!-- <router-link class="single-goods-braf" v-for="item in goodsList" :key="item.id" :to="'/home/goodsinfo/'+ item.id" tag="div">
        </router-link> -->
        <div class="single-goods-braf" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url">
            <h3>{{ item.title }}</h3>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>{{ item.stock_quantity }}</span>
                </p>
            </div>
        </div>
        <!-- 加载更多 -->
        <mt-button type="danger" size="large" @click="getMore()">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            pageIndex:1,
            goodsList:[]
        }
    },
    created(){
        this.getGoodsList(1)
    },
    methods:{
        getGoodsList(index){
            this.$http.get('http://www.liulongbin.top:3005/api/getgoods?pageindex='+index).then(result => {
                if(result.body.status == 0){
                    this.goodsList = this.goodsList.concat(result.body.message)
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getGoodsList(this.pageIndex)
        },
        goDetail(id){
            // console.log(this)
            // 编程式导航
            this.$router.push("/home/goodsinfo/"+id)
        },
        goback(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
.goods-list{
    position:relative;
    display: flex;
    flex-wrap:wrap;
    padding: 7px;
    justify-content:space-between;
    .go-back{
        position:absolute;
        color: #fff;
        top: -28px;
        left: 10px;
        z-index: 100;
        font-size: 14px;
    }
    .single-goods-braf{
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    min-height: 292px;
        img{
            width: 100%
        }
        h3{
            font-size: 14px;
        }
        .info{
            background-color: #ddd;
            p{
                margin-bottom: 0;
                padding: 5px;
            }
           .price{
               .now{
                   color: red;
                   font-weight: 600;
               }
               .old{
                   font-size: 12px;
                   text-decoration: line-through;
                   margin-left: 10px;
               }
           } 
           .sell{
               display: flex;
               justify-content:space-between;
               font-size: 13px;
           }
        }
}
}

</style>
