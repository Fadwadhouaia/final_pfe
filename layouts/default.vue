<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh" v-if="!$route.name.includes('login')">
      <a-layout-sider v-model="collapsed" collapsible theme="light">
        <div class="logo"
         <img class="orange-logo" src="../static/assets/Orange_logo.svg" alt="" />
        <a-menu theme="light" :default-selected-keys="['Overview']" mode="inline">
          <a-menu-item key="Overview" @click="$router.push(localePath({ name: 'overview' }))">
            <a-icon type="appstore" />
            <span>Overview</span>
          </a-menu-item>
          <a-sub-menu key="Build">
            <span slot="title"
              ><a-icon type="project" />
              <span>Build</span>
            </span>
            <!-- houni nhottou l path mta3 lpage elli nhebou Apps thezzna liha ba3d "Apps" 9bal matetsaker >  -->
            <a-menu-item key="Apps" @click="$router.push(localePath({ name: 'apps' }))"> Apps </a-menu-item>
            <a-menu-item key="Modules" @click="$router.push(localePath({ name: 'modules' }))"> Modules </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="Distribution">
            <span slot="title">
              <a-icon type="container" />
              <span>Distribution</span>
            </span>
            <a-menu-item key="Groups" @click="$router.push(localePath({ name: 'groups' }))"> Groups </a-menu-item>
            <a-menu-item key="Releases" @click="$router.push(localePath({ name: 'releases' }))"> Releases </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="Analytics" @click="$router.push(localePath({ name: 'analytics' }))">
            <a-icon type="fund" />
            <span>Analytics</span>
          </a-menu-item>
          <a-menu-item key="Settings" @click="$router.push(localePath({ name: 'settings' }))">
            <a-icon type="hdd" />
            <span>Settings</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      
      <a-layout>
        <a-layout-header class="header"  >
          
         <img  src="../static/assets/logout.svg" alt="" v-on:click="logout" class="logout-img" />
         
        </a-layout-header>
        <a-layout-content style="margin: 10px 45px">
          <a-breadcrumb style="margin: 15px 0px 27px 51px">
            <a-breadcrumb-item>Tunisia</a-breadcrumb-item>
            <a-breadcrumb-item>My Orange</a-breadcrumb-item>
            <a-breadcrumb-item v-if="this.$route.name == 'apps___fr'"> Build </a-breadcrumb-item>
            <a-breadcrumb-item v-if="this.$route.name == 'apps___fr'"> Apps </a-breadcrumb-item>
            <a-breadcrumb-item v-if="this.$route.name == 'groups___fr'"> Distribution </a-breadcrumb-item>
            <a-breadcrumb-item v-if="this.$route.name == 'groups___fr'"> Groups </a-breadcrumb-item>
            <a-breadcrumb-item v-if="this.$route.name == 'modules___fr'"> Modules </a-breadcrumb-item>
            <a-breadcrumb-item v-if="this.$route.name == 'releases___fr'"> Releases </a-breadcrumb-item>
            <a-breadcrumb-item v-if="this.$route.name == 'overview___fr'"> Overview </a-breadcrumb-item>
            <a-breadcrumb-item v-if="this.$route.name == 'analytics___fr'"> Analytics </a-breadcrumb-item>
            <a-breadcrumb-item v-if="this.$route.name == 'settings___fr'"> Settings </a-breadcrumb-item>
          </a-breadcrumb>
          <div class="default" :style="{ minHeight: '360px', marginLeft: '50px' }">
            <!-- houni bch tji blaset ay page naaytoulha -->
            <DefaultLayout  >
              <nuxt />
            </DefaultLayout>
          </div>
        </a-layout-content>
        <!-- HOUNI nhottou l footer elli nhebou alih -->
        <a-layout-footer style="text-align: center"> </a-layout-footer>
      </a-layout>
    </a-layout>
    <div v-else>
      <nuxt />
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from '@vue/composition-api';
import { getCurrentInstance , onMounted} from '@nuxtjs/composition-api';
import VueRouter from 'vue-router';
export default defineComponent({

  setup() {
     const instance: any = getCurrentInstance()
     const logout = () => {
      console.log('gtrdrthydjyjt', instance?.proxy);
      instance?.proxy.$auth.logout()
      instance?.proxy.$router.push('login')
    
      
    };
    
    return {
      logout,
      collapsed: false,
    };
  },
});
</script>
<style lang="scss">
.logout-img {
  margin-top: 20px;
 float: right;
  width: 25px;
  height: 25px;
 
}
.header{
  background-color: white;
  width: 100%;
}
p {
  margin: 0px;
}
// .ant-layout-header {
// background: white;
// }

.ant-breadcrumb {
  font-weight: bold;
  margin: 0;
  padding: 0;
  color: rgb(0, 0, 0);
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum', 'tnum';
  color: rgb(0, 0, 0);
  font-size: 18px;
}
.ant-breadcrumb > span:last-child {
  color: black;
}
.ant-pagination-item-active a {
  color: #ffae18;
}
.ant-pagination-item-active {
  font-weight: 500;
  background: #fff;
  border-color: #ffae18;
}

#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

span.ant-breadcrumb-seperator {
  color: rgb(0, 0, 0);
}
.orange-logo {
  width: 80px;
  height: 80px;
  padding: 10px 0px 0px 30px;
}

.ant-menu-submenu-selected {
  color: #ffa640;
}
// .active{
//   background: #ede8be;
// }
.ant-select-open .ant-select-selection {
  border-color: #ff7043;
}
.ant-select-selection:hover {
  border-color: #ffa640;
}

.ant-select-focused .ant-select-selection,
.ant-select-selection:focus,
.ant-select-selection:active {
  border-color: #ff7043;
  box-shadow: #ff7043;
}

.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: #ff8a6575;
}
.ant-menu-item-selected {
  color: #ff7043;
}
.ant-breadcrumb-separator {
  color: black;
}

.ant-table-thead > tr > th {
  color: grey !important;
  background: white;
}

.ant-tabs-nav .ant-tabs-tab:hover {
  color: #ff7043;
}
.ant-menu-inline .ant-menu-item::after {
  border-right: 3px solid #ff7043;
}
.ant-menu-submenu-title:hover > span {
  color: #ff8a65 !important;
}

.ant-menu-submenu-title:hover {
  color: #ff8a65 !important;
}
.ant-menu-submenu-active {
  background-color: rgba(255, 138, 101, 0.45882);
}

.ant-menu-item:hover {
  color: #ff5722 !important;
}
.ant-menu-submenu-title:hover {
  color: #ff8a65 !important;
}

.ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before {
  background: #ff5722 !important;
}
.ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after {
  background: #ff5722 !important;
}

.ant-menu-submenu-title:active {
  background: #ffefea !important;
}

.ant-menu-item:active,
.ant-menu-submenu-title:active {
  background: #ffefea !important;
}
.ant-breadcrumb {
  font-size: 30px;
}
</style>
