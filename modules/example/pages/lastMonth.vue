<template>
  <div v-if="isLoaded" class="cards">
    <div class="android-card">
      <div class="chart-div">
        <LastMonthChart
          v-if="lastMonthDataPR.length && lastMonthLabelsPR.length && isLoaded"
          :lastMonthLabelsPR="lastMonthLabelsPR"
          :lastMonthDataPR="lastMonthDataPR"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import LastMonthChart from '../components/LastMonthChart.vue';
import { computed, onMounted, ref } from '@nuxtjs/composition-api';
import { useTodoStore } from '@EXAMPLE/stores/store';
export default {
  components: { LastMonthChart },
  setup() {
    const isLoaded = ref(false);
    onMounted(() => {
      getlist();

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

    const store: any = useTodoStore();

    const lastMonthDataPR = computed(() => {
      return store.lastMonthDataPR;
    });
    console.log('lastMonthDataPR lastMonthDataPR lastMonthDataPR', lastMonthDataPR.value);
    const lastMonthLabelsPR = computed(() => {
      return store.lastMonthLabelsPR;
    });

    console.log(' lastMonthLabelsPR lastMonthLabelsPR lastMonthLabelsPR lastMonthLabelsPR ', lastMonthLabelsPR.value);
    return {
      getlist,
      lastMonthDataPR,
      lastMonthLabelsPR,
      // update,
      isLoaded,
    };
  },
};
</script>
<style>
.title {
  color: aquamarine;
}
</style>
