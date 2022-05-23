<template>
  <div class="card-wrapper">
    <ListItem v-for="item in List" :title="item.title" :completed="item.completed" :idUser="item.userId" />
  </div>
</template>

<script lang="ts">
import { useTodoStore } from '@EXAMPLE/stores/store';
import { ref } from '@nuxtjs/composition-api';
import ListItem from '@EXAMPLE/components/listItem';
export default {
  components: { ListItem },
  setup() {
    const store: any = useTodoStore();

    const List = ref([]);
    const getlist = () => {
      store.commitDate({
        onError: () => {
          console.log('error');
        },
        onSuccess: (res: any) => {
          List.value = res;
        },
      });
    };
    getlist();
    return {
      List,
    };
  },
};
</script>
<style scoped>
.card-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
