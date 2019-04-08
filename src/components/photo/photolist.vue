<template>
    <div>
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item',item.id == 0 ? ' mui-active': '']" v-for="item in cates" :key="item.id" @tap="getImageList(item.id)">
							{{ item.title }}
						</a>
						
					</div>
				</div>

			</div>
            <ul class="img-list">
                <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
                    <img v-lazy="item.img_url">
                    <div class="info">
                        <div class="info-title">
                            <h3>{{ item.title }}</h3>
                        </div>
                        <div class="info-content">
                            <p>{{ item.zhaiyao }}</p>
                        </div>
                    </div>
                </router-link>
            </ul>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
// mui('.mui-scroll-wrapper').scroll({
// 	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
// });
export default{
    data(){
        return{
            cates:[],
            list:[]
        }
    },
    created(){
        this.getAllCategory();
        this.getImageList(0); //默认进入页面调取所有图片的列表
    },
    mounted(){ //当组件中 的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
               //如果要操作DOM元素，需要将js放在这里面，因为这里面的元素是最新的 
        // 实现滚动
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods:{
        getAllCategory(){
            this.$http.get('http://www.liulongbin.top:3005/api/getimgcategory').then(result => {
                if(result.body.status == 0){
                    result.body.message.unshift({ title:'全部',id:0 });
                    this.cates = result.body.message
                }
            })
        },
        getImageList(listid){
            this.$http.get('http://www.liulongbin.top:3005/api/getimages/'+ listid).then(result => {
                if(result.body.status == 0){
                    this.list = result.body.message
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
*{
    touch-action: pan-y;
}
.img-list{
    list-style: none;
    padding: 0 10px;
    margin: 0;
    li{
        margin-bottom: 4px;
        position:relative;
    }
    li img{
        width: 100%;
        vertical-align: middle;
    }
    img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
    .info{
        color:#fff;
        background-color:rgba(0,0,0,0.6);
        padding: 5px;
        position: absolute;
        bottom: 0;
        max-height: 90px;
        .info-title h3{
            font-size: 14px;
        }
        .info-content p{
            color:white;
            font-size: 12px;
        }
    }
}


</style>
