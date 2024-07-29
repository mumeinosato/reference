<template>
  <a-layout style="margin-left: 200px; background-color: white">
    <a-layout-content class="m-10 mt-0">
      <div>
        <h1>
          {{ title }}
          <span>
            <p v-if="login">
              <nuxt-link
                :to="{ name: 'edit-id-type', params: { id: String(id), type: String(type) } }"
              >編集</nuxt-link>
            </p>
          </span>
        </h1>
        <div id="v_code" ref="code" @keydown.ctrl.a="selectText">
          <highlightjs language="cpp" :code="content" />
        </div>
        <p @click="copy">{{ clip }}</p>
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
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import { data, run_script, edit } from "../../../assets/script/api";
import { useRoute } from "vue-router";
import { Buffer } from "buffer";
import { useStore } from "../../../stores/store";

import hljs from "highlight.js/lib/core";
import cpp from "highlight.js/lib/languages/cpp";
import python from "highlight.js/lib/languages/python";
import sql from "highlight.js/lib/languages/sql";
import "highlight.js/styles/stackoverflow-light.css";

hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("python", python);
hljs.registerLanguage("sql", sql);

export default defineComponent({
  name: "View",
  setup() {
    const route = useRoute();
    const store = useStore();

    const id = ref(route.params.id);
    const type = ref(route.params.type);
    const title = ref("");
    const content = ref("");
    const lang = ref("");
    const login = ref(false);
    const clip = ref("コピー");
    const input = ref("");
    const output = ref("");
    const rlang = ref(0);
    const codeElement = ref<HTMLElement | null>(null);

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
        await edit(Number(route.params.id), title.value, temp, Number(route.params.type));
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

      if (codeElement.value) {
        hljs.highlightElement(codeElement.value);
      }
    });

    const selectText = () => {
      const range = document.createRange();
      const element = codeElement.value;
      if (element) {
        range.selectNodeContents(element);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
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
      codeElement,
      selectText,
      copy,
      run,
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
</style>