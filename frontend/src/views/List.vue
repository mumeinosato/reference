<template>
  <div v-if="login === true">
    <div class="toggle_button">
      <input id="toggle" class="toggle_input" type='checkbox' v-model="edit"/>
      <label for="toggle" class="toggle_label" />
    </div>
    <div class="box" v-show="edit === true">
      <draggable :list="re" @change="update">
        <div v-for="(item, index) in re" :key="index">
          <p>
            <router-link :to="{ name: 'view', params: { id: item.id, type: type } }">{{ item.title }}</router-link>
          </p>
        </div>
      </draggable>
    </div>  
    <div class="box" v-show="edit === false">
        <div v-for="(item, index) in re" :key="index">
          <p>
            <router-link :to="{ name: 'view', params: { id: item.id, type: type } }">{{ item.title }}</router-link>
          </p>
        </div>
    </div> 
  </div>
  <div v-else>
    <div class="box">
        <div v-for="(item, index) in re" :key="index">
          <p>
            <router-link :to="{ name: 'view', params: { id: item.id, type: type } }">{{ item.title }}</router-link>
          </p>
        </div>
    </div>
  </div>
</template>

<script>
import { list, edit_list } from "../assets/script/api";
import { VueDraggableNext } from 'vue-draggable-next'
import { useStore } from "../assets/script/store"

export default {
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    return {
      re: [], // データを保持する配列
      type: null,
      edit: false,
      login: false,
    };
  },
  async mounted() {
    let lang = this.$route.params.lang == "cpp" ? 1 : 2;
    this.type = this.$route.params.type == "reference" ? 0 : 1;
    this.re = await list(lang, this.type, this.$route.params.group);

    this.re.sort((a, b) => a.list - b.list);

    const store = useStore();
    this.login = store.getLogin();
  },
  methods: {
    async update() {
      for (let i = 0; i < this.re.length; i++) {
        const item = this.re[i];
        await edit_list(item.id, i + 1, this.type); 
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



.toggle_input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  opacity: 0;
  cursor: pointer;
}

.toggle_label {
  width: 55px;
  height: 25px;
  background: #ccc;
  position: relative;
  display: inline-block;
  border-radius: 40px;
  transition: 0.4s;
  box-sizing: border-box;
}

.toggle_label:after {
  content: "";
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  left: 0;
  top: 0;
  z-index: 2;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: 0.4s;
}

.toggle_input:checked+.toggle_label {
  background-color: #4BD865;
}

.toggle_input:checked+.toggle_label:after {
  left: 40px;
}

.toggle_button {
  position: absolute;
  right: 0;
  width: 75px;
  height: 30px;
  margin: auto;
  margin-bottom: 50px;
}
</style>style