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
        <a-menu-item :key="'techful'">
          <nuxt-link to="/list">リスト</nuxt-link>
        </a-menu-item>
        
        <a-menu-item>
          <hr  class="border-black"/>
        </a-menu-item>

        <a-menu-item key="auth" v-if="!isLoggedIn">
            <nuxt-link to="/login">ログイン</nuxt-link>
        </a-menu-item>

        <!-- ログイン状態に応じた項目 -->
        <a-menu-item :key="'post'" v-if="isLoggedIn">
          <nuxt-link to="/post">投稿</nuxt-link>
        </a-menu-item>
        
        <a-menu-item :key="'logout'" v-if="isLoggedIn" class="text-left">
          <a-button type="text" @click="logout" class="text-left">ログアウト</a-button>
        </a-menu-item>
      </a-menu-item-group>
    </a-menu>
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { message } from 'ant-design-vue';
import { useStore } from '../stores/store'

export default defineComponent({
  name: 'Sidebar',
  setup() {
    const store = useStore()

    const logout = () => {
      store.setLogin(false)
      store.setUser('')
      message.success('ログアウトしました')
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