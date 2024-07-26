<template>
  <div class="sidebar">
    <h2 class="titile"><router-link to="/">サイドバー</router-link></h2>
    <div class="content">
      <ul>
        <!--<li class="main-title"><a href="https://example.com">リファレンス</a></li>
        <ul>
          <li class="sub-title"><router-link to="/list/cpp/reference/1">C++</router-link></li>
          <li class="sub-title"><router-link to="/list/python/reference/1">Python</router-link></li>
        </ul>-->
        <li class="main-title">TechFUL(C++)</li>
        <ul>
          <li class="sub-title"><router-link to="/list/cpp/techful/1">プログラミング基礎</router-link></li>
          <li class="sub-title"><router-link to="/list/cpp/techful/2">アルゴリズム</router-link></li>
          <li class="sub-title"><router-link to="/list/cpp/techful/3">数学</router-link></li>
        </ul>
        <li class="main-title">TechFUL(Python)</li>
        <ul>
          <li class="sub-title"><router-link to="/list/python/techful/1">プログラミング基礎</router-link></li>
          <li class="sub-title"><router-link to="/list/python/techful/2">アルゴリズム</router-link></li>
          <li class="sub-title"><router-link to="/list/python/techful/3">数学</router-link></li>
        </ul>
        <li class="main-title"><router-link to="/list/sql/techful/4">データベース</router-link></li>
        <li class="main-title"><router-link to="/list/python/techful/5">人工知能基礎</router-link></li>
        <li class="main-title"><router-link to="/list/cpp/aoj/0">AOJ</router-link></li>
        <li class="main-title">
          <hr>
        </li>
        <li class="main-title" v-if="this.login === true"><router-link to="/post">投稿</router-link></li>
        <li class="main-title">
          <hr>
        </li>
        <li class="main-title" v-if="this.login === false">
          <v-btn flat><router-link to="/login">ログイン</router-link></v-btn>
        </li>
        <li class="main-title" v-else>
          <v-btn flat @click="logout">ログアウト</v-btn>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from "../src/assets/script/store"

export default{
  data() {
    return {
      login: false
    }
  },
  methods: {
    logout() {
      const store = useStore();
      store.setLogin(false);
      store.setUser("");
      alert("ログアウトしました");
      this.$router.go("/");
    }
  },
  async mounted() {
    const store = useStore();
    this.login = store.getLogin();
  }
}
</script>


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