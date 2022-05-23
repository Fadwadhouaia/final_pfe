<template>
  <div class="card">
    title:{{title}}
    <hr>
    completed:{{completed}}
    <hr>
    user id:{{idUser}}
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type:String,
      default:''
    },
     completed: {
      type:String,
      default:false
    },
     idUser: {
      type:Number,
      default:0
    }
  }
}
</script>
<style scoped>
.card{
  max-width: 300px;
  margin: 15px;
}
</style>