# VUE-CMS

### 新建新闻资讯的页面：
1.现在HomeContainer.vue里改router-link和to;
2.新建路由组件NewsList.vue;3.导入路由组建和创建路有对象

### 新闻页面制作：
1.绘制页面(MUI-media-list.html);
2.获取数据(vue-resource:http://www.liulongbin.top:3005/api/getnewslist);
3.数据渲染到页面中
### 问题
1.底部最下面的新闻被挡住了，要为根组件创建padding-bottom ;
2.时间未格式化,解决方法用全局过滤器利用moment插件实现

### 新闻详情页
1.修改newslist中的router-link 和 to
2.新建新闻详情页的vue
3.修改路由
4.在新闻详情页的vue文件中通过this.$route.params.id来获取URL地址中传递过来的新闻id
5.设计一下新闻详情页样式
6.获取数据(vue-resource:http://www.liulongbin.top:3005/api/getnew/id)
7.数据渲染到页面中

### 新闻详情页加一个评论区域（因为还有很多页面需要用到评论，所以可以设置一个子组件comment.vue）
1.新建comment.vue
2.在父组件中导入子组件，这里即为在NewsInfo.vue里面导入comment.vue，然后在父组件里设置components,最后标签形式引入
3.设计一下comment.vue样式
4.获取当前新闻页对应的评论区数据，涉及的重点是父组件如何向子组件传数据：props
5.接受到父组件的数据（新闻id）后，就可以获取评论数据了（vue-resource:http://www.liulongbin.top:3005/api/getcomments/13?pageindex=1）
6.数据渲染到页面中

### 新闻评论加载更多
1.绑定一个点击事件
2.点击加载更多，先pageindex++,然后再次调用获取该页评论的数据，即新数据
3.要用到数组拼接concat,使得第一页或者前几页的数据不被覆盖，即新数据加入之前的老数据，而不是覆盖老数据

### 添加评论
1.textarea数据绑定v-model
2.为发表评论添加一个事件
3.添加发表评论的方法，之前先校验评论内容是否为空
4.利用vue-resource post发送一个请求，把评论内容发给服务器
5.当发表评论后，重新刷新列表，以查看最新的评论
 + 如果调用getComments 方法重新刷新评论列表的话，可能只能得到最后一页的评论，因为当前pageindex是最后页的，所以前几页的评论无法获取到
 + 换一种思路，既然评论已经发表到服务器，可以手动拼接出一个最新的评论对象，然后调用数组的unshift方法，把最新的评论追加到data中的comments的开头
6.评论完后，textarea显示为空

### 改造图片分析按钮为路由连接并显示对应的组建页面

### 绘制图片列表组建的样式
1.顶部的滑动条(需要借助于mui中的tab-top-webview-main.html，还需要将复制过来的mui-fullscreen类去掉)
 + 导入进去导航条能显示，但是无法点击也无法滚动，解决方法(先导入mui的js然后导入下面的官方文档代码)：
 ```
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
 ```
 + 接下来解决了上面的问题，又发现了两个问题，分别是，底部的tabbar没法切换和跳转，其次是从首页进入图片列表页后，图片导航也无法点击和切换，而是要刷新该页面才能解决；
 + 针对上面第二个问题的解决方案：如果要初始化滑动条，必须等DOM元素加载完毕，所以，要把滑动条的代码搬到mounted生命周期函数中；针对第一个问题其实是mui js的命名与类名冲突，最笨的方法就是改类名。
2.制作底部的图片列表
 + 获取顶部滑动条的数据，名称，vue-resource:http://www.liulongbin.top:3005/api/getimgcategory,然后再获取到的数组前面添加一个键值，用于表示全部的意思：
 ```
 result.body.message.unshift({ title:'全部',id:0 });
 ```
 + 获取顶部滑动条对应下面的图片及其内容，先是获取全部的列表内容，即默认传参为0，其次再是滑动条各个模块所对应的图片及内容列表
 ```
        getImageList(listid){
            this.$http.get('http://www.liulongbin.top:3005/api/getimages/'+ listid).then(result => {
                if(result.body.status == 0){
                    this.list = result.body.message
                }
            })
        }
 ```
 + 获取到内容后，设计一下列表的样式，并将每个li修改成router-link,tag设置为li
3.图片列表详情页的制作
 + 设计并获取图片详情页的数据
 ```
    getPhotoInfo(){
            this.$http.get('http://www.liulongbin.top:3005/api/getimageInfo/'+ this.id).then( result => {
                if(result.body.status == 0){
                    this.imgInfoList = result.body.message[0]
                }
            } )
        },
 ```
 + 导入comment子组件，并传递参数
 ```
 <cmt-box :id='this.id'></cmt-box>
 ```
 + 利用图片缩略图插件实现缩略图功能（vue-preview: https://github.com/LS1231/vue-preview）

### 商品列表的实现
1.先绘制三个单个的商品列表，三个布局成功就能使得所有布局成功，需要注意的地方：
 + 两两一行，暴力的解决方法就是设置单个产品块的宽度，这里设置了49%，然后给父级设置为:
 ```
  .goods-list{
    display: flex;
    flex-wrap:wrap;
    padding: 7px;
    justify-content:space-between;
    }
 ```
 + 当产品标题文字多时，会影响整体布局，解决方案就是给单个产品设置css3样式：
 ```
  .single-goods-braf{
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    }
 ```
2.获取数据(vue-resource: http://www.liulongbin.top:3005/api/getgoods?pageindex=id ),并传入id=1进行初始化渲染
3.增加查看更多的按钮，调用getMore方法使得pageindex++，获取下一页的数据利用concat加到原来的数据中，实现数据加载渲染
```
<mt-button type="danger" size="large" @click="getMore()">加载更多</mt-button>
```

### 商品详情页的实现
1.新建商品详情页的vue，配置路由（带id）,可以以两种方式设置链接，一种是利用router-link和to,一种是使用路由导航对象，实用JS代码实现路由的前进后退跳转到url地址：
```
    <div class="single-goods-braf" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
```
```
    goDetail(id){
        // console.log(this)
        // 编程式导航
        this.$router.push("/home/goodsinfo/"+id)
    },
```
2.上面要注意$router和$route的区别，利用$router可以实现前一页和后一页的导航操作：
```
    <div class="go-back" @click="goback()"><返回</div>
```
```
    goback(){
        this.$router.go(-1)
    }
```
3.绘制GoodsInfo详情页
 + 抽离轮播图组件，由于首页的轮播图在产品详情页也用到，所以可写成一个公共组件，主要抽取的是mint-ui的html和首页定义的css
 + 抽离轮播图组建的坑1：由于首页轮播图和产品详情页轮播图里面的图片不一样，需要加以判断图片是否要宽度100%显示(无法在详情页的style里面设置css样式),也就是父组件传子组件数据，用于class类上
 ```
    <img :src="item.img" alt="" :class="{full:isfull}">
    props: ['sliderList','isfull']
    .full{
        width: 100%;
    }
 ```
 ```
    <slider :sliderList="sliderList" :isfull="true"></slider>
 ```
 ```
    <!-- Goods  picture's width in slider shouldn't be 100% -->
    <slider :sliderList = 'sliderInfo' :isfull="false"></slider>
 ```
 + 抽离轮播图组建的坑2:由于首页轮播图组件调取的图的属性是item.img,而api里面只有src，所以获取到数据后需要手动添加src属性
 ```
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
 ```
 + 绘制其他模块，并调取数据，渲染到页面上
 ```
    getGoodsInfo(){
        this.$http.get('http://www.liulongbin.top:3005/api/goods/getinfo/'+this.id).then(result => {
            if(result.body.status == 0){
                this.goodsInfo = result.body.message[0];
            }
        })
    },
 ```
