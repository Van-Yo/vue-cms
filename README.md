# 逛吧！

## 3-25
### 改造tabbar 为 router-link
### 改造路由高亮
### 点击tabbar中的路由链接，展示对应的路由组件
### 制作首页轮播图，加载轮播图数据(vue-resource,this.$http.get,v-for)

### 添加首页的九宫格，组件切换的动画，问题：body的背景色

### 首页九宫格按需求变六宫格，并且换了对应的图片

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