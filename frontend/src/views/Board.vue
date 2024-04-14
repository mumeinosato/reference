<template>
         <v-form>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field v-model="name" label="表示名" class="name"></v-text-field>
            </v-col>
          </v-row>
          <v-col>
            <v-row>
              <v-textarea v-model="content" label="内容" class="cont" row-height="10" rows="5"></v-textarea>  
            </v-row>
          </v-col>
          <v-row>
            <v-col>
              <v-btn @click="submit">投稿</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
</template>

<script>
import { useStore } from "../assets/script/store"
import { bwrite } from "../assets/script/api"

export default {
  data() {
    return {
      name: "",
      content: "",
    };
  },
  async mounted() {
    const store = useStore();
    const login  = store.getLogin();
    this.name = store.getName();
    if(login === false){
      this.$router.push("/");
    }
  },
  methods: {
    async submit() {
        let res = false;
        if(this.name == "" || this.content == "") {
            alert("表示名と内容を入力してください");
            return;
        }
        const cont = this.content.replace(/\n/g, '<br>');
        const store = useStore();
        const user = store.getUser();
        store.setName(this.name);
        res = await bwrite(this.name, user, cont);
        if(res === true) {
            alert("投稿しました");
            this.$router.push("/");
        } else {
            alert("投稿に失敗しました");
            console.log(res);
        }
    }
  }
};
</script>

<style scoped>
.name {
  width: 300px;
}

textarea {
  width: 300px;
}
</style>