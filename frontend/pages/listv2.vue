<template>
  <a-layout style="margin-left: 200px; background-color: white">
    <a-layout-content class="m-10 mt-0">
      <a-space>
        <a-select
          ref="lang"
          style="width: 120px"
          @change="langChange"
          v-model:value="required.lang"
        >
          <a-select-option value="cpp">C++</a-select-option>
          <a-select-option value="python">Python</a-select-option>
          <a-select-option value="c">C</a-select-option>
          <a-select-option value="java">Java</a-select-option>
          <a-select-option value="ruby">Ruby</a-select-option>
          <a-select-option value="sql">SQL</a-select-option>
        </a-select>
        <a-select
          ref="type"
          style="width: 200px"
          @change="typeChange"
          v-model:value="required.type"
        >
          <template v-if="required.lang !== 'sql'">
            <a-select-option value= "1" >プログラミング基礎</a-select-option>
            <a-select-option value= "2" >アルゴリズム</a-select-option>
            <a-select-option value= "3" >数学</a-select-option>
            <a-select-option v-if="required.lang === 'python'" value= "5"
              >人工知能</a-select-option
            >
          </template>
          <a-select-option v-else value= "4"
            >データベース</a-select-option
          >
        </a-select>
      </a-space>
      <div class="box">
        <div v-for="(item, index) in re" :key="index">
          <p>
            <!--<nuxt-link
              v-bind:to="{
                name: 'view-id-type',
                params: { id: item.id, type: required.type },
              }"
              >{{ item.title }}</nuxt-link
            >-->
            {{ item.title }}
          </p>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent, reactive } from "vue";
import { list } from "./../assets/script/api";

export default defineComponent({
  name: "ListV2",
  setup() {
    interface required {
      lang: string;
      type: string;
    }

    const required = reactive<required>({
      lang: "cpp",
      type: "1",
    });

    interface ListItem {
      id: number;
      title: string;
    }

    onMounted(async () => {
      await getList();
    });

    const langChange = async () => {
      if (required.lang === "sql") {
        required.type = "4";
      } else if (required.lang === "python") {
        if (required.type !== "4") {
          required.type = "1";
        }
      } else {
        if (required.type === "4" || required.type === "5") {
          required.type = "1";
        }
      }
      await getList();
    };

    const typeChange = async () => {
      await getList();
    };

    const re = ref<ListItem[]>([]);

    const getList = async () => {
      re.value = await list(required.lang, parseInt(required.type));
      re.value.sort((a, b) => a.id - b.id);
    };

    return {
      required,
      langChange,
      typeChange,
      re,
    };
  },
});
</script>