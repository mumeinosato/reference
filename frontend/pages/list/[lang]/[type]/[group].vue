<template>
  <a-layout style="margin-left: 200px; background-color: white">
    <a-layout-content class="m-10 mt-0">
      <div>
        <div class="box">
          <div v-for="(item, index) in re" :key="index">
            <p>
              <nuxt-link v-bind:to="{ name: 'view-id-type', params: { id: item.id, type: type } }">{{ item.title
                }}</nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { list, edit_list } from '../assets/script/api'; // adjust the path as per your project structure
import { VueDraggableNext } from 'vue-draggable-next';
import { useStore } from '../stores/store';

interface ListItem {
  id: number;
  title: string;
}

export default defineComponent({
  name: 'List',
  components: {
    draggable: VueDraggableNext,
  },
  setup() {
    const route = useRoute();
    const lang = route.params.lang === 'cpp' ? 1 : route.params.lang === 'python' ? 2 : route.params.lang === 'sql' ? 3 : 0;
    const type = route.params.type === 'techful' ? 1 : route.params.type === 'aoj' ? 2 : 0;

    const re = ref<ListItem[]>([]);
    const store = useStore();
    const login = store.getLogin();
    const edit = ref(false);

    onMounted(async () => {
      re.value = await list(lang, type, route.params.group);
      re.value.sort((a, b) => a.id - b.id);
    });

    return {
      re,
      type,
      login,
      edit,
    };
  }
});
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
  left: 31px;
}

.toggle_button {
  position: absolute;
  right: 0;
  width: 75px;
  height: 30px;
  margin: auto;
  margin-bottom: 50px;
}
</style>