<template>
  <div>
      <div>
          <p>書くことがないから掲示板にしとく</p>
      </div>
      <div v-if="login === true">
        <div>
          <p><router-link to="/board">書き込む</router-link></p>
        </div>
      </div>
      <div v-else>
        <div>
          <p>ログインしないと見れないよ</p>
        </div>
      </div>
    </div>
</template>  

<script>
import { useStore } from "../assets/script/store"

export default{
  data() {
    return {
      login: false
    }
  },
  async mounted() {
    const store = useStore();
    this.login = store.getLogin();
  }
}
</script>
