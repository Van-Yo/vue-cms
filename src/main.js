//入口文件
import Vue from 'vue'
//安装路由
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
// 按需导入Mint-UI中的组件
import { Header, Swipe, SwipeItem } from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

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
    router //挂在路由对象到vm实例上
})