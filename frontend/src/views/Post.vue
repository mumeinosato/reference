<template>
    <form>
        <h2>投降</h2>
        <div class="form-content">
            <div class="cont">
                <label for="title">タイトル</label><br>
                <input type="text" id="title" name="title">
            </div>
            <div class="cont">
                <label for="content">内容</label><br>
                <textarea id="content" name="content"></textarea>
            </div>
            <div class="cont">
                <label for="language">言語</label><br>
                <select id="language" name="language">
                    <option value="c++">C++</option>
                    <option value="python">Python</option>
                </select>
            </div>
            <div class="cont">
                <label for="type">投降先</label><br>
                <v-select v-model="type" :items="['reference', 'techfull']"></v-select>
                <select id="type" name="type">
                    <option value="reference">リファレンス</option>
                    <option value="techfull">TechFul</option>
                </select>
            </div>
            <div class="cont" v-if="type == 'reference'">
                <label for="tag">タグ</label><br>
                <input type="text" id="tag" name="tag">
            </div>
            <div class="cont">
                <label for="group">種類</label><br>
                <select id="group" name="group">
                    <option value="programming-basic">プログラミング基礎</option>
                    <option value="algorithm">アルゴリズム</option>
                    <option value="math">数学</option>
                </select>
            </div>
            <div class="cont btn-d">
                <input type="submit" value="投降" class="btn" @click="submit">
            </div>
        </div>
    </form>
</template>

<script>
import { re_post } from '../assets/script/post'

export default {
    data() {
        return {
            title: '',
            content: '',
            language: '',
            type: '',
            tag: '',
            group: ''
        };
    },
    methods: {
        async submit() {
            let data = {
                title: this.title,
                content: this.content,
                language: this.language,
                type: this.type,
                tag: this.tag,
                group: this.group
            };
            let res = await re_post(data);
            if(res){
                alert('投稿しました');
            }else{
                alert('投稿に失敗しました');
            }
        }
    }
}
</script>


<style scoped>
    form{
        border: 1px solid #000;
        border-radius: 10px;
    }

    h2{
        text-align: center;
        font-size: 25px;
    }

    .form-content{
        margin-top: 20px;
    }

    .cont{
        margin: 20px;
        margin-left: 50px;
        margin-right: 50px;
    }

    input, textarea {
        border: 1.5px solid rgb(107, 114, 128);
        width: 100%;
        border-radius: 5px;
    }

    select{
        border: 1.5px solid rgb(107, 114, 128);
        border-radius: 5px;
        padding-top: 2px;
        padding-bottom: 2px;
        padding-left: 5px;
        padding-right: 5px;
    }

    .btn{
        background-color: skyblue;
        border: none;
    }

    .btn-d{
        text-align: right;
        width: 60px;
    }
</style>