<template>
    <div class="photoinfo-container">
        <h3>{{ imgInfoList.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ imgInfoList.add_time | dataFormat }}</span>
            <span>点击：{{ imgInfoList.click }}次</span>
        </p>
        <hr>
        <div class="photo-thumb">
            <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
        </div>
        <div class="content" v-html="imgInfoList.content"></div>
        <cmt-box :id='this.id'></cmt-box>
    </div>
</template>

<script>
import comment from '../subcomponent/comment.vue'
export default{
    data(){
        return{
            id : this.$route.params.id,
            imgInfoList:[],
            slide1: []
        }
    },
    created(){
        this.getPhotoInfo();
        this.getPhotoThumn()
    },
    methods:{
        getPhotoInfo(){
            this.$http.get('http://www.liulongbin.top:3005/api/getimageInfo/'+ this.id).then( result => {
                if(result.body.status == 0){
                    this.imgInfoList = result.body.message[0]
                }
            } )
        },
        getPhotoThumn(){
            this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/'+ this.id ).then(result => {
                if (result.body.status == 0) {
                    result.body.message.forEach(item => {
                        item.w = 600;
                        item.h = 400;
                        item.msrc = item.src
                    });
                    this.slide1 = result.body.message
                }
            })
        },
        handleClose () {
            console.log('close event')
        }
    },
    components:{
        'cmt-box':comment,
    }
}
</script>

<style lang="scss" scoped>
.photoinfo-container{
    padding: 3px;
    h3{
        color: #26A2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content:space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
}
</style>
