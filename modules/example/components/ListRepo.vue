<template>
  <div class="list-repo">
    <a-select
      placeholder="Select a repository"
      @change="handleChange"
      :defaultValue="data[0].name"
    >
      <a-select-option v-for="item in data" :value="item.name">
        {{ item.name }}
      </a-select-option>
    </a-select>
  </div>
</template>
<script lang="ts">
import { useTodoStore } from '@EXAMPLE/stores/store';
import { onMounted, reactive, ref } from '@nuxtjs/composition-api';
export default {
  props:{
    data: Array,
    default: () => {
      return [];
    }
  },
  setup(props, { emit }) {
    // const formData = reactive({
    //   name: '',
    //   protected: '',
    // });
    const loaded = ref(false);
    // const store: any = useTodoStore();
  
    const handleChange = (repoName: any) => {
      emit('onChangeRepoList', repoName);
    };
    return {
      // formData,
      loaded,
      handleChange
    };
  },
};
</script>
<style lang="scss" scoped>
.ant-select{
  width:100%;
}
</style>
