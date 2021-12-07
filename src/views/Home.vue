<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <ul>
      <li></li>
      <li></li>
    </ul>
    <div class="flex flex-wrap">
      <div class="w-1/5" v-for="user in userInfoList" :key="user.login.uuid">
        <Card :user="user" class="mr-3 mb-3" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { ref, onMounted } from "vue";
import Card from "@/components/Card.vue";
// import Icon from "@/components/Icon.vue";

// services
import { getUser } from "@/services/UserInfo.js";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    Card,
    // Icon,
  },
  setup() {
    const userInfoList = ref([]);
    const count = 6;

    const getUserInfo = () => {
      getUser(count)
        .then((res) => {
          userInfoList.value = res;
          console.log(userInfoList.value);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {
      getUserInfo();
    });
    return {
      userInfoList,
    };
  },
};
</script>
