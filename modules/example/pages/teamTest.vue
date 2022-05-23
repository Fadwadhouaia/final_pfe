<template>
  <div>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Groups">
        <a-table class="team-table" :columns="columns" :data-source="list">
          <!-- <a slot-scope="text">{{ text }}</a> -->
          <a slot="name" slot-scope="text, record, index">
            <div class="team_info">
              <h4>{{ record.name }}</h4>
              <h6
                @click="
                  () => {
                    imglength = record.member.length;
                    selectedIndex = index;
                  }
                "
              >
                {{ record.member.length }} Members
              </h6>
            </div>
          </a>
          <a slot="member" slot-scope="text, record, index" class="teams">
            <div class="list-member">
              <div class="img-avatar">
                <span v-if="selectedIndex == index">
                  <li class="li1" v-for="item in record.member.slice(0, imglength)" :key="item.id">
                    <a-tooltip>
                      <template slot="title">
                        {{ item.login }}
                      </template>
                      <img :src="item.avatar_url" alt="" class="imglength" />
                    </a-tooltip>
                  </li>
                </span>
                <span v-else>
                  <li class="slice" v-for="item in record.member.slice(0, 3)" :key="item.id">
                    <a-tooltip>
                      <template slot="title">
                        {{ item.login }}
                      </template>
                      <img :src="item.avatar_url" alt="" />
                    </a-tooltip>
                  </li>
                </span>
              </div>
            </div>
          </a>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Beta Testers"> Beta Testers </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import { useTodoStore } from '@EXAMPLE/stores/store';

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },

  {
    key: 'member',
    dataIndex: 'member',
    scopedSlots: { customRender: 'member' },
  },
  {
    key: 'numbers',
    dataIndex: 'numbers',
    scopedSlots: { customRender: 'numbers' },
  },
];
var imglength = 3;
var selectedIndex = 0;
export default {
  data() {
    return {
      columns,
      imglength,
      selectedIndex,
      list: [],
    };
  },
  methods: {
    getTeamsList: async function () {
      const store = useTodoStore();
      store.getTeamsMembers({
        onSuccess: (res) => {
          this.list = res;
        },
      });
    },
  },

  created() {
    this.getTeamsList();
  },
};
</script>

<style lang="scss">

.team-table > td > a.teams {

  flex-wrap: wrap;
}
.team-table .ant-table-thead {
  display: none;
}
.team-table .ant-table table {
    margin-left: 25px;
}
.img-avatar > span {
  display: flex;
  max-width: 700px;
  overflow: auto;
}

.img-avatar > span > li > img {
  width: 50px;
  margin: 5px;
  border-radius: 50%;
}
td {
  background-color: white !important;
}

h4:focus {
  color: #e64a19;
}

td:first-child {
  width: 300px;
}

@media screen and (max-width: 776px) {
  td:first-child {
    width: 70px;
  }
}

.list-member {
  span {
    margin-left: 10px;
    display: flex;
    flex-wrap: wrap;
    max-width: 650px;
  }
}
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
