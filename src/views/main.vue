<template>
    <el-container class="home-container">
      <el-header>
        <div class="header">
            <img class="header-photo" src="../assets/d0799bcfee04e196a16ab025a0707f4.png">
            <span >首页</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <el-menu background-color="rgb(121.3, 187.1, 255)" text-color="black" :router="true">
              <el-menu-item index="/introduction">
                 <template #title>
                    <el-icon><location /></el-icon>
                    <span>介绍</span>
                 </template>
               </el-menu-item>
               <el-menu-item index="/commit">
                  <el-icon><icon-menu /></el-icon>
                  <span>上传</span>
               </el-menu-item>
               <el-menu-item index="/about">
                  <el-icon><icon-menu /></el-icon>
                  <span>关于</span>
               </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view class="routephoto"></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default{
    name:"main",
};
</script>

<style scoped>
.home-container{
    height:100%;
}

.el-header{
    background-color: rgb(51.2, 126.4, 204);
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    color: #fff;
    font-size: 20px;
}

.header-photo{
    height:60px;
}

.header{
    display: flex;
    align-items: center;
    span{
        margin-left: 15px;
    }
}

.el-aside{
    background-color:rgb(121.3, 187.1, 255);
}

.el-main{
    background-color: rgb(216.8, 235.6, 255);
}

.routephoto{
    
}
</style>
