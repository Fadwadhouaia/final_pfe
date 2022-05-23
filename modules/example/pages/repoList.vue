<template>
  <div>
    <a-select
      show-search
      placeholder="Select a repository"
      option-filter-prop="children"
      style="width: 400px"
      :filter-option="filterOption"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    >
      <a-select-option v-for="item in repos.items" :value="item.name">
        {{ item.name}}
      </a-select-option>
    </a-select>
  </div>
</template>

<script lang="ts">
import { useTodoStore } from '@EXAMPLE/stores/store';
import { onMounted, ref } from '@nuxtjs/composition-api';
export default {
  
  setup() {
    const loaded = ref(false);
    const store: any = useTodoStore();
    onMounted(() => {
      getlist();
    });
    const repos = ref([]);
    const getlist = () => {
      store.getGitRepos({
        onError: () => {
          console.log('error');
        },
        onSuccess: (res) => {
          repos.value = res;
          loaded.value = true;
        },
      });
    };

    return {
      repos,
      loaded,
    };
  },
  methods: {
    handleChange(value: any) {
      this.repoName = value;
      console.log(value);
    },
    handleBlur() {
      console.log('blur');
    },
    handleFocus() {
      console.log('focus');
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
  },
};
</script>

