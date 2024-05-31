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
  
  </style>

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

<template>
  <div>
  <div v-if="isConnected">
    <div>
      <p v-if="rootUri">{{ rootUri }}</p>
      <button @click="getFileRootUri">Get Root URI</button>
    </div>
    <div>
      <textarea v-model="editorContent" @input="updateFile"></textarea>
    </div>
  </div>
  <div v-else>
    <p>Connecting to server...</p>
  </div>
</div>
</template>

<script>
import { MonacoServices } from "monaco-languageclient";

export default {
  data() {
    return {
      isConnected: false,
      rootUri: null,
      fileWebSocket: null,
    };
  },
  mounted() {
    this.connectToFileWebSocket();
  },
  methods: {
    connectToFileWebSocket() {
      const fileWebSocket = new WebSocket("ws://192.168.0.37:3030/file");
      fileWebSocket.onopen = () => {
        fileWebSocket.send(JSON.stringify({type: "get_rootUri"}));
      };
      fileWebSocket.onmessage = (ev) => {
        const message = JSON.parse(ev.data);
        if (message.result === "ok") {
          this.rootUri = message.data;
        } else {
          console.error("Error: ", message.error);
        }
        fileWebSocket.close();
        MonacoServices.install(monaco, {rootUri: this.rootUri});
        this.isConnected = true;
      };
    },
    getFileRootUri() {
      if(this.fileWebSocket && this.fileWebSocket.readyState === WebSocket.OPEN) {
        this.fileWebSocket.send(JSON.stringify({type: "get_rootUri"}));
      }
    },
    updateFile(filename, code) {
      const url = "ws://192.168.0.37:3030/file";
      if(!!this.fileWebSocket && this.fileWebSocket.readyState === WebSocket.OPEN) {
        this.fileWebSocket.send(JSON.stringify({type: "update", filename, code}));
      }else {
        this.fileWebSocket = new WebSocket(url);
        this.fileWebSocket.onopen = () => {
          this.fileWebSocket.send(JSON.stringify({type: "update", filename, code}));
        };
        this.fileWebSocket.onmessage = (ev) => {
          const message = JSON.parse(ev.data);
          if (message.result === "ok") {
            console.log("File updated successfully", filename);
          } else {
            console.error("Error: ", ev);
          }
        }
      }
    }
  }
}
</script>-->

<template>
  <div ref="editorContainer" style="width: 800px; height: 600px;"></div>
</template>

<script>
import { listen } from "@codingame/monaco-jsonrpc";
import { MonacoLanguageClient } from "monaco-languageclient";
import * as monaco from "monaco-editor";

export default {
  data() {
    return {
      monacoModel: null,
      fileWebSocket: null,
      rootUri: null,
      serverHost: "ws://192.168.0.37:3030",
      filename: "your-filename",
      language: "cpp", // or whatever language you're using
    };
  },
  mounted() {
    // Connect to WebSocket server
    this.connectToFileWebSocket();
    
    // Initialize Monaco Editor
    this.initMonacoEditor();
  },
  methods: {
    connectToFileWebSocket() {
      this.fileWebSocket = new WebSocket(`${this.serverHost}/file`);
      this.fileWebSocket.onopen = () => {
        this.fileWebSocket.send(JSON.stringify({ type: "get_rootUri" }));
      };
      this.fileWebSocket.onmessage = (ev) => {
        let message = JSON.parse(ev.data);
        if (message.result === "ok") {
          this.rootUri = message.data;
        } else {
          // handle error
        }
        this.fileWebSocket.close();
      };
    },
    initMonacoEditor() {
      monaco.editor.create(this.$refs.editorContainer, {
        value: "", // initial code value
        language: this.language,
        theme: "vs-dark", // or whatever theme you prefer
      });

      // Listen for model changes
      monaco.editor.getModels()[0].onDidChangeContent((e) => {
        if (this.language === "cpp") {
          console.log("Try to update file");
          this.updateFile(this.filename, monaco.editor.getModels()[0].getValue());
        }
      });
    },
    updateFile(filename, code) {
      let url = `${this.serverHost}/file`;
      if (this.fileWebSocket && this.fileWebSocket.readyState === this.fileWebSocket.OPEN) {
        this.fileWebSocket.send(JSON.stringify({ type: "update", filename, code }));
      } else {
        this.fileWebSocket = new WebSocket(url);
        this.fileWebSocket.onopen = (ev) => {
          ev.target.send(JSON.stringify({ type: "update", filename, code }));
        };
        this.fileWebSocket.onmessage = (ev) => {
          let message = JSON.parse(ev.data);
          if (message.result === "ok") {
            console.log("Update file success:", filename);
          } else {
            console.warn("Update file failed:", ev);
          }
        };
      }
    },
  },
};
</script>

