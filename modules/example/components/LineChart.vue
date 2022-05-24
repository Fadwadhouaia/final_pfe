<template>
  <div class="container-data p-2 mt-3">
    <canvas id="LineChart" width="200" height="200" />
    <div class="buttons">
      <a-button v-bind:class="getClassAdd()" class="add" type="primary" @click="useaddDate"> Add datasets </a-button>

      <a-button v-bind:class="getClassRemove()" class="remove" type="primary" @click="useminusDate"
        >Remove datasets</a-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Chart, registerables } from 'chart.js';
import { useTodoStore } from '@EXAMPLE/stores/store';
import { onMounted, ref } from '@nuxtjs/composition-api';

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
      },
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
    // var data_length = 0;
    const dates = ref(props.initialLabels);

    console.log(dates.value.length);

    const data_length = dates.value.length;
    dates.value = dates.value.slice(0, 20);
    const indexer = ref(20);
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

    const useaddDate = () => {
      indexer.value = indexer.value + 5;
      console.log(indexer.value);
      myChart.data.labels = props.initialLabels.slice(0, indexer.value);

      myChart.update();
    };
    const useminusDate = () => {
      if (indexer.value > 5) {
        indexer.value = indexer.value - 5;
      }

      myChart.data.labels = props.initialLabels.slice(0, indexer.value);

      myChart.update();
    };
    return {
      data_length,
      useaddDate,
      indexer,
      myChart,
      useminusDate,
    };
  },
  methods: {
    getClassAdd() {
      return this.indexer > this.data_length ? 'disable_btn ' : ' ';
    },
    getClassRemove() {
      return this.indexer <= 6 ? 'disable_btn ' : ' ';
    },
  },
};
</script>

<style scoped>
.disable_btn {
  cursor: not-allowed;
  cursor: none;
  opacity: 0.5;
}
.buttons {
  margin-top: 20px;
}
.ant-btn-primary.add {
  color: #fff;
  background-color: #1878ff;
  border-color: #1878ff;
}
.ant-btn-primary.remove {
  color: #fff;
  background-color: #ff1818;
  border-color: #ff1818;
}
#LineChart {
  max-width: 100%;

  max-height: 300px;
}
</style>
