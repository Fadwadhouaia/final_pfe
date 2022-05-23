<template>
  <div class="BrancheCommit">
    <div class="RepoBranch">
      <div class="repolist">
        <ListRepo v-if="isLoadedGitRepos" :data="repoList" @onChangeRepoList="useOnChangeRepoList" />
      </div>
      <div class="branchlist">
        <ListBranch @clicked="onClickBranch" :data="List"  />
      </div>
    </div>
    <div class="commitlist">
      <CommitList v-if="isCommitsLoaded" :data="commitsList" />
    </div>
  </div>
</template>
<script lang="ts">
import { useTodoStore } from '@EXAMPLE/stores/store';
import { computed, onMounted, reactive, ref } from '@nuxtjs/composition-api';
import ListBranch from './ListBranch.vue';
import ListRepo from './ListRepo.vue';
import CommitList from './commitList.vue';
export default {
  components: { ListBranch, CommitList, ListRepo },
  setup() {
    const isMounted = ref(true);
    const branchName = ref('');
    const formData = reactive({
      name: '',
      protected: '',
    });
    const loaded = ref(true);
    const isCommitsLoaded = ref(false);
    const store: any = useTodoStore();
    onMounted(() => {
      // getlist();
      getRepoList();
    });

    const List = ref([]); /////
    const gitRepoName = ref('');
    const isLoadedGitRepos = ref(false);
    const repoList = ref([]);
    const commitsList = ref([]);
    const repositories = computed(() => {
      console.log('reposbvihtjgvphj', store.repositories);
      return store.repositories;
    });
    // const gitBranchesList = computed(() => {
    //   return store.gitBranchesList;
    // });
    const useOnChangeRepoList = (repoName: any) => {
      getgitBranchList(repoName);
      gitRepoName.value = repoName;
    };

    const getgitBranchList = (repoName: any) => {
      store.getgitBranchList({
        repoName: repoName,
        onError: () => {
          console.log('error');
        },
        onSuccess: (res: any) => {
          List.value = res;
          loaded.value = true;
          getCommits(repoName, isMounted ? res[0].name : branchName);
          isMounted.value = false;
        },
      });
    };
    const onClickBranch = (value: any) => {
      branchName.value = value;
      getCommits(gitRepoName.value, value);
    };

    const getRepoList = () => {
      store.getGitRepos({
        onError: () => {
          console.log('error');
        },
        onSuccess: (res) => {
          repoList.value = res;
          isLoadedGitRepos.value = true;
          gitRepoName.value = res[0].name;
          getgitBranchList(res[0].name);
        },
      });
    };

    const getCommits = (repoName: any, branchName: any) => {
      console.log('REPOOOOOOOOOOOOOOOOOOOOO', repoName);
       store.tableWorkFlowList({
        // store.tablecommitList ({
        repoName,
        branchName,
        onSuccess: (res: any) => {
          commitsList.value = res;
          isCommitsLoaded.value = true;
        },
      });
    };
    return {
      List,
      formData,
      loaded,
      useOnChangeRepoList,
      branchName,
      onClickBranch,
      repositories,
      repoList,
      isLoadedGitRepos,
      commitsList,
      isCommitsLoaded,
      isMounted,
    };
  },
};
</script>
<style lang="scss" scoped>
.repolist {
  // margin-left: 10px;
  padding: 0 10px 0 10px;
  margin-top: 70px;
}
.RepoBranch {
  min-width: 30%;
  flex-wrap: wrap;
}
.BrancheCommit {
  display: flex;
  width: 100%;
}
.ant-table-thead {
  display: table-header-group;
}
.branchlist {
  margin-top:40px;
  //  border-right: 2px solid #dadada;
  width: 100%;
  padding-bottom: 50px;
}

.commitlist {
   border-left: 2px solid #dadada;
  width: 100%;
}

@media screen and (max-width: 776px) {
  .BrancheCommit {
    flex-direction: column;
  }
  .branchlist {
    width: 100%;
   
    border-right: none;
    padding-bottom: 30px;
  }
  .commitlist {
    margin-top: 30px;
    width: 100%;
  }
  .repolist {
    margin-top: 30px;
    width: 30%;
  }
}
.BrancheCommit {
  min-height: 520px;
  background: white;
}


.ant-select-dropdown-menu-item:hover:not(.ant-select-dropdown-menu-item-disabled) {
    background-color: #fff6e6;
}

</style>
