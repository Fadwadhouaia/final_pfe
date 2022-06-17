<template>
  <div class="allGit">
   <div class="gitName">
        <h3>Log In To Samea Community Manager</h3>
   </div>
   <!-- <div>
        <a-button type="primary" v-on:click="login">
            LogIn To Samea Community Manager</a-button>

   </div> -->
   <div class="gitButton">
      
      <img src="../../../static/assets/github.png"  v-on:click="login" />
  
   </div>
    
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from '@nuxtjs/composition-api';
export default {
  setup() {
    const instance = getCurrentInstance();
    const login = () => {
      console.log('gtrdrthydjyjt', instance?.proxy);
      instance?.proxy.$auth.loginWith('github');
    };
    return {
      login,
    };
  },
};
</script>

<style lang="scss" scoped>
.gitName {
    font-size: 23px;
    display: inline-block;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 100px;
    right: 0;
    width: 500px;
    height: 100px;
    margin: auto;
}
.gitButton {
    display: inline-block;
    position: fixed;
    top: 150px;
    bottom: 0;
    left: 0;
    right: 0;
    width: 300px;
    height: 100px;
    margin: auto;
}
.allGit{
    display: block;
}
// .ant-btn-primary {
//     color: #fff;
//     background-color: gray;
//     border-color:grey;
// }
</style>