<template>
  <div class="listcommit">
    <ListCommit :columns="columns" :commits="data" />
  </div>
</template>
<script lang="ts">
import ListCommit from './ListCommit.vue';

export default {
  components: {
    ListCommit,
  },
  props: {
    data: Array,
  },

  setup() {
    const columns = [
      {
        title: 'Last Commit',
        dataIndex: 'author',
        scopedSlots: { customRender: 'author' },
        width: '40%',
      },
      {
        title: 'Build',
        dataIndex: 'build',
        scopedSlots: { customRender: 'build' },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' },
      },
      {
        title: 'Date',
        dataIndex: 'date',
        scopedSlots: { customRender: 'date' },
      },
    ];
    return {
      columns,
    };
  },
};
</script>

<style scoped>
.listcommit {
  margin-top: 30px;
}
</style>
