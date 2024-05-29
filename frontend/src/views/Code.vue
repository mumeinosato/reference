<template>
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
  
  </style>