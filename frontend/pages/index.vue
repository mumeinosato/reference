 <template>
  <a-layout class="ml-48 bg-white">
    <a-layout-content class="m-10">
      <div>
        <div>
          <p>書くことがないから掲示板にしとく</p>
        </div>
        <div v-if="login">
          <div class="bbox">
            <div class="btnv">
              <router-link to="/board" class="btn">書き込む</router-link>
            </div>
          </div>
          <section v-for="(post, index) in boardPosts" :key="index">
            <div class="boardWrapper">
              <article>
                <div class="wrapper">
                  <div class="nameArea">
                    <p class="username">{{ post.displayname }}</p>
                    <p class="postInfo">{{ formatDateTime(post.createat) }}</p>
                  </div>
                  <p class="cont" style="white-space: pre-line">
                    {{ replaceContent(post.content) }}
                  </p>
                </div>
              </article>
            </div>
          </section>
        </div>
        <div v-else>
          <div>
            <p>ログインしないと見れないよ</p>
          </div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>
  
<script>
import { useStore } from "../stores/store";
import { bread } from "../assets/script/api";

export default {
  data() {
    return {
      login: false,
      boardPosts: [],
    };
  },
  async mounted() {
    const store = useStore();
    this.login = store.getLogin();
    if (this.login) {
      await this.fetchBoardPosts();
    }
  },
  methods: {
    async fetchBoardPosts() {
      try {
        this.boardPosts = await bread();
        this.boardPosts.reverse();
      } catch (error) {
        console.error("Error fetching board posts:", error);
      }
    },
    replaceContent(content) {
      return content.replace(/<br>/g, "\n");
    },
    formatDateTime(dateTime) {
      const date = new Date(dateTime);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      return `${year}年${month}月${day}日 ${hours}:${minutes}`;
    },
  },
};
</script>
  
  <style scoped>
.boardWrapper {
  margin-top: 20px;
  background-color: rgb(247, 247, 247);
  border-radius: 10px;
}

.wrapper {
  padding: 15px;
}

.nameArea {
  display: flex;
  align-items: center;
}

.postInfo {
  color: gray;
  font-size: 0.8em;
  margin-left: 10px;
}

.username {
  font-size: 13.76px;
  font-weight: 700;
}

.cont {
  font-size: 13.76px;
  font-weight: 22px;
  margin-top: 10px;
}

.btn {
  background-color: rgb(55, 161, 229);
  color: white;
  margin-top: 20px;
  padding: 5px;
  border: rgb(55, 161, 229);
  border-radius: 10px;
}

.btnv {
  margin-top: 10px;
  margin-right: 10px;
}

.bbox {
  display: flex;
}
</style>
  