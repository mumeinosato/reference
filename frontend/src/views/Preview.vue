<template>
  <div>
    <h1>{{ title }}</h1>
    <pre><code class="language-javascript">{{ content }}</code></pre>
  </div>
</template>
  
  <script>
import Prism from "prismjs";
import "prismjs/themes/prism.css"; // 必要に応じて適切なテーマをインポート
import { data } from "../assets/script/api";

export default {
  data () {
    return {
      title: "",
      content: "",
    };
  },
  async mounted(){
    const re = await data(this.$route.params.id, this.$route.params.type)
    this.title = re.title;
    this.content = re.content.replace(/<br>/g, "\n");
    this.$nextTick(() => {
      Prism.highlightAll();
    });
  },
  watch: {
    $route() {
      location.reload();
    },
  },
}
</script>
