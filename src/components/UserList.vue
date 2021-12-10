<template>
  <ul class="shadow">
    <li
      v-for="user in userList"
      :key="user.login.uuid"
      class="p-4 flex items-center border-b border-gray-200 first:border-t"
    >
      <div class="flex flex-1">
        <img
          class="w-16 h-16 rounded-full"
          :src="user.picture.medium"
          alt="profile picture"
        />
        <div class="ml-4 py-2">
          <h4>{{ user.name.first }} {{ user.name.last }}</h4>
          <div class="location-area">
            <Icon name="map-pin" width="16px" height="16px" />
            <span>{{ user.location.country }}</span>
          </div>
        </div>
      </div>
      <address class="flex-2 flex contact-info-area">
        <a
          :href="`mailto:${user.email}`"
          class="w-3/6 hover:underline visited:text-yellow-700 hover:text-yellow-400 mail"
        >
          <Icon name="mail" width="22px" height="22px" color="#373737" />
          <span>{{ user.email }}</span>
        </a>
        <a :href="`tel:${user.phone}`" class="w-3/6">
          <Icon name="phone" width="22px" height="22px" />
          <span>{{ user.phone }}</span>
        </a>
      </address>
      <div class="flex-1">
        <button
          class="hover:bg-blue-900 hover:text-white rounded-md text-blue-800 border border-blue-800 p-3"
        >
          View Details
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon.vue";
export default {
  components: {
    Icon,
  },
  props: {
    userList: {
      type: Array,
    },
    // userData: {
    //   type: Array,
    // },
  },
};
</script>

<style lang="postcss">
.location-area .icon,
.contact-info-area .icon {
  @apply inline-block mr-2;
}
.location-area .icon {
  @apply align-text-top;
}
.contact-info-area .icon {
  @apply align-bottom;
}
.mail:hover .icon {
  fill: #ffa230;
}
</style>
