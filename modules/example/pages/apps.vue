<template>
  <div>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Branches">
       <BranchList />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Master" force-render>
        Content of Tab Pane 2
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import BranchList from '../components/branchList.vue';

export default {
     components: { BranchList },
  props: [],
  setup(props) {
    return {};
  },
};
</script>
<style lang="scss">
.ant-tabs-nav .ant-tabs-tab-active {
  color: #ff8a65;
  text-shadow: 0 0 0.25px currentColor;
}
.ant-tabs-ink-bar {

  background-color: #ff7043;
}

.ant-tabs-nav-scroll {
  padding-left: 40px;
}

</style>
