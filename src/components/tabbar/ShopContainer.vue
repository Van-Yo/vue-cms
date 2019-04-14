<template>
<div class="goods-container">
  <div class="goods-list">
      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="checkedChange(item.id)"></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :initcount = "$store.getters.getGoodsCount[item.id]" :initid = "item.id"></numbox>
                <a href="#" @click.prevent="delSingleGoods(item.id,i)">删除</a>
              </p>
            </div>
					</div>
				</div>
			</div>
  </div>
  <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner count-all">
						<div class="left">
              <p>总计（不含运费）</p>
              <p>已勾选商品<span class="red">{{ $store.getters.getCountMount.count }}</span>件，总价<span class="red">￥{{ $store.getters.getCountMount.mount }}</span></p>
            </div>
            <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
</div>
  
</template>

<script>
import numbox from '../subcomponent/shopcar_numbox.vue'
export default{
  data(){
    return{
      goodslist:[]
    }
  },
  created(){
    this.getGoodsList();
  },
  methods:{
    // 获取store中所有商品的id，然后拼接出一个用逗号分隔的字符串
    getGoodsList(){
      var idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      if(idArr.length <= 0){
        return
      }
      this.$http.get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/'+ idArr.join(",")).then(result => {
        if(result.body.status == 0){
          this.goodslist = result.body.message;
        }
      })
    },
    delSingleGoods(id,index){
      //1.删除获取到的数据中index对应的数据
      this.goodslist.splice(index,1)
      this.$store.commit('removeFromCar',id)
    },
    checkedChange(id){
      this.$store.commit('checkedFromCar',id)
    }
  },
  components:{
    numbox
  }
}
</script>

<style lang="scss" scoped>
.goods-list{
  background-color: #eee;
  overflow: hidden;
  img{
    width: 60px;
    height: 60px;
  }
  h1{
    font-size: 13px;
  }
  .price{
    color: red;
    font-weight:bold;
  }
}
.mui-card-content-inner{
  display: flex;
  align-items: center;
}
.count-all{
  display: flex;
  justify-content:space-between;
  align-items: center;
  .red{
    color: red;
    font-weight: bold;
    font-size: 15px;
  }
}
</style>