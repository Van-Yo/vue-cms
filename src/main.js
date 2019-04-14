//入口文件
import Vue from 'vue'
//安装路由
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)

// 注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state:{
        car:car
    },
    mutations:{
        addToCar(state,goodsinfo){
            // 假设购物车中没有对应的产品
            var flag = false
            // 1.判断购物车里面是否已经有这个产品
            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    // 给flag传值true表示有这个产品
                    flag = true;
                    return true;
                }
            })
            // 2.判断购物车离确实没这个产品,就将商品数据push到购物车中
            if(!flag){
                state.car.push(goodsinfo)
            }

            // 3.上面第二步只是将数据更新到内存中，一刷新浏览器底部购物车又恢复成0了，所以需要储存到本地的localStorage中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        listAddToCar(state,goodsinfo){
            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count);
                    return true;
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFromCar(state,id){
            state.car.some((item,index) => {
                if(item.id = id){
                    state.car.splice(index,1)
                    return true;
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        checkedFromCar(state,id){
            state.car.some(item => {
                if (item.id == id) {
                    item.selected = !item.selected
                    return true;
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters:{
        getAllCount(state){
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state){
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o;
        },
        getGoodsSelected(state){
            var o ={}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getCountMount(state){
            var o = {
                count: 0,
                mount: 0,
            }
            state.car.forEach(item => {
                if(item.selected){
                    o.count += item.count;
                    o.mount += item.count * item.price
                }
            })
            return o;
        }
    }
})
// 按需导入Mint-UI中的组件
import { Header, Swipe, SwipeItem, Button, Lazyload, Switch } from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Switch.name, Switch);
Vue.use(Lazyload)
//导入缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dataFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})

//导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true

//导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入自己的router.js模块
import router from './router.js'

//导入App根组件
import app from './App.vue'


var vm = new Vue({
    el:"#app",
    render: c => c(app),
    router, //挂在路由对象到vm实例上
    store
})