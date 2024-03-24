<template>
  <div>
    <div v-for="(item, index) in processedData" :key="index">
      <p>{{ item.title }}</p>
      <div>
        <pre><code class="language-cpp">{{ item.content }}</code></pre>
      </div>
    </div>
  </div>
</template>
  
  <script>
import Prism from "prismjs";
import "prismjs/themes/prism.css"; // 必要に応じて適切なテーマをインポート
import { data } from "../assets/script/api";

export default {
  data() {
    return {
      re: [], // データを保持する配列
      processedData: [], // 加工されたデータを保持する配列
    };
  },
  async mounted() {
    let lang = this.$route.params.lang == "cpp" ? 1 : 2;
    if (this.$route.params.type == "reference") {
      this.re = await data(lang, 0, 0, this.$route.params.num);
    } else if (this.$route.params.type == "techful") {
      this.re = await data(
        lang,
        1,
        this.$route.params.group,
        this.$route.params.num
      );
    }

    // データを加工し、別の変数に代入する
    this.processedData = this.re.map((item) => ({
      title: item.title,
      content: this.processContent(item.content), // データの加工処理を呼び出し
    }));
    this.$nextTick(() => {
      Prism.highlightAll();
    });
  },
  methods: {
    processContent(content) {
      return content.replace(/<br>/g, "\n");
    },
  },
  watch: {
    $route() {
      location.reload();
    },
  },
};
</script>
  