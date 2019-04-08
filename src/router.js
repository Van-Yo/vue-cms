//安装路由
import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopContainer from './components/tabbar/ShopContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photo/photolist.vue'
import PhotoInfo from './components/photo/photoinfo.vue';
import GoodsList from './components/goods/GoodsList.vue'

var router = new VueRouter({
    routes: [
        //配置路由规则
        { path: '/', redirect:'/home' },
        { path: '/home', component: HomeContainer},
        { path: '/member', component: MemberContainer },
        { path: '/shop', component: ShopContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newslist', component: NewsList },
        { path: '/home/newsinfo/:id', component: NewsInfo },
        { path: '/home/photolist', component:PhotoList },
        { path: '/home/photoinfo/:id', component: PhotoInfo },
        { path: '/home/goodslist', component: GoodsList}
    ],
    linkActiveClass:'mui-active' //覆盖默认的router-link-active类
})

export default router