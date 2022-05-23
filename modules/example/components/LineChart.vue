<template>

  <div class="container-data p-2 mt-3">
    <button @click="useaddDate">+</button>
    <button @click="useminusDate">-</button>
    <canvas id="LineChart" width="200" height="200" />
  </div>
</template>

<script lang="ts">
import { Chart, registerables } from 'chart.js';
import { useTodoStore } from '@EXAMPLE/stores/store';
import { computed, onMounted,ref } from '@nuxtjs/composition-api';

export default {
  name: 'ChartLines',

  props: {
    dataPR: {
      type: Array,
      default: [],
    },
    initialLabels: {
      type: Array,
      default: () => {
        return [];
      }
    },
    dataCommit: {
      type: Array,
      default: [],
    },
    labelsPR: {
      type: Array,
      default: [],
    },
    combinedLabels: {
      type: Array,
      default: [],
    },
  //  update: {
  //     type: Array,
  //     default: [],
  //   },
  },

  setup(props, { emit }) {
    Chart.register(...registerables);
    const store: any = useTodoStore();
    var myChart = null;
    const dates=ref(props.initialLabels);
    dates.value=dates.value.slice(0,20);
    const indexer=ref(20);
    onMounted(() => {
      var ctx = document.getElementById('LineChart').getContext('2d');

      myChart = new Chart(ctx, {
        type: 'line',
        

        data: {
          labels: dates.value,

          datasets: [
            {
              label: 'Pull Request Number',
              data: props.dataPR,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
            {
              label: 'Commit Number',
              data: props.dataCommit,
              fill: false,
              borderColor: 'rgb(75, 12, 92)',
              tension: 0.1,
            },
          ],

          
        },
      });

    });

    const useaddDate=()=>{
            indexer.value=indexer.value+5;
      
      myChart.data.labels=props.initialLabels.slice(0,indexer.value);

      myChart.update();
    }
    const useminusDate=()=>{
            indexer.value=indexer.value-5;
      
      myChart.data.labels=props.initialLabels.slice(0,indexer.value);

      myChart.update();
    }
   return{
     useaddDate,
     indexer,
     myChart,
     useminusDate
   }
    
  },
};
</script>

<style scoped>
#LineChart {
  max-width: 100%;

  max-height: 300px;
}
</style>
