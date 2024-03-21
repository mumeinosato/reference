<template>
    <div>
      <!-- Prism.js を適用するコードブロック -->
      <pre><code class="language-javascript">{{ code }}</code></pre>
    </div>
  </template>
  
  <script>
  import Prism from 'prismjs';
  import 'prismjs/themes/prism.css'; // 必要に応じて適切なテーマをインポート
  
  export default {
    data() {
      return {
        code: `console.log('Hello, Prism!');`
      };
    },
    mounted() {
      Prism.highlightAll();
    }
  }
  </script>
  