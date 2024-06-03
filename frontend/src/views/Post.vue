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
                <v-col v-if="type === 'Reference' || group === 'programming-basic' || group === 'algorithm' || group === 'math'">
                    <v-select v-model="language" :items="['C++', 'Python']" label="言語"></v-select>
                </v-col>
                <v-col>
                    <v-select v-model="type" :items="['TechFul', 'AOJ']" label="投稿先"></v-select>
                </v-col>
                <v-col v-if="type == 'TechFul'">
                    <v-select v-model="group" :items="['programming-basic', 'algorithm', 'math', 'database', 'ai-basic']" label="種類"></v-select>
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
import { re_post, te_post, aoj_post } from "../assets/script/post";
import { useStore } from "../assets/script/store";
import { Buffer } from "buffer";

export default {
  data() {
    return {
      title: "",
      content: "",
      language: "C++",
      // type: "Reference",
      type: "TechFul",
      group: "programming-basic",
      //group: "algorithm"
    };
  },
  async mounted() {
    const store = useStore();
    this.language = store.getLanguage();
    this.type = store.getType();
    this.group = store.getGroup();
  },
  methods: {
    async submit() {
      let res = false;
      let lang = this.language == "C++" ? 1 : 2;
      if(this.title == "" || this.content == "") {
        alert("タイトルと内容を入力してください");
        return;
      }
      //const cont = this.content.replace(/\n/g, '<br>');
      const cont = Buffer.from(this.content).toString('base64');
      const store = useStore();
      if (this.type == "Reference") {
        res = await re_post(this.title, cont, lang);
        if (res === true) {
          store.setLanguage(this.language);
          store.setType(this.type);
          alert("投稿しました");
          location.reload();
        } else {
          alert("投稿に失敗しました");
          console.log(res);
        }
      } else if (this.type == "TechFul") {
        let gr = 0;
        if(this.group === "programming-basic") gr = 1;
        else if(this.group === "algorithm") gr = 2;
        else if(this.group === "math") gr = 3;
        else if(this.group === "database") gr = 4;
        else if(this.group === "ai-basic") gr = 5;
        if(gr == 4) lang = 3;
        else if(gr == 5) lang = 2;
        res = await te_post(this.title, cont, lang, gr);
        if (res === true) {
          store.setLanguage(this.language);
          store.setType(this.type);
          store.setGroup(this.group);
          alert("投稿しました");
          location.reload();
        } else {
          alert("投稿に失敗しました");
          console.log(res);
        }
      }else if (this.type == "AOJ") {
        res = await aoj_post(this.title, cont);
        if (res === true) {
          store.setLanguage(this.language);
          store.setType(this.type);
          alert("投稿しました");
          location.reload();
        } else {
          alert("投稿に失敗しました");
          console.log(res);
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