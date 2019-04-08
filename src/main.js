//入口文件
import Vue from 'vue'
//安装路由
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
// 按需导入Mint-UI中的组件
import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
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
    router //挂在路由对象到vm实例上
})