<template>
<div class="chart_global" v-if="isLoaded"> 
   
  <div   class="cards">

    <div class="pr">
      <div class="chart-div">
        <LastMonthChart
          v-if="lastMonthDataPR.length && lastMonthLabelsPR.length && isLoaded"
          :lastMonthLabelsPR="lastMonthLabelsPR"
          :lastMonthDataPR="lastMonthDataPR"/>
      </div>
    </div>
    <div class="commit">
      <div class="chart">
         <LastMonthCommit
          v-if="lastMonthDataCommit.length && lastMonthLabelsCommit.length && isLoaded"
          :lastMonthLabelsCommit="lastMonthLabelsCommit"
          :lastMonthDataCommit="lastMonthDataCommit"/>
      </div>
    </div>

  </div>
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
import LastMonthChart from '../components/LastMonthChart.vue';
import LastMonthCommit from '../components/LastMonthCommit.vue';
import { computed, onMounted, ref } from '@nuxtjs/composition-api';
import { useTodoStore } from '@EXAMPLE/stores/store';
export default {
  components: { LastMonthChart, LastMonthCommit, LineChart },
  setup() {
    const isLoaded = ref(false);
    onMounted(() => {
      getlist();
      getCommit();

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
     const getCommit = () => {
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


     const lastMonthDataCommit = computed(() => {
      return store.lastMonthDataCommit;
    });
    console.log('lastMonthDataCommit lastMonthDataCommit lastMonthDataCommit', lastMonthDataCommit.value);
    const lastMonthLabelsCommit = computed(() => {
      return store.lastMonthLabelsCommit;
    });

    console.log(' lastMonthLabelsCommit lastMonthLabelsCommit lastMonthLabelsCommit lastMonthLabelsCommit ', lastMonthLabelsCommit.value);

    const lastMonthDataPR = computed(() => {
      return store.lastMonthDataPR;
    });
    console.log('lastMonthDataPR lastMonthDataPR lastMonthDataPR', lastMonthDataPR.value);
    const lastMonthLabelsPR = computed(() => {
      return store.lastMonthLabelsPR;
    });

    console.log(' lastMonthLabelsPR lastMonthLabelsPR lastMonthLabelsPR lastMonthLabelsPR ', lastMonthLabelsPR.value);
    return {
      getCommit,
      getlist,
      lastMonthDataPR,
      lastMonthLabelsPR,
      lastMonthDataCommit,
      lastMonthLabelsCommit,
      isLoaded,
       dataPR,
      labelsPR,
      labelsCommit,
      dataCommit,
      combinedLabels,
      initialLabels,
    };
  },
};
</script>
<style>
.cards{

  display: flex;
}
.title {
  color: aquamarine;
}
</style>
