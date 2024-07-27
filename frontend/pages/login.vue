<template>
  <a-layout style="margin-left: 200px">
    <a-layout-content style="background-color: white">
      <a-card class="m-10 text-left" style="max-width: 500px">
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
          @submit.prevent
        >
          <a-form-item
            label="ユーザー名"
            name="username"
            :rules="[
              { required: true, message: 'ユーザー名を入力してください' },
            ]"
          >
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item
            label="パスワード"
            name="password"
            :rules="[
              { required: true, message: 'パスワードを入力してください' },
            ]"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { message } from 'ant-design-vue';
import { useStore } from "../stores/store";
import { login } from "../assets/script/api";

export default defineComponent({
  name: "FormComponent",
  setup() {
    interface FormState {
      username: string;
      password: string;
    }

    const formState = reactive<FormState>({
      username: "",
      password: "",
    });

    const onFinish = async (values: any) => {
      const re = await login(formState.username, formState.password);
      const store = useStore();
      if (re === 0) {
        try {
          store.setLogin(true);
          store.setUser(formState.username);
          message.success("ログイン成功");
          window.location.href = '/';
        } catch (error) {
          message.error("ログイン失敗");
          store.setLogin(false);
        }
      } else if (re === 1) {
        message.error("パスワードが設定されていません");
        window.location.href = '/sign_up';
        store.setLogin(false);
      } else {
        message.error("ログイン失敗");
        store.setLogin(false);
      }
    };

    const onFinishFailed = (errorInfo: any) => {
      message.error("エラーが発生しました");
    };

    return {
      formState,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>
