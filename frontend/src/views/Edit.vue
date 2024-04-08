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
                    <v-btn @click="submit">編集</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
import { edit, data } from "../assets/script/api";
import { useStore } from "../assets/script/store"

export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  async mounted() {
    const store = useStore();
    const login  = store.getLogin();
    if(login === false){
      this.$router.push({ name: "view", params: { id: this.$route.params.id, type: this.$route.params.type } });
    }
    const re = await data(this.$route.params.id, this.$route.params.type);
    this.title = re.title;
    this.content = re.content.replace(/<br>/g, "\n");
  },
  methods: {
    async submit() {
      let res = false;
      if(this.title == "" || this.content == "") {
        alert("タイトルと内容を入力してください");
        return;
      }
      const cont = this.content.replace(/\n/g, '<br>');
      res = await edit(this.$route.params.id, this.title, cont, this.$route.params.type);
      if(res === true) {
        alert("編集しました");
        this.$router.push({ name: "view", params: { id: this.$route.params.id, type: this.$route.params.type } });
      } else {
        alert("編集に失敗しました");
        console.log(res);
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