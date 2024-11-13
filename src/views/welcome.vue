<template>
<div class="container">
    <el-carousel :interval="4000" type="card" height="500px">
        <el-carousel-item  v-for="(item,index) in imgList" :key="index">
            <img class="img" :src="item" alt=""/>
        </el-carousel-item>
    </el-carousel>

    <p class="head">welcome to web</p>

  <p class="intror"> here you can enjoy our high-qulified service! </p>
</div>
</template>



<script>
  import { Swiper, SwiperSlide } from 'swiper/vue';

  import 'swiper/css';

  import img1 from "../assets/220253d8095cc5dbab6e6bc17ad4f73.png";
  import img2 from "../assets/97fb37de665802e5651b3c2420ab412.png";
  import img3 from "../assets/589682ab500e8508cff97febb8d57ee.png";

export default{
    name:"welcome",
    data(){
        return{
            imgList:[
                img3,
                img1,
                img2
            ]
        }
    },
    components: {
      Swiper,
      SwiperSlide,
    }
}
</script>


<style scoped>
.container{
    background-image: url(../assets/7aa8a31710745842f5fb3cd31c9eba5.png);
    background-repeat: no-repeat;
    background-attachment: fixed;
}

.head{
    font-size:80px;
    text-align: center;
    color: #fff;
}


.intror{
    position: relative;
    top: 30px;
    text-align: center;
}



.img{
    height:500px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>