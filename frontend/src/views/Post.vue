<template>
  <form>
    <div class="form-content">
      <div class="cont">
        <label for="title">タイトル</label><br />
        <v-text-field v-model="title"></v-text-field>
      </div>
      <div class="cont">
        <label for="content">内容</label><br />
        <v-textarea v-model="content"></v-textarea>
      </div>
      <div class="cont">
        <label for="language">言語</label><br />
        <v-select v-model="language" :items="['c++', 'python']"></v-select>
      </div>
      <div class="cont">
        <label for="type">投降先</label><br />
        <v-select v-model="type" :items="['reference', 'techful']"></v-select>
      </div>
      <div class="cont">
        <label for="group">種類</label><br />
        <v-select
          v-model="group"
          :items="['programming-basic', 'algorithm', 'math']"
        ></v-select>
      </div>
      <div class="cont btn-d">
        <input type="submit" value="投降" class="btn" @click="submit">
      </div>
    </div>
  </form>
</template>

<script>
import { re_post, te_post } from "../assets/script/post";

export default {
  data() {
    return {
      title: "",
      content: "",
      language: "",
      type: "",
      group: "",
    };
  },
  methods: {
    async submit() {
      let res = false;
      let lang = this.language == "c++" ? 1 : 2;
      if (this.type == "reference") {
        res = await re_post(this.title, this.content, lang);
        if (res) {
          alert("投稿しました");
        } else {
          alert("投稿に失敗しました");
        }
      } else if (this.type == "techful") {
        let gr = 0;
        if ((this.group = "programming-basic")) gr = 1;
        else if ((this.group = "algorithm")) gr = 2;
        else if ((this.group = "math")) gr = 3;
        res = await te_post(this.title, this.content, lang, gr);
        if (res) {
          alert("投稿しました");
        } else {
          alert("投稿に失敗しました");
        }
      }
    },
  },
};
</script>


<style scoped>
form {
  border: 1px solid #000;
  border-radius: 10px;
}

h2 {
  text-align: center;
  font-size: 25px;
}

.form-content {
  margin-top: 20px;
}

.cont {
  margin: 20px;
  margin-left: 50px;
  margin-right: 50px;
}

input,
textarea {
  border: 1.5px solid rgb(107, 114, 128);
  width: 100%;
  border-radius: 5px;
}

select {
  border: 1.5px solid rgb(107, 114, 128);
  border-radius: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 5px;
  padding-right: 5px;
}

.btn {
  background-color: skyblue;
  border: none;
}

.btn-d {
  text-align: right;
  width: 60px;
}
</style>