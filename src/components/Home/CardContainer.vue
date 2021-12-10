<template>
  <div class="flex flex-wrap">
    <div
      class="w-1/2 sm:w-1/3 md:w-1/4 xl:w-1/6"
      v-for="user in userList"
      :key="user.login.uuid"
    >
      <UserCard :user="user" class="mx-3 mb-3" />
    </div>
  </div>
</template>

<script>
import UserCard from "@/components/UserCard.vue";

export default {
  components: {
    UserCard,
  },
  props: {
    userList: {
      type: Array,
    },
  },
  setup() {},
};
</script>
