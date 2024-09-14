<template>
  <a-layout-sider
    style="overflow: auto; height: 100vh; position: fixed; left: 0; top: 0; bottom: 0; background-color: rgb(226, 232, 240);"
  >
    <a-menu
      theme="light"
      mode="inline"
      :default-selected-keys="['1']"
    >
      <a-menu-item-group style="height: 100vh; background-color: rgb(226, 232, 240)">
        <a-menu-item :key="'home'">
          <nuxt-link to="/">ホーム</nuxt-link>
        </a-menu-item>
        <!-- TechFUL (C++) -->
        <a-menu-item :key="'techful'">
          
        </a-menu-item>
        <!--
        <a-menu-item :key="'techful-cpp'" disabled>
          <span class="main-title">TechFUL(C++)</span>
        </a-menu-item>
        <a-menu-item :key="'techful-cpp-1'">
          <nuxt-link to="/list/cpp/techful/1">プログラミング基礎</nuxt-link>
        </a-menu-item>
        <a-menu-item :key="'techful-cpp-2'">
          <nuxt-link to="/list/cpp/techful/2">アルゴリズム</nuxt-link>
        </a-menu-item>
        <a-menu-item :key="'techful-cpp-3'">
          <nuxt-link to="/list/cpp/techful/3">数学</nuxt-link>
        </a-menu-item> -->
        
        
        <!-- TechFUL (Python) -->
         <!--
        <a-menu-item :key="'techful-python'" disabled>
          <span class="main-title">TechFUL(Python)</span>
        </a-menu-item>
        <a-menu-item :key="'techful-python-1'">
          <nuxt-link to="/list/python/techful/1">プログラミング基礎</nuxt-link>
        </a-menu-item>
        <a-menu-item :key="'techful-python-2'">
          <nuxt-link to="/list/python/techful/2">アルゴリズム</nuxt-link>
        </a-menu-item>
        <a-menu-item :key="'techful-python-3'">
          <nuxt-link to="/list/python/techful/3">数学</nuxt-link>
        </a-menu-item> -->
        
        <!-- その他の項目 -->
         <!--
        <a-menu-item :key="'database'">
          <nuxt-link to="/list/sql/techful/4">データベース</nuxt-link>
        </a-menu-item>
        <a-menu-item :key="'ai-basics'">
          <nuxt-link to="/list/python/techful/5">人工知能基礎</nuxt-link>
        </a-menu-item>
        <a-menu-item :key="'aoj'">
          <nuxt-link to="/list/cpp/aoj/0">AOJ</nuxt-link>
        </a-menu-item> -->
        
        <a-menu-item :key="'divider-1'" disabled>
          <hr />
        </a-menu-item>

        <!-- ログイン状態に応じた項目 -->
        <a-menu-item :key="'post'" v-if="isLoggedIn">
          <nuxt-link to="/post">投稿</nuxt-link>
        </a-menu-item>
        
        <a-menu-item :key="'divider-2'" disabled>
          <hr />
        </a-menu-item>
        
        <a-menu-item :key="'auth'" v-if="!isLoggedIn">
          <v-btn flat>
            <nuxt-link to="/login">ログイン</nuxt-link>
          </v-btn>
        </a-menu-item>
        <a-menu-item :key="'logout'" v-else>
          <v-btn flat @click="logout">ログアウト</v-btn>
        </a-menu-item>
      </a-menu-item-group>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '../stores/store'

export default defineComponent({
  name: 'Sidebar',
  setup() {
    const store = useStore()

    const logout = () => {
      store.setLogin(false)
      store.setUser('')
      alert('ログアウトしました')
      window.location.href = '/'
    }

    return {
      isLoggedIn: store.getLogin(),
      logout
    }
  }
});
</script>


<style>
.demo-logo-vertical {
  height: 32px;
  background: #fff;
  margin: 16px;
}
</style>