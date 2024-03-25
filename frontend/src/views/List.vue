<template>
  <div>
    <div v-for="(item, index) in re" :key="index">
      <p><router-link :to="{ name: 'view', params: { id: item.id, type: type } }">{{ item.title }}</router-link></p>
    </div>
  </div>
</template>
        
        <script>
import { list } from "../assets/script/api";

export default {
  data() {
    return {
      re: [], // データを保持する配列
      type: null,
    };
  },
  async mounted() {
    let lang = this.$route.params.lang == "cpp" ? 1 : 2;
    this.type = this.$route.params.type == "reference" ? 0 : 1;
    this.re = await list(lang, this.type, this.$route.params.group);
    this.$nextTick(() => {
      Prism.highlightAll();
    });
  },
  watch: {
    $route() {
      location.reload();
    },
  },
};
</script>

<style scoped>
p{
    margin: 5px;
}

p:hover{
    background-color: rgb(226, 232, 240);
}
</style>