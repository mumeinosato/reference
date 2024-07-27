<template>
  <!--<div class="container">
    <div class="side">
      <Sidebar />
    </div>
    <div class="main" ref="mainContent">
      <NuxtPage />
    </div>
  </div>-->
  <div>
    <a-layout hasSider>
      <Sidebar />
      <NuxtPage />
    </a-layout>
  </div>
</template>

<!--<style>
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
</style>-->
