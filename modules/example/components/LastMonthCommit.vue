<template>
  <div class="lastmonth_commit">
    <canvas id="LineChart2" width="200" height="200" />
  </div>
</template>

<script lang="ts">
import { Chart, registerables } from 'chart.js';
import { useTodoStore } from '@EXAMPLE/stores/store';
import { onMounted, ref } from '@nuxtjs/composition-api';

export default {
  name: 'ChartLines',

  props: {
    lastMonthLabelsCommit: {
      type: Array,
      default: [],
    },
 
    lastMonthDataCommit: {
      type: Array,
      default: [],
    },

  },

  setup(props, { emit }) {
    Chart.register(...registerables);
    const store: any = useTodoStore();
    var myChart = null;
    // var data_length = 0;
    const dates = ref(props.lastMonthLabelsCommit);

   
    onMounted(() => {
      var ctx = document.getElementById('LineChart2').getContext('2d');

      myChart = new Chart(ctx, {
        type: 'line',

        data: {
          labels: dates.value,
          datasets: [
            {
              label: 'Last Month Commit ',
              data: props.lastMonthDataCommit,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
           
          ],
        },
      });
    });
    return {
      myChart,
    };
  },
 
};
</script>

<style scoped>
.lastmonth_commit{
  height: 470px;
  width: 600px;
}

#LineChart2 {
  max-width: 100%;
  max-height: 300px;
}
</style>
