//安装路由
import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopContainer from './components/tabbar/ShopContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

var router = new VueRouter({
    routes: [
        //配置路由规则
        { path: '/' ,redirect:'/home'},
        { path: '/home', component: HomeContainer},
        { path: '/member', component: MemberContainer },
        { path: '/shop', component: ShopContainer },
        { path: '/search', component: SearchContainer }
    ],
    linkActiveClass:'mui-active' //覆盖默认的router-link-active类
})

export default router