<template>
  <div>
    <!--<div v-if="login === true">-->
    <h1>
      {{ title }}
      <span>
        <p v-if="login === true">
          <router-link :to="{ name: 'edit', params: { id: id, type: type } }"
            >編集</router-link
          >
        </p>
      </span>
    </h1>
    <!--<pre><code ref="code">{{ content }}</code></pre>-->
    <div id="v_code" ref="code" @keydown.ctrl.a="selectText">
      <highlightjs :language="lang" :code="content" />
    </div>
    <p @click="copy">{{ clip }}</p>
    <div v-if="type === 1">
      <div class="in">
        <textarea v-model="input" rows="5" cols="50" class="input"></textarea>
        <div>
          <v-btn @click="run" class="btn">実行</v-btn>
        </div>
      </div>
      <hr>
      <div class="out">
        <textarea v-model="output" rows="5" cols="50" class="output" readonly></textarea>
      </div>
    </div>
    <!--</div>
  <div v-else>
    <p>ログインしないと見れないよ</p>
  </div>-->
  </div>
</template>
  
  <script>
import { useStore } from "../assets/script/store";
import { data, run_script, edit } from "../assets/script/api";
import { Buffer } from "buffer";
import hljs from "highlight.js/lib/core";

import cpp from "highlight.js/lib/languages/cpp";
import python from "highlight.js/lib/languages/python";
import sql from "highlight.js/lib/languages/sql";
import "highlight.js/styles/stackoverflow-light.css";
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("python", python);
hljs.registerLanguage("sql", sql);

export default {
  data() {
    return {
      id: this.$route.params.id,
      type: this.$route.params.type,
      title: "",
      content: "",
      lang: "",
      login: false,
      clip: "コピー",
      type: 0,
      input: "",
      output: "",
    };
  },
  async mounted() {
    const re = await data(this.$route.params.id, this.$route.params.type);
    this.title = re.title;
    
    if(this.isBase64(re.content)){
      this.content = Buffer.from(re.content, 'base64').toString();
    } else {
      const temp = Buffer.from(re.content.replace(/<br>/g, "\n")).toString('base64');
      await edit(this.$route.params.id, this.title, temp, this.$route.params.type);
      location.reload();
    }
    //this.content = re.content.replace(/<br>/g, "\n");
    //this.content = Buffer.from(re.content, 'base64').toString();
    if (re.language === 1) {
      this.lang = "cpp";
    } else if (re.language === 2) {
      this.lang = "python";
    } else if (re.language === 3) {
      this.lang = "sql";
    }

    this.type = parseInt(this.$route.params.type);

    const store = useStore();
    this.login = store.getLogin();
  },
  methods: {
    selectText() {
      const range = document.createRange();
      range.selectNodeContents(this.$refs.code);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    },
    copy() {
      navigator.clipboard.writeText(this.content);
      this.clip = "コピーしました";
    },
    async run() {
      const input = this.input.replace(/\n/g, "<br>");
      const res = await run_script(this.$route.params.id, input);
      if (res === false) {
        this.output = "実行に失敗しました";
        return;
      }
      this.output = "Time: " + (res.time * 1000).toFixed(2) + "ms\n" + res.output.replace(/<br>/g, "\n");
    },
    isBase64(str) {
      try {
        return btoa(atob(str)) == str;
      } catch (err) {
        return false;
      }
    },
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

.btn{
  background-color: rgb(51, 122, 183);
  border: 1px solid rgb(51, 122, 183);
  border-radius: 3px;
  color: rgb(255, 255, 255);
}

.in{
  margin-top: 20px;
  margin-bottom: 20px;
}

hr {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>