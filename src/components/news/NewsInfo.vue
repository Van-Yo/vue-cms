<template>
    <div class="newsinfo-container">
        <h3 class="title">{{ newsContent.title }}</h3>
        <p class="subtitle">
            <span>发表时间: {{ newsContent.add_time }}</span>
            <span>点击: {{ newsContent.click }}</span>
        </p>
        <hr>
        <div class="content" v-html="newsContent.content">
        </div>
        <comment-box :id="this.newsId"></comment-box>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import comment from '../subcomponent/comment.vue'
export default{
    data(){
        return{
            // 获取新闻id,从URL地址中传递过来的
            newsId: this.$route.params.id,
            newsContent:[]
        }
    },
    created(){
        this.getInfoContent();
    },
    methods:{
        getInfoContent(){
            this.$http.get('http://www.liulongbin.top:3005/api/getnew/' + this.newsId).then(result => {
                if(result.body.status == 0){
                    this.newsContent = result.body.message[0]
                }else{
                    Toast("获取新闻内容失败！")
                }
            })
        }
    },
    components:{
        "comment-box":comment
    }
}
</script>

<style lang="scss" scoped>
.newsinfo-container{
    padding: 0 8px;
    .title{
        font-size: 18px;
        text-align: center;
        color: red;
    }
    .subtitle{
        color:#226aff;
        display: flex;
        justify-content: space-between;
    }
}
</style>
