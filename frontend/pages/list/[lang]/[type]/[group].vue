<template>
  <a-layout style="margin-left: 200px; background-color: white">
    <a-layout-content class="m-10">
      <!--<div v-if="login">
        <div class="toggle_button">
          <input id="toggle" class="toggle_input" type='checkbox' v-model="edit" />
          <label for="toggle" class="toggle_label" />
        </div>
        <div class="box" v-show="edit">
          <draggable :list="re" @change="update">
            <div v-for="(item, index) in re" :key="index">
              <p>
                <router-link :to="{ name: 'view', params: { id: item.id, type: type } }">{{ item.title }}</router-link>
              </p>
            </div>
          </draggable>
        </div>
        <div class="box" v-show="!edit">
          <div v-for="(item, index) in re" :key="index">
            <p>
              <router-link :to="{ name: 'view', params: { id: item.id, type: type } }">{{ item.title }}</router-link>
            </p>
          </div>
        </div>
      </div>
      <div v-else>-->
      <div>
        <div class="box">
          <div v-for="(item, index) in re" :key="index">
            <p>
              <router-link :to="{ name: 'view', params: { id: item.id, type: type } }">{{ item.title }}</router-link>
            </p>
          </div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { list, edit_list } from '../assets/script/api';
import { VueDraggableNext } from 'vue-draggable-next';
import { useStore } from '../stores/store';

const route = useRoute();
const store = useStore();

const lpram = route.params.lang;
const lang = lpram === 'cpp' ? 1 : lpram === 'python' ? 2 : lpram === 'sql' ? 3 : 0;

const tpram = route.params.type;
const type = tpram === 'techful' ? 1 : tpram === 'aoj' ? 2 : 0;

const re = ref([]);
const edit = ref(false);
const login = ref(false);

onMounted(async () => {
  re.value = await list(lang, type, route.params.group);
  re.value.sort((a, b) => a.list - b.list);

  login.value = store.getLogin();
});

async function update() {
  for (let i = 0; i < re.value.length; i++) {
    const item = re.value[i];
    await edit_list(item.id, i + 1, type);
  }
}

watch(() => route.fullPath, () => {
  location.reload();
});

/*const re = ref([]);
const type = ref(null);
const edit = ref(false);
const login = ref(false);

const route = useRoute();
const store = useStore();

onMounted(async () => {
  let lang = 0;
  if (route.params.lang === 'cpp') {
    lang = 1;
  } else if (route.params.lang === 'python') {
    lang = 2;
  } else if (route.params.lang === 'sql') {
    lang = 3;
  }

  type.value = route.params.type === 'reference' ? 0
             : route.params.type === 'techful' ? 1
             : route.params.type === 'aoj' ? 2
             : null;

  re.value = await list(lang, type.value, route.params.group);
  re.value.sort((a, b) => a.list - b.list);

  login.value = store.getLogin();
});

async function update() {
  for (let i = 0; i < re.value.length; i++) {
    const item = re.value[i];
    await edit_list(item.id, i + 1, type.value);
  }
}

watch(() => route.fullPath, () => {
  location.reload();
});
*/
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