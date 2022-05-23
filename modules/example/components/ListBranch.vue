<template>
  <div  class="card">
    <!-- <h3 :style="{ marginBottom: '16px' }">Branches</h3> -->
    <a-list :data-source="data" split="false" :pagination="true" :defaultPageSize	="2">
      <a-list-item :class="{back:true,active:index==selctedElement}" slot="renderItem" slot-scope="item, index" v-on:click="()=>{$emit('clicked', item.name);selctedElement=index}">
        {{ item.name }}
      </a-list-item>
    </a-list>
  </div>
</template>
<script lang="ts">
import { useTodoStore } from '@EXAMPLE/stores/store';
var selctedElement=0;
export default {
  data() {
    return {
      selctedElement
    }
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.active{
  background: #ededed;
}
li.ant-list-item {
 
  padding: 10px 10px;
  cursor: pointer;
  transition: 0.3s;
}

li.ant-list-item:hover {
  background: #eaeaea;
  font-weight: bold;
  /* border-radius: 3px; */
}
li.ant-list-item:visited {
  background: #cfcfcfa6;
font-weight: bold;  /* border-radius: 3px; */
}

li.back.ant-list-item {
  line-break: anywhere !important;
}
.ant-list {
    margin-top: 20px;
   
}
.ant-list-split .ant-list-item {
    border-bottom: none;
}
/* .ant-select-dropdown-menu-item ant-select-dropdown-menu-item-selected */
</style>
