<template>
  <div>
    <div class="btnv">
          <router-link to="/post_issue" class="btn">問題を報告</router-link>
      </div>
    <div v-for="issue in issues" :key="issue.id">
      <div class="boardWrapper">
        <article>
          <div class="wrapper">
            <div class="nameArea">
              <p class="username">{{ issue.title }}</p>
              <div v-if="issue.labels.length > 0">
                <p v-if="issue.labels[0].name === 'enhancement'" class="label ench">
                   enhancement
                </p>
                <p v-if="issue.labels[0].name === 'bug'" class="label bug">
                    bug
                </p>
              </div>
            </div>
            <p  class="cont" style="white-space: pre-line">
                {{ issue.body }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { getIssues } from "../../assets/script/github/octokit";

export default {
  data() {
    return {
      issues: [],
    };
  },
  async mounted() {
    this.issues = await getIssues();
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

.username {
  font-size: 13.76px;
  font-weight: 700;
}

.cont {
  font-size: 13.76px;
  font-weight: 22px;
  margin-top: 10px;
}

.ench {
    background-color: rgb(162, 238, 239);
    color: rgb(0, 0, 0);
    border: 1px solid rgb(162, 238, 239);
}

.bug {
    background-color: rgb(215, 58, 74);
    color: rgb(255, 255, 255);
    border: 1px solid rgb(215, 58, 74);
}

.label {
    padding-right: 5px;
    padding-left: 5px;
    border-radius: 24px;
    font-size: 12px;
    margin-left: 5px;
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
</style>