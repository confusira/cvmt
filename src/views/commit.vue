<template>
    <div class="container" v-if="!issus">
      <!-- 创作页面 -->
      <div class="overlay" v-if="!isSubmit">

        <div class="contain_footer">
          <div class="promote_text">请上传5~8秒包含人物正脸的视频（MP4格式）</div>
          <div class="entry flex" @click="selectvideo">
            <img src="../assets/communite/add1-DLPPlpsp.png" class="icon" />
            <input type="file" ref="videoInput" @change="loadvideo" style="display: none" accept="video/*" />
          </div>
        </div>

        <div class="contain_footer">
          <div class="promote_text">请上传说着"前路坦荡，只管大胆向前走，走的每步都算数"的音频（MP3或者WAV格式）</div>
          <div class="entry flex" @click="selectvoice">
            <img src="../assets/communite/add1-DLPPlpsp.png" class="icon" />
            <input type="file" ref="audioInput" @change="loadvoice" style="display: none" accept="audio/*" />
          </div>
        </div>

        <textarea v-model="content" class="input-text" placeholder="请在此处输入目标视频中的文案..."></textarea>
        
        <div class="header">
          <button class="btn-publish" @click="submitFile">发布</button>
        </div>
      
      </div>

      <!-- 等待页面 -->
       <div class="wait" v-if="isSubmit">
        <button class="waiting">加载中</button>
        <button class="waiting" @click="Cancel">取消加载</button>

        <showcomponent v-if="issus" :receivedData="generateVideo" ></showcomponent>
       </div>
    </div>
    

  </template> 
  
  <script>
  import showcomponent from './show.vue';
  

  export default {
    name:"commit",
    components: {
    'showcomponent': showcomponent,
    },
    data() {
      return {
        content: '',
        video:'',
        videourl:'',
        voice:'',
        voiceurl:'',
        clone_voice:'',
        clone_voice_url:'',
        isSubmit:false,
        curToken:'',
        isCancel:false,
        issus:false,
        generateVideo:'',
      };
    },
    methods: {
      selectvideo() {
        this.$refs.videoInput.click();
      },
      selectvoice(){
        this.$refs.audioInput.click();
      },
      loadvideo(event) {
        const file = event.target.files[0];
        if (file) 
        {
          const reader = new FileReader();
          reader.onload = (e) => {
          this.video = file; // 直接保存文件对象
          alert("video");
          // this.imageDataUrl = e.target.result; // 保存生成的DataURL
          };
          reader.readAsDataURL(file);
        }
      },
      loadvoice(event) {
        const file = event.target.files[0];
        if (file) 
        {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.voice = file; // 直接保存文件对象
            // this.imageDataUrl = e.target.result; // 保存生成的DataURL
          };
          reader.readAsDataURL(file);
        }
      },
      // removeFile(index) {
      //   // 释放URL对象的内存
      //   URL.revokeObjectURL(this.files[index].url);
      //   this.files.splice(index, 1);
      // },
      getrand(){
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          let randomCode = '';
          for (let i = 0; i < 32; i++) {
            randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
          }
          return randomCode;
      },
      async submitFile() {
        this.isSubmit=true;
        this.isCancel=false;
        const thisToken = this.getrand();
        this.curToken=thisToken;
        if (this.video) 
        {
          const formData = new FormData();
          formData.append('file', this.video); // 直接传递单个 file 对象
          try {
            const response = await upload_video(formData);
            console.log("res",response);
            if (response.status_code=== 200) {
              this.videourl=response.data;
              alert("视频上传成功");//改成三秒自动消失弹窗
            } else {
              alert("视频上传失败，请重新上传");
            }
            this.isSubmit=false;
          } catch (error) {
              console.error("上传过程中出现错误:", error);
              alert("上传出现错误，请检查网络连接并重试");
              this.isSubmit=false;
          }
        }
        else
        {
          alert("缺少视频文件，请重新上传");
          return;
        }
        if (this.voice) 
        {
          const formData = new FormData();
          formData.append('file', this.voice); // 直接传递单个 file 对象
          try {
            const response = await upload_voice(formData);
            console.log("res",response);
            if (response.status_code=== 200) {
              this.voiceurl=response.data;
              alert("音频上传成功");//改成三秒自动消失弹窗
            } else {
              alert("文件上传失败，请重新上传");
            }
          } catch (error) {
              console.error("上传过程中出现错误:", error);
              alert("上传出现错误，请检查网络连接并重试");
          }
        }
        else
        {
          alert("缺少音频文件，请重新上传");
          return;
        }

        if(this.content)
        {
          const data={
            "text":"前路坦荡，只管大胆向前走，走的每步都算数。",
            "reference_audio":this.voiceurl,
            "reference_text":this.content
          }
          const response = await cosy_voice(data);
          if (response.status_code=== 200) {
              if(this.isCancel) return;
              if(this.curToken!=thisToken) return;
              this.clone_voice_url=response.data;
              alert("声音克隆成功");//改成三秒自动消失弹窗
            } else {
              alert("声音克隆失败");
              return;
            }
        }
        else
        {
          alert("缺少待合成文本，请重新上传");
          return;
        }
        const data={
          "voice_url":this.clone_voice_url,
          "video_path": this.videourl
        };
        const res = await generate_voice(data);
        if(this.isCancel) return;
        if(this.curToken!=thisToken) return;
        console.log("视频合成",res);
        if(res.status=="success") 
        {
         this.generateVideo=res.output; 
         this.issus=true;
        }
        else
        {
          alert("合成失败，请重试");
          return;
        }
      },
      Cancel(){
        this.isCancel=true;
        this.isSubmit=false;
      }
     
    }
  }
  </script>
  
  <style scoped>
  .container {
    position: relative;
    width: 100%;
    height: 100vh; /* 或者您希望的高度 */
    background-image: url(../assets/communite/send_post_back-C-priw3t.png);
    background-repeat: no-repeat;
    overflow: hidden;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding: 20px;
    color: white; /* 根据背景图片调整文字颜色 */
    box-sizing: border-box;
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width:  70vw;
    height: 5vh;
    /* margin-top: 1vh; */
    margin-left:1vw;
    padding: 20px;
  }
  
  .btn-publish {
    padding: 20px 40px;
    border: none;
    background-color: rgba(225, 207, 165, 0.5);
    color: black;
    font-size: 2vh;
    text-align: center; /* 水平居中 */
    line-height: 1vh; /* 与按钮高度相同，实现垂直居中 */
    text-align: center;
    border-radius: 16px;
    height: 5vh;
    cursor: pointer;
    margin-left: 32vw;
    margin-top:1vh;
  }
  .waiting{
    padding: 20px 40px;
    border: none;
    background-color: rgba(225, 207, 165, 0.5);
    color: black;
    font-size: 2vh;
    text-align: center; /* 水平居中 */
    line-height: 1vh; /* 与按钮高度相同，实现垂直居中 */
    text-align: center;
    border-radius: 16px;
    height: 5vh;
    cursor: pointer;
    margin-left: 45vw;
    margin-top:30vh;
  }
  .input-text {
    height: 30vh; 
    width: 60vw; 
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 10px;
    resize: none;
    font-size: 24px;
    color: #986F3F;
    background-color: #EFEDE8CC;
    margin-top: 3vh;
  }
  
  .contain_footer {
    width: 100%;
    height: 12vh;
    margin-left: vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top:3vh;
    margin-bottom: 8vh;
  }
  
  .icon {
    width:6vw;
    height:12vh;
  }
  .promote_text{
    color:black;
  }
  </style>
  