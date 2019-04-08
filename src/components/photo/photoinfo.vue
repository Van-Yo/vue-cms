<template>
    <div class="photoinfo-container">
        <h3>{{ imgInfoList.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ imgInfoList.add_time | dataFormat }}</span>
            <span>点击：{{ imgInfoList.click }}次</span>
        </p>
        <hr>
        <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
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
            slide1: [
                {
                    src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                    msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                    w: 600,
                    h: 400
                },
                {
                    src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
                    msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
                    w: 1200,
                    h: 900
                }
            ]
        }
    },
    created(){
        this.getPhotoInfo();
    },
    methods:{
        getPhotoInfo(){
            this.$http.get('http://www.liulongbin.top:3005/api/getimageInfo/'+ this.id).then( result => {
                if(result.body.status == 0){
                    this.imgInfoList = result.body.message[0]
                }
            } )
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
