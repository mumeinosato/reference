<template>
    <v-form>
        <v-container>
            <v-row>
                <v-col>
                    <v-text-field v-model="user" label="ユーザー名"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field v-model="password" label="パスワード" type="password"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field v-model="re_password" label="パスワードの確認" type="password"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn @click="submit">登録</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
import { useStore } from "../assets/script/store"
import { register } from "../assets/script/api"

export default {
    data() {
        return {
            user: "",
            password: "",
            re_password: ""
        };
    },
    methods: {
        async submit() {
            if(this.user == "" || this.password == "" || this.re_password == "") {
                alert("ユーザー名とパスワードを入力してください");
                return;
            }
            if(this.password != this.re_password) {
                alert("パスワードが一致しません");
                return;
            }
            const re = await register(this.user, this.password);
            const store = useStore();
            if(re === 0){
                alert("登録しました");
                this.$router.push("/login");
            }else if(re === 1){
                alert("パスワードがすでに設定されています");
                this.$router.push("/login");
            }else{
                alert("エラーが発生しました");
            }
        }
    },
    mounted() {
        const store = useStore();
        if(store.getLogin() === true){
            this.$router.push("/");
        }
    }
};
</script>


<style scoped>
form {
    border: 1px solid #000;
    border-radius: 10px;
}

</style>