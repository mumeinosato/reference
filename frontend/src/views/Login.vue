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
                    <v-btn @click="submit">ログイン</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>


<script>
import { useStore } from "../assets/script/store"
import { login } from "../assets/script/api"

export default {
    data() {
        return {
            user: "",
            password: ""
        };
    },
    methods: {
        async submit() {
            if(this.user == "" || this.password == "") {
                alert("ユーザー名とパスワードを入力してください");
                return;
            }
            const re = await login(this.user, this.password);
            const store = useStore();
            if(re === 0){
                store.setLogin(true);
                store.setUser(this.user);
                alert("ログイン成功");
                this.$router.go("/");
            }else if(re === 1){
                alert("パスワードが設定されていません");
                this.$router.push("/sign_up");
                store.setLogin(false);
            }else{
                alert("ログイン失敗");
                store.setLogin(false);
            }
        }
    }, 
    mounted() {
        const store = useStore();
        if(store.getLogin() === true){
            this.$router.push("/");
        }
    }
}
</script>

<style scoped>
form {
    border: 1px solid #000;
    border-radius: 10px;
}


</style>