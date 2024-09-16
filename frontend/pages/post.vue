<template>
  <a-layout class="ml-48 bg-white">
    <a-layout-content class="content">
      <div class="header">
        <div class="ml-5 mb-2">
          <h1 class="title text-3xl">{{ title }}</h1>
        </div>
        <span class="button-container">
          <a-button
            type="default"
            @click="toggleEdit"
            class="ml-2"
          >
            {{ edit ? "保存" : "編集" }}
          </a-button>
        </span>
      </div>
      <MonacoEditor
        v-model="content"
        :lang="lang"
        class="editor-container"
        :options="{ readOnly: !edit }"
      />
      <a-drawer
        title="実行"
        width="500"
        :open="open"
        :body-style="{ paddingBottom: '80px' }"
        :footer-style="{ textAlign: 'right' }"
        @close="onClose"
      >
        <a-form>
          <a-form-item label="入力">
            <a-textarea v-model:value="input" rows="4" />
          </a-form-item>
          <a-form-item>
            {{ time }}
          </a-form-item>
          <a-form-item label="出力">
            <a-textarea v-model:value="output" rows="4" readonly />
          </a-form-item>
        </a-form>
        <template #extra>
          <a-space>
            <a-button @click="onClose">キャンセル</a-button>
            <a-button type="primary" @click="run">実行</a-button></a-space
          >
        </template>
      </a-drawer>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import { data, run_script, edit as apiEdit } from "../assets/script/api";
import { useRoute } from "vue-router";
import { Buffer } from "buffer";
//import { useStore } from "../../../stores/store";

export default defineComponent({
  name: "View",
  setup() {
    const route = useRoute();
    const store = useStore();

    const id = ref(route.params.id as string);
    const type = ref(route.params.type as string);
    const title = ref<string>("");
    const content = ref<string>("");
    const lang = ref<string>("");
    const login = ref<boolean>(false);
    const clip = ref<string>("コピー");
    const input = ref<string>("");
    const output = ref<string>("");
    const rlang = ref<number>(0);
    const edit = ref<boolean>(false);
    const open = ref<boolean>(false);
    const time = ref<string>("");

    const isBase64 = (str: string) => {
      try {
        return btoa(atob(str)) === str;
      } catch (err) {
        return false;
      }
    };

    onMounted(async () => {
      const re = await data(Number(route.params.id));
      title.value = re.title;

      if (isBase64(re.content)) {
        content.value = Buffer.from(re.content, "base64").toString();
      } else {
        const temp = Buffer.from(re.content.replace(/<br>/g, "\n")).toString(
          "base64"
        );
        await apiEdit(
          Number(route.params.id),
          title.value,
          temp,
          Number(route.params.type)
        );
        location.reload();
      }

      lang.value = re.language;
      rlang.value = re.language;

      type.value = String(route.params.type);
      login.value = store.getLogin();
    });

    const toggleEdit = async () => {
      if (edit.value) {
        const cont = Buffer.from(content.value).toString("base64");
        const res: boolean = await apiEdit(
          Number(id.value),
          title.value,
          cont,
          Number(type.value)
        );
        if (res) {
          message.success("編集しました");
          location.reload();
        } else {
          message.error("編集に失敗しました");
        }
      }
      edit.value = !edit.value;
    };

    const copy = () => {
      navigator.clipboard.writeText(content.value);
      clip.value = "コピーしました";
      setTimeout(() => {
        clip.value = "コピー";
      }, 3000);
    };

    const run = async () => {
      const inputEncoded = Buffer.from(input.value).toString("base64");
      const codeEncoded = Buffer.from(content.value).toString("base64");
      const res = await run_script(inputEncoded, codeEncoded, rlang.value);
      if (res === false) {
        output.value = "実行に失敗しました";
        return;
      }
      output.value = Buffer.from(res.output, "base64").toString();
      time.value = "Time: " + (res.time * 1000).toFixed(2) + "ms\n"
    };

    const showrun = () => {
      open.value = true;
    };

    const onClose = () => {
      open.value = false;
    };

    return {
      id,
      type,
      title,
      content,
      lang,
      login,
      clip,
      input,
      output,
      rlang,
      toggleEdit,
      copy,
      run,
      edit,
      showrun,
      open,
      onClose,
      time,
    };
  },
  watch: {
    $route() {
      location.reload();
    },
  },
});
</script>

<style scoped>
.content {
  padding: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  margin: 0;
}

.button-container {
  margin-left: auto;
}
.editor-container {
  height: 90vh;
}
</style>