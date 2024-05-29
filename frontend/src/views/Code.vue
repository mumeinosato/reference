<!--<template>
    <div ref="editor" class="editor-container"></div>
  </template>
  
  <script>
  import * as monaco from "monaco-editor";
  
  export default {
    name: "Editor",
    mounted() {
      this.editor = monaco.editor.create(this.$refs.editor, {
        value: `// Type source code in your language here...
  class MyClass {
    @attribute
    void main() {
      Console.writeln( "Hello world");
    }
  }`,
        language: "javascript", // テキストエディタ言語
        lineNumbers: "on", // 行番号表示
        roundedSelection: true, // 選択範囲を角丸に
        scrollBeyondLastLine: false, // 最終行以降のスクロール
        readOnly: false, // 読取専用
        theme: "vs-dark", // テーマ
        suggestOnTriggerCharacters: true,
        automaticLayout: true,
        quickSuggestions: true 
      });
    },
    beforeUnmount() {
      this.editor.dispose();
    },
  };
  </script>
  
  <style scoped>
  .editor-container {
    height: 400px;
  }
  
  </style>-->

<template>
  <div id ="app">
    <div id="editor"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import * as monaco from 'monaco-editor';

export default defineComponent({
  setup() {
    const editor = ref<monaco.editor.IStandaloneCodeEditor | null>(null);
    const ws = new WebSocket('ws://192.168.0.37:3000');

    onMounted(() =>{
      initMonaco();
      initWebSocket();
    });

    function initMonaco() {
      editor.value = monaco.editor.create(document.getElementById('editor')!, {
        value:`#include <iostream>\n\nint main() {\n    std::cout << "Hello, world!" << std::endl;\n    return 0;\n}`,
        language: 'cpp',
        theme: 'vs-dark',
      });

      editor.value.onDidChangeModelContent(() => {
        if (ws.readyState === WebSocket.OPEN) {
          const code = editor.value.getValue();
          ws.send(code);
        }
      });
    }

    function initWebSocket() {
      ws.onopen = () => {
        console.log('WebSocket connected');
      };
      
      ws.onmessage = (event) => {
        console.log('Message from server:', event.data);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }

    return {
      editor,
    };
  }
})
</script>

<style>
#editor {
  width: 100%;
  height: 90vh;
}
</style>