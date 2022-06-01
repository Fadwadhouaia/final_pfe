<template>
  <div class="lastmonth_pr">
    <canvas id="LineChart" width="400" height="400" />
  </div>
</template>

<script lang="ts">
import { Chart, registerables } from 'chart.js';
import { useTodoStore } from '@EXAMPLE/stores/store';
import { onMounted, ref } from '@nuxtjs/composition-api';

export default {
  name: 'ChartLines',

  props: {
    lastMonthLabelsPR: {
      type: Array,
      default: [],
    },
 
    lastMonthDataPR: {
      type: Array,
      default: [],
    },

  },

  setup(props, { emit }) {
    Chart.register(...registerables);
    const store: any = useTodoStore();
    var myChart = null;
    // var data_length = 0;
    const dates = ref(props.lastMonthLabelsPR);

   
    onMounted(() => {
      var ctx = document.getElementById('LineChart').getContext('2d');

      myChart = new Chart(ctx, {
        type: 'line',

        data: {
          labels: dates.value,
          datasets: [
            {
              label: 'Last Month Pull Request ',
              data: props.lastMonthDataPR,
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
.lastmonth_pr{
  height: 470px;
  width: 550px;
}

#LineChart {
  max-width: 100%;
  max-height: 300px;
}
</style>
