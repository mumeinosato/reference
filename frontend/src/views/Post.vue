<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col>
                    <v-text-field v-model="title" label="タイトル"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-textarea v-model="content" label="内容"></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-select v-model="language" :items="['C++', 'Python']" label="言語"></v-select>
                </v-col>
                <v-col>
                    <v-select v-model="type" :items="['Reference', 'TechFul']" label="投稿先"></v-select>
                </v-col>
                <v-col v-if="type == 'TechFul'">
                    <v-select v-model="group" :items="['programming-basic', 'algorithm', 'math']" label="種類"></v-select>
                </v-col>
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
import { re_post, te_post } from "../assets/script/post";

export default {
  data() {
    return {
      title: "",
      content: "",
      language: "C++",
      type: "Reference",
      group: "",
    };
  },
  methods: {
    async submit() {
      let res = false;
      let lang = this.language == "C++" ? 1 : 2;
      if(this.title == "" || this.content == "") {
        alert("タイトルと内容を入力してください");
        return;
      }
      const cont = this.content.replace(/\n/g, '<br>');
      if (this.type == "Reference") {
        res = await re_post(this.title, cont, lang);
        if (res) {
          alert("投稿しました");
          location.reload();
        } else {
          alert("投稿に失敗しました");
        }
      } else if (this.type == "TechFul") {
        let gr = 0;
        if(this.group === "programming-basic") gr = 1;
        else if(this.group === "algorithm") gr = 2;
        else if(this.group === "math") gr = 3;
        res = await te_post(this.title, cont, lang, gr);
        if (res) {
          alert("投稿しました");
          location.reload();
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