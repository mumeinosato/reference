<template>
  <a-layout style="margin-left: 200px; background-color: white">
    <a-layout-content class="content">
      <div class="header">
        <h1 class="title">{{ title }}</h1>
        <span class="button-container">
          <a-button v-if="login" type="primary" @click="toggleEdit">
            {{ edit ? '保存' : '編集' }}
          </a-button>
        </span>
      </div>
      <MonacoEditor
        v-model="content"
        :lang="lang"
        class="editor-container"
        :options="{ readOnly: !edit }"
      />
        <!--<p @click="copy">{{ clip }}</p>
        <div v-if="Number(type) === 1">
          <div class="in">
            <textarea
              v-model="input"
              rows="5"
              cols="50"
              class="input"
            ></textarea>
            <div>
              <v-btn @click="run" class="btn">実行</v-btn>
            </div>
          </div>
          <hr />
          <div class="out">
            <textarea
              v-model="output"
              rows="5"
              cols="50"
              class="output"
              readonly
            ></textarea>
          </div>
        </div>-->
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { message } from 'ant-design-vue';
import { data, run_script, edit as apiEdit } from "../../../assets/script/api";
import { useRoute } from "vue-router";
import { Buffer } from "buffer";
import { useStore } from "../../../stores/store";

export default defineComponent({
  name: "View",
  setup() {
    const route = useRoute();
    const store = useStore();

    const id = ref(route.params.id as string);
    const type = ref(route.params.type as string);
    const title = ref<string>("");
    const content = ref<string>("");
    const lang = ref<string>("");
    const login = ref<boolean>(false);
    const clip = ref<string>("コピー");
    const input = ref<string>("");
    const output = ref<string>("");
    const rlang = ref<number>(0);
    const edit = ref<boolean>(false);

    const isBase64 = (str: string) => {
      try {
        return btoa(atob(str)) === str;
      } catch (err) {
        return false;
      }
    };

    onMounted(async () => {
      const re = await data(Number(route.params.id), Number(route.params.type));
      title.value = re.title;

      if (isBase64(re.content)) {
        content.value = Buffer.from(re.content, "base64").toString();
      } else {
        const temp = Buffer.from(re.content.replace(/<br>/g, "\n")).toString("base64");
        await apiEdit(
          Number(route.params.id),
          title.value,
          temp,
          Number(route.params.type)
        );
        location.reload();
      }

      if (re.language === 1) {
        lang.value = "cpp";
        rlang.value = 1;
      } else if (re.language === 2) {
        lang.value = "python";
        rlang.value = 2;
      } else if (re.language === 3) {
        lang.value = "sql";
        rlang.value = 3;
      }

      type.value = String(route.params.type);
      login.value = store.getLogin();
    });

    const toggleEdit = async () => {
      if (edit.value) {
        const cont = Buffer.from(content.value).toString("base64");
        const res: boolean = await apiEdit(Number(id.value), title.value, cont, Number(type.value));
        if (res) {
          message.success("編集しました");
          location.reload();
        } else {
          message.error("編集に失敗しました");
        }
      }
      edit.value = !edit.value;
    };

    const copy = () => {
      navigator.clipboard.writeText(content.value);
      clip.value = "コピーしました";
    };

    const run = async () => {
      const inputEncoded = Buffer.from(input.value).toString("base64");
      const codeEncoded = Buffer.from(content.value).toString("base64");
      const res = await run_script(inputEncoded, codeEncoded, rlang.value);
      if (res === false) {
        output.value = "実行に失敗しました";
        return;
      }
      const temp = Buffer.from(res.output, "base64").toString();
      output.value = "Time: " + (res.time * 1000).toFixed(2) + "ms\n" + temp;
    };

    return {
      id,
      type,
      title,
      content,
      lang,
      login,
      clip,
      input,
      output,
      rlang,
      toggleEdit,
      copy,
      run,
      edit,
    };
  },
  watch: {
    $route() {
      location.reload();
    },
  },
});
</script>

<style scoped>
.content {
  padding: 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  margin: 0;
}

.button-container {
  margin-left: auto;
}

p {
  text-align: right;
}

.input {
  border: 1px solid rgb(204, 204, 204);
  border-radius: 1px;
  width: 70%;
}

.output {
  border: 1px solid rgb(204, 204, 204);
  border-radius: 1px;
  background-color: rgb(238, 238, 238);
  width: 70%;
}

.btn {
  background-color: rgb(51, 122, 183);
  border: 1px solid rgb(51, 122, 183);
  border-radius: 3px;
  color: rgb(255, 255, 255);
}

.in {
  margin-top: 20px;
  margin-bottom: 20px;
}

hr {
  margin-top: 10px;
  margin-bottom: 10px;
}
.editor-container {
  height: 90vh;
}
</style>