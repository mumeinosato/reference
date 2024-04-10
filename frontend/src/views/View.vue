<template>
  <div>
    <h1>{{ title }}
      <span>
        <p v-if="login === true">
          <router-link :to="{ name: 'edit', params: { id: id, type: type } }">編集</router-link>
        </p>
      </span>
    </h1>
    <!--<pre><code ref="code">{{ content }}</code></pre>-->
    <div ref="code" contenteditabl @keydown="keydown">
      <highlightjs :language="lang" :code="content"/>
    </div>
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
      login: false
    };
  },
  async mounted() {
    const re = await data(this.$route.params.id, this.$route.params.type);
    this.title = re.title;
    this.content = re.content.replace(/<br>/g, "\n");
    //this.lang = re.language === 1 ? "cpp" : "python";

    if(this.$route.params.type == "reference"){
      this.lang = 0;
    }else if(this.$route.params.type == "techful"){
      this.lang = 1;
    }else if(this.$route.params.type == "aoj"){
      this.lang = 2;
    }
    
    const store = useStore();
    this.login = store.getLogin();
  },
  methoods: {
    keydown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'a'){
        e.preventDefault();

        const editdiv = this.$refs.code;

        const range = document.createRange();
        range.selectNodeContents(editdiv);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
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
p{
  text-align: right;
}
</style>
