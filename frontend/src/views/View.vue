<template>
  <div>
    <!--<div v-if="login === true">-->
    <h1>{{ title }}
      <span>
        <p v-if="login === true">
          <router-link :to="{ name: 'edit', params: { id: id, type: type } }">編集</router-link>
        </p>
      </span>
    </h1>
    <!--<pre><code ref="code">{{ content }}</code></pre>-->
    <div id="v_code" ref="code" @keydown.ctrl.a="selectText">
      <highlightjs :language="lang" :code="content"/>
    </div>
    <p @click="copy">{{ clip }}</p>
  <!--</div>
  <div v-else>
    <p>ログインしないと見れないよ</p>
  </div>-->
  </div>
</template>
  
  <script>
  import { useStore } from "../assets/script/store"
import { data } from "../assets/script/api";
import hljs from 'highlight.js/lib/core';

import cpp from "highlight.js/lib/languages/cpp";
import python from "highlight.js/lib/languages/python";
import 'highlight.js/styles/stackoverflow-light.css'
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("python", python);

export default {
  data() {
    return {
      id: this.$route.params.id,
      type: this.$route.params.type,
      title: "",
      content: "",
      lang: "",
      login: false,
      clip: "コピー"
    };
  },
  async mounted() {
    const re = await data(this.$route.params.id, this.$route.params.type);
    this.title = re.title;
    this.content = re.content.replace(/<br>/g, "\n");
    this.lang = re.language === 1 ? "cpp" : "python";
    
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
      console.log('copy');
      navigator.clipboard.writeText(this.content);
      this.clip = "コピーしました";
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
p{
  text-align: right;
}
</style>
