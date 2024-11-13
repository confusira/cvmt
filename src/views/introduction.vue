<template>
<div class="bgimg">
    <div class="bg">
        <span class="heading">介绍</span>

        <h1 class="descrip">
            我们推出的生成视频产品，利用最先进的AI技术，帮助用户轻松创建高质量视频内容。用户只需输入文字、图片或音频素材，系统便能自动生成与之匹配的视频，涵盖从简短广告到长篇故事片的各种需求。该产品支持多种风格和模板，能够根据目标受众的偏好定制视觉效果和音效，快速实现创意的可视化。无论是企业宣传、社交媒体内容，还是个人项目，都能在几分钟内完成高水准的视频制作，极大提升内容创作的效率和专业度。此外，生成的视频支持多种格式输出，便于用户在不同平台上分享和发布。通过这款产品，用户无需专业技能，也能轻松制作出引人入胜的视频内容，助力提升品牌影响力和内容传播效果。
        </h1>


        <p class="subtit">具体步骤</p>

        
        <h2 class="bz">
            <el-steps class="steper" style="width: 84%" :active="idx" finish-status="success" simple>
                <el-step title="步骤一" />
                <el-step title="步骤二" />
                <el-step title="步骤三" />
                <el-step title="步骤四" />
            </el-steps>

            <h2 v-if="idx==0"><span style="font-size:50px;padding-left:40px;">  上传视频</span></h2>
            <h2 v-if="idx==1"><span style="font-size:50px;padding-left:40px;">  上传音频</span></h2>
            <h3 v-if="idx==2"><span style="font-size:50px;padding-left:40px;">  撰写文案</span></h3>
            <h4 v-if="idx==3"><span style="font-size:50px;padding-left:40px;">  发布</span></h4>
            <h5 v-if="idx==4"><span style="font-size:50px;padding-left:40px;">  等待几秒后，弹出视频，发布成功</span></h5>

            
            <img class="p1" v-if="idx==0" src="../assets/20241113104739.jpg" alt="">
            <img class="p2" v-if="idx==1" src="../assets/20241113104759.jpg" alt="">
            <img class="p3" v-if="idx==2" src="../assets/20241113104815.jpg" alt="">
            <img class="p4" v-if="idx==3" src="../assets/20241113104826.jpg" alt="">
            <img class="p5" v-if="idx==4" src="../assets/20241113104739.jpg" alt="">
            
                
        </h2>
        

        <button class="bu" @click="clickhandle()">下一步</button>
    </div>
</div>
    
</template>

<script>
export default{
    name:"introduction",
    data(){
        return{
            idx:0
        }
    },

    methods:{
        clickhandle(){
            if(this.idx>=4){
                this.idx=0;
            }else{
                this.idx+=1;
            }
        }
    }
}   
</script>



<style scoped>
.bgimg{
    background-image: url(../assets/87e9dc0bf9fe3bfd560b7956f003b52.png);
    background-repeat: no-repeat;
    background-attachment: fixed;
    height:570px;
}

.bg{
    position:relative;
    top:440px;
    margin-left: 50px;
    margin-right: 50px;
    border-top: 4px;
}

.heading{
    font-size:100px;
    color: aliceblue;
}

.descrip{
    border-style: solid;
    position:relative;
    top:50px;
}

.subtit{
    position: relative;
    top:100px;
    font-size: 50px;
}

.bz{
    background-color: #fff;
    position: relative;
    top:100px;
    height:700px;
}

.steper{
    position:relative;
    left:50rpx;
}


    
.bu{
    position: relative;
    height:50px;
    width: 100px;
    font-size: 25px;
    margin-bottom: 100px;
    text-align: center;
    top: 20px;
    left:90%;
    display:flex;
    justify-content: space-between;

}

.p1{
    padding-left: 40px;
    height: 450px;;
}

.p2{
    padding-left: 40px;
    height: 450px;;
}


.p3{
    padding-left: 40px;
    height: 450px;;
}

.p4{
    padding-left: 40px;
    height: 450px;;
}

.p5{
    padding-left: 40px;
    height: 450px;;
}


</style>