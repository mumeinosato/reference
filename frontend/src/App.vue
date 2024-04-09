<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div class="container">
    <div class="side">
      <Sidebar />
    </div>
    <div class="main" ref="mainContent">
      <RouterView />
    </div>
  </div>
</template>

<style>
  .container {
    display: flex;
    width: 100%;
    min-height: 100vh;
    align-items: stretch;
    overflow-x: hidden;
  }
  .side {
    background-color: rgb(226, 232, 240);
    width: 230px;
  }
  .main {
    width: 80%;
    margin: 20px;
    height: fit-content;
    overflow-y: auto;
  }
</style>
