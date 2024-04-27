<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="title"
            label="タイトル"
            class="title"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-select v-model="label" :items="['bug', 'enhancement']" label="カテゴリ"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
            v-model="content"
            label="内容"
            class="cont"
            row-height="10"
            rows="5"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>

      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="submit">投稿</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { useStore } from "../../assets/script/store";
import { createIssue } from "../../assets/script/github/octokit";

export default {
  data() {
    return {
      title: "",
      content: "",
      label: "bug",
    };
  },
  async mounted() {
    const store = useStore();
    this.name = store.getName();
  },
  methods: {
    async submit() {
      const re = await createIssue(this.title, this.content, this.label);
      if (re === true) {
        alert("投稿しました");
        this.$router.push("/issue");
      }else{
        alert("投稿に失敗しました");
      }
    },
  },
};
</script>

<style scoped>
.title {
  width: 300px;
}

textarea {
  width: 300px;
}
</style>