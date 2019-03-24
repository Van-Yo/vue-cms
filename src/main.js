//入口文件
import Vue from 'vue'

// 按需导入Mint-UI中的组件
import { Header } from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header);

//导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//导入App根组件
import app from './App.vue'


var vm = new Vue({
    el:"#app",
    render: c => c(app)
})