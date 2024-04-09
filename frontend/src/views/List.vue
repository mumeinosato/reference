<template>
  <div class="box">
    <draggable :list="re" @change="update">
    <div v-for="(item, index) in re" :key="index">
      <p>
        <router-link
          :to="{ name: 'view', params: { id: item.id, type: type } }"
          >{{ item.title }}</router-link
        >
      </p>
    </div>
  </draggable>
  </div>
</template>
        
        <script>
import { list, edit_list } from "../assets/script/api";
import { VueDraggableNext } from 'vue-draggable-next'

export default {
  components: {
    draggable: VueDraggableNext,
  },
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

    this.re.sort((a, b) => a.list - b.list);
  },
  methods: {
    async update(){
      for (let i = 0; i < this.re.length; i++) {
        const item = this.re[i];
        await edit_list(item.id, i + 1); // i + 1 は 1-indexed な list の値を表す
      }
    }
  },
  watch: {
    $route() {
      location.reload();
    },
  },
};
</script>

<style scoped>
p {
  margin: 5px;
}

p:hover {
  background-color: rgb(226, 232, 240);
}

.box {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>