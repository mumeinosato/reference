<template>
  <div>
    <h1>{{ title }}</h1>
    <!--<pre><code ref="code">{{ content }}</code></pre>-->
    <highlightjs :language="lang" :code="content"/>
  </div>
</template>
  
  <script>
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
      title: "",
      content: "",
      lang: "",
    };
  },
  async mounted() {
    const re = await data(this.$route.params.id, this.$route.params.type);
    this.title = re.title;
    this.content = re.content.replace(/<br>/g, "\n");
    this.lang = re.language === 1 ? "cpp" : "python";
  },
  watch: {
    $route() {
      location.reload();
    },
  },
};
</script>
