<template>
    <a-layout style="margin-left: 200px; background-color: white">
      <a-layout-content class="content">
        <a-upload
          v-model:file-list="fileList"
          name="file"
          action=""
          :headers="headers"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            Click to Upload
          </a-button>
        </a-upload>
      </a-layout-content>
    </a-layout>
  </template>
  
  <script lang="ts">
  import { ref, defineComponent } from "vue";
  import { Buffer } from "buffer";
  import { message, Upload } from "ant-design-vue";
  import { UploadOutlined } from "@ant-design/icons-vue";
  import type { UploadChangeParam, UploadFile } from "ant-design-vue";
  
  export default defineComponent({
    name: "Listup",
    setup() {
      const fileList = ref<UploadFile[]>([]);
      const headers = {
        authorization: "authorization-text",
      };
  
      const beforeUpload = (file: UploadFile) => {
        const isCSV = file.type === "text/csv";
        if (!isCSV) {
          message.error("You can only upload CSV file!");
        }
        return isCSV ? true : Upload.LIST_IGNORE;
      };
  
      const handleChange = (info: UploadChangeParam) => {
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as ArrayBuffer;
            const base64 = Buffer.from(result).toString('base64');
            console.log(base64);
          };
          reader.readAsArrayBuffer(info.file.originFileObj as Blob);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      };
  
      return {
        handleChange,
        fileList,
        headers,
        beforeUpload,
      };
    },
  });
  </script>
  