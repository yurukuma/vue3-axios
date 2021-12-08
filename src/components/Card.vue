<template>
  <div class="card">
    <div class="card-header">
      <img
        class="rounded-full mx-auto"
        :src="user.picture.medium"
        alt="profile picture"
      />
    </div>
    <div class="card-body">
      <h4 class="mb-3">{{ user.name.first }} {{ user.name.last }}</h4>
      <div
        class="pb-2 flex justify-center items-center border-b border-gray-200"
      >
        <Icon name="map-pin" width="16px" height="16px" />
        <span class="ml-2">{{ user.location.country }}</span>
      </div>
    </div>
    <div class="card-footer">
      <address class="flex items-center border-b border-gray-200">
        <a
          :href="`mailto:${user.email}`"
          class="hover:bg-yellow-100 hover:fill-current py-2 px-5 flex-1 border-r border-gray-200"
          ><Icon
            name="mail"
            width="22px"
            height="22px"
            class="mail-test mx-auto"
            color="#ffa230"
          />
        </a>
        <a
          :href="`tel:${user.phone}`"
          class="hover:bg-green-100 py-2 px-5 flex-1"
          ><Icon
            name="phone"
            color="#00f297"
            width="22px"
            height="22px"
            class="mx-auto"
          />
        </a>
      </address>
      <button
        class="hover:bg-blue-900 text-white bg-blue-800 py-2 w-full rounded-bl-lg rounded-br-lg"
      >
        View Details
      </button>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue";
export default {
  components: {
    Icon,
  },
  props: {
    user: {
      type: Object,
    },
    // width: {
    //   type: String,
    //   default: 'w-1/5'
    // }
  },
};
</script>

<style lang="postcss">
@layer components {
  .card {
    @apply rounded-lg text-center pt-3;
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%), 0 0 4px -1px rgb(0 0 0 / 10%);
  }
  .card-header {
    @apply relative mb-3;
  }
}
</style>
