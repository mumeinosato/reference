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
import { login } from "../assets/script/api";

export default{
    data() {
        return {
            user: "",
            password: ""
        };
    },
    methods: {
        submit() {
            if(this.user == "" || this.password == "") {
                alert("ユーザー名とパスワードを入力してください");
                return;
            }
            const re = login(this.user, this.password);
            if(re){
                alert("ログイン成功");
            }else{
                alert("ログイン失敗");
            }
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