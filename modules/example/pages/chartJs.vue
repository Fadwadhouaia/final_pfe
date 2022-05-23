<template>
  <div class="container-data p-2 mt-3">
    <h3>{{ $t('HOME.TOPTYPE') }}</h3>

    <canvas id="LineChart" width="200" height="200" />

    <div v-if="update">
      {{ updateSelfdata() }}
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';

import { onMounted } from 'vue';

export default {
  name: 'ChartLines',

  props: {
    chartdata: {
      type: Object,

      default: null,
    },

    options: {
      type: Object,

      default: null,
    },

    update: {
      type: Boolean,

      default: false,
    },
  },

  setup(props, { emit }) {
    Chart.register(...registerables);

    var myChart = null;

    onMounted(() => {
      var ctx = document.getElementById('LineChart').getContext('2d');

      myChart = new Chart(ctx, {
        type: 'line',

        data: props.chartdata,

        options: {
          parsing: {
            xAxisKey: 'transactionType',

            yAxisKey: 'volume',
          },
        },
      });
    });

    const updateSelfdata = () => {
      myChart.update();

      emit('stopupdating');
    };

    return {
      updateSelfdata,
    };
  },
};
</script>

<style scoped>
#LineChart {
  max-width: 100%;

  max-height: 300px;
}
</style>
