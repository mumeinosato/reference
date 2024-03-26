<template>
  <div class="sidebar">
    <h2 class="titile"><router-link to="/">サイドバー</router-link></h2>
    <div class="content">
      <ul>
        <li class="main-title">リファレンス</li>
        <ul>
          <li class="sub-title"><router-link to="/list/cpp/reference/1">C++</router-link></li>
          <li class="sub-title"><router-link to="/list/python/reference/1">Python</router-link></li>
        </ul>
        <li class="main-title">Tech Full(C++)</li>
        <ul>
          <li class="sub-title"><router-link to="/list/cpp/techful/1">プログラミング基礎</router-link></li>
          <li class="sub-title"><router-link to="/list/cpp/techful/2">アルゴリズム</router-link></li>
          <li class="sub-title"><router-link to="/list/cpp/techful/3">数学</router-link></li>
        </ul>
        <li class="main-title">Tech Full(Python)</li>
        <ul>
          <li class="sub-title"><router-link to="/list/python/techful/1">プログラミング基礎</router-link></li>
          <li class="sub-title"><router-link to="/list/python/techful/2">アルゴリズム</router-link></li>
          <li class="sub-title"><router-link to="/list/pytnon/techful/3">数学</router-link></li>
        </ul>
        <li class="main-title"><router-link to="/post">投降</router-link></li>
      </ul>
    </div>
  </div>
</template>

<style>
  .sidebar{
    margin: 10%;
  }

  .titile{
    font-size: 20px;
    padding: 10px;
    padding-bottom: 0px;
  }

  .content{
    padding: 15px;
  }

  .main-title{
    margin-top: 10px;
  }

  .sub-title{
    padding-left: 10px;
  }
</style>