<template>
  <div class="sidebar">
    <h2 class="titile">サイドバー</h2>
    <div class="content">
      <ul>
        <li class="main-title"><router-link to="/">リファレンス</router-link></li>
        <ul>
          <li class="sub-title">C++</li>
          <li class="sub-title">Python</li>
        </ul>
        <li class="main-title"><router-link to="/about">Tech Full(C++)</router-link></li>
        <ul>
          <li class="sub-title">プログラミング基礎</li>
          <li class="sub-title">アルゴリズム</li>
          <li class="sub-title">数学</li>
        </ul>
        <li class="main-title"><router-link to="/contact">Tech Full(Python)</router-link></li>
        <ul>
          <li class="sub-title">プログラミング基礎</li>
          <li class="sub-title">アルゴリズム</li>
          <li class="sub-title">数学</li>
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