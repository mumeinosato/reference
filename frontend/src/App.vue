<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div class="container">
    <div class="side">
      <Sidebar />
    </div>
    <div class="main">
      <RouterView />
    </div>
  </div>
</template>

<style>
  .container {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .side {
    background-color: rgb(226, 232, 240);
    width: 200px;
    height: 100%;
  }
  .main {
    width: 80%;
    margin: 20px;
  }
</style>
