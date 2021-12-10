<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <ul class="m-3 flex justify-end items-center">
      <li
        class="grid-view cursor-pointer"
        :class="{ active: isCardMode }"
        @click="changeViewMode('CardContainer')"
      >
        <Icon name="grid" width="28px" height="28px" color="#1B2431" />
      </li>
      <li
        class="list-view cursor-pointer"
        :class="{ active: !isCardMode }"
        @click="changeViewMode('UserList')"
      >
        <Icon name="th-list" width="30px" height="30px" color="#1B2431" />
      </li>
    </ul>
    <!-- <div class="flex flex-wrap">
      <div
        class="w-1/2 sm:w-1/3 md:w-1/4 xl:w-1/6"
        v-for="user in userInfoList"
        :key="user.login.uuid"
      >
        <UserCard :user="user" class="mr-3 mb-3" />
      </div>
    </div> -->
    <!-- <ul v-for="user in userInfoList" :key="user.login.uuid">
      <UserList :user="user" />
    </ul> -->
    <!-- TODO:resolve 資料render速度不一 -->
    <template v-if="gotUserData">
      <component :is="currentComponent" :userList="userInfoList" />
    </template>

    <!-- <UserList :user="userInfoList" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { ref, onMounted, computed } from "vue";
// import UserCard from "@/components/UserCard.vue";
import UserList from "@/components/UserList.vue";
import Icon from "@/components/Icon.vue";
import CardContainer from "@/components/Home/CardContainer.vue";

// services
import { getUser } from "@/services/UserInfo.js";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    // UserCard,
    UserList,
    CardContainer,
    Icon,
  },
  setup() {
    let userInfoList = ref([]);
    const count = 6;
    let currentComponent = ref("CardContainer");
    let gotUserData = ref(false);

    const getUserInfo = () => {
      getUser(count)
        .then((res) => {
          userInfoList.value = res;
          gotUserData.value = true;
          console.log(userInfoList.value);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const changeViewMode = (mode) => {
      currentComponent.value = mode;
    };
    const isCardMode = computed(() => {
      return currentComponent.value === "CardContainer";
    });
    onMounted(() => {
      getUserInfo();
    });
    return {
      userInfoList,
      gotUserData,
      currentComponent,
      changeViewMode,
      isCardMode,
    };
  },
};
</script>
<style lang="postcss">
.grid-view .icon:hover,
.list-view .icon:hover,
.active.grid-view .icon,
.active.list-view .icon {
  fill: #0e87cc;
}
/* .active.grid-view .icon,
.active.list-view .icon {
  fill: #0e87cc;
} */
</style>
