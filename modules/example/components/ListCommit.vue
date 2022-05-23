<template>
  <div class="card">
    <h3 :style="{ marginLeft: '18px' }" class="title-commits">Builds</h3>
    <!-- <h3  class="title-commits">Builds</h3> -->
    <a-table :columns="columns" :data-source="commits" :pagination="true">
      <template slot="author" slot-scope="author">
        <div class="table-avatar-info">
          <img class="avatar-img" :src="author.avatar" />
          <div class="avatar-info">
            <h3>{{ author.name }}</h3>
            <a-tooltip>
              <template slot="eee">
                {{ author.message }}
              </template>
              <p class="author-msg">{{ author.message }}</p>
            </a-tooltip>
          </div>
        </div>
      </template>

      <template slot="build" slot-scope="build">
        <div class="author-info">
          <p class="build">{{ build }}</p>
        </div>
      </template>
      <template slot="status" slot-scope="status">
        <a-tag class="tag-status" :class="status ? 'ant-tag-green' : 'ant-tag-red'">
          <!-- :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'" -->
          {{ status }}
        </a-tag>
      </template>
      <template slot="date" slot-scope="date">
        <div class="date">
          <!-- <h6 class="m-0">{{ date.slice(0, 10) }}</h6> -->
          <p class="date">{{ date.slice(0, 18) }}</p>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script scoped lang="ts">
export default {
  props: ['commits', 'columns'],
  setup(props) {
    return {};
  },
};
</script>

<style scoped>
.table-avatar-info {
  display: flex;
  align-items: center;
}
.avatar-info {

  margin-left: 10px;
}
.date {
  font-weight: bold;
}
.author-msg {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100px;
}
.build {
  font-weight: 200;
}
.card {
  padding-left: 30px;
}

.avatar-img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
    margin-right:10px; 
}
</style>
