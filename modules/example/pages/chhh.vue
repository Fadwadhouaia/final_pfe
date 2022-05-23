<template>
  <div class="cards">
    <div class="android-card">
      <div class="chart-div">
        <LineChart
          v-if="initialLabels.length && combinedLabels.length && dataPR.length && dataCommit.length  && isLoaded"
          :labelsPR="labelsPR"
          :dataPR="dataPR"
          :dataCommit="dataCommit"
          :labelsCommit="labelsCommit"
          :combinedLabels="combinedLabels"
          :initialLabels="initialLabels"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import LineChart from '../components/LineChart.vue';
import { computed, onMounted, ref } from '@nuxtjs/composition-api';
import { useTodoStore } from '@EXAMPLE/stores/store';
export default {
  components: { LineChart },
  setup() {
    const isLoaded = ref(false);
    onMounted(() => {
      getlist();
      getListCommits();
      // update();
    });

    const getlist = () => {
      store.testGraphQl({
        onError: () => {
          /* */
        },
        onSuccess: () => {
          isLoaded.value = true;
        },
      });
    };

    const getListCommits = () => {
      store.commitDate({
        onError: () => {
          /* */
        },
        onSuccess: () => {
          isLoaded.value = true;
        },
      });
    };
    const store: any = useTodoStore();
    const indexer=ref(20);
    const dataPR = computed(() => {
      // console.log(store.data, 'TESTTTTTTTTT');
      return store.data;
    });
    const labelsPR = computed(() => {
      return store.labels;
    });

    const labelsCommit = computed(() => {
      return store.commitLabelsFiltred;
    });

    const dataCommit = computed(() => {
      return store.commitCount;
    });

    const combinedLabels = computed(() => {
      return [...new Set(labelsPR.value.concat(labelsCommit.value))];
    });

    const initialLabels = computed(() => {
      return combinedLabels.value;
    });


    return {
      getlist,
      dataPR,
      labelsPR,
      labelsCommit,
      dataCommit,
      isLoaded,
      combinedLabels,
      initialLabels,
      // update,
    };
  },
};
</script>
<style>
.title {
  color: aquamarine;
}
</style>
