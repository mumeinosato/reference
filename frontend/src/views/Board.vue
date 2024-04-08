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
    if(login === false){
      this.$router.push("/");
    }
  },
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