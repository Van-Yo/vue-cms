<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="轻点吐槽(最多120字)" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment()">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | dataFormat}}
                </div>
                <div class="cmt-content">
                    {{item.content}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore()" plain>加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default{
    data(){
        return{
           pageindex:1,
           comments:[],
           msg:""
        }
    },
    created(){
        this.getComments();
    },
    methods:{
        getComments(){
            this.$http.get("http://www.liulongbin.top:3005/api/getcomments/"+ this.id +"?pageindex="+this.pageindex).then(result => {
                if(result.body.status == 0){
                    // this.comments = result.body.message
                    this.comments = this.comments.concat(result.body.message)
                }else{
                    Toast("获取评论失败！")
                }
            })
        },
        getMore(){
            this.pageindex++;
            this.getComments();
        },
        postComment(){
            if(this.msg.trim().length === 0){
                return Toast("不能为空");
            }
            this.$http.post("http://www.liulongbin.top:3005/api/postcomment/"+this.id,{ content:this.msg.trim() }).then(result => {
                if(result.body.status == 0){
                    // this.pageindex = 1;
                    // this.getComments();
                    var cmt = {
                        user_name: "匿名用户",
                        add_time:Date.now(),
                        content:this.msg.trim()
                    };
                    this.comments.unshift(cmt);
                    this.msg = "";
                }
            })
        }
    },
    props: ['id']
}
</script>

<style lang="scss" scoped>
.cmt-container{
    margin-bottom: 10px;
    textarea{
        height:100px;
        margin-bottom: 0;
    }
    .cmt-list{
        margin: 10px 0;
    }
    .cmt-title{
        font-size: 13px;
        background-color: #999;
        line-height: 35px;
    }
    .cmt-content{
        font-size: 13px;
        text-indent: 2em;
        line-height: 35px;
    }
}
</style>
