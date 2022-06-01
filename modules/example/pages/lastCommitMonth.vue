<template>
  <div v-if="isLoaded" class="cards">
    <div class="android-card">
      <div class="chart-div">
        <LastMonthCommit
          v-if="lastMonthDataCommit.length && lastMonthLabelsCommit.length && isLoaded"
          :lastMonthLabelsCommit="lastMonthLabelsCommit"
          :lastMonthDataCommit="lastMonthDataCommit"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import LastMonthCommit from '../components/LastMonthCommit.vue';
import { computed, onMounted, ref } from '@nuxtjs/composition-api';
import { useTodoStore } from '@EXAMPLE/stores/store';
export default {
  components: { LastMonthCommit },
  setup() {
    const isLoaded = ref(false);
    onMounted(() => {
      getlist();

      // update();
    });

    const getlist = () => {
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

    const lastMonthDataCommit = computed(() => {
      return store.lastMonthDataCommit;
    });
    console.log('lastMonthDataCommit lastMonthDataCommit lastMonthDataCommit', lastMonthDataCommit.value);
    const lastMonthLabelsCommit = computed(() => {
      return store.lastMonthLabelsCommit;
    });

    console.log(' lastMonthLabelsCommit lastMonthLabelsCommit lastMonthLabelsCommit lastMonthLabelsCommit ', lastMonthLabelsCommit.value);
    return {
      getlist,
      lastMonthDataCommit,
      lastMonthLabelsCommit,
      // update,
      isLoaded,
    };
  },
};
</script>
<style>
.title {
  color: rebeccapurple;
}
</style>
