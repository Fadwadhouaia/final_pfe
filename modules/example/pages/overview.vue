<template>
 <div class="cards">
<div class="android">
    <a-card class="card" style="width: 530px; height: 180px">
       <!-- <img class="android-logo" src="../static/assets/Orange_logo.svg" alt="" /> -->
    <div class="android-card">
     
      <img class="android-logo" src="../../../static/assets/android.svg"     alt="" />
      <!-- <h2 class="androidStyle">My Orange (Android)</h2> -->
        <h2 class="iosStyle"> My Orange (android)</h2>
    </div>
  </a-card>
 </div>
 
  <div class="ios">
    <a-card class="card" style="width: 530px; height: 180px">
    <h2 class="iosStyle">My Orange (iOS)</h2>
  </a-card>
 </div>
 </div>
</template>

<style scoped>
.ant-card {
 margin-top: 20px;;
  overflow: hidden;
  cursor: pointer;
  border-radius: 20px;
}
.layout.content {
  background-color: #f2f2f2;
}
.default {
  background: #f2f2f2;
}
.ant-card-bordered {
  border: 0px;
}
.cards{ 
    display: flex;

}
.ios{
    margin-left: 20px;
}
.iosStyle{
   margin-top: 10px;;
    font-weight: bold;
}
.androidStyle{
   margin-top: 10px;;
    font-weight: bold;
}
.android-logo{
  padding-right:20px ;
  border-radius: 80px;
  width: 55px;
    height: 80px;
}
.android-card{
 
  display: flex;
   flex-direction: row;
   }
</style>
