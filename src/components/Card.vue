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
          class="py-2 px-5 flex-1 border-r border-gray-200"
          ><Icon
            name="mail"
            color="#efefef"
            width="22px"
            height="22px"
            class="mx-auto"
          />
        </a>
        <a :href="`mailto:${user.email}`" class="py-2 px-5 flex-1"
          ><Icon
            name="phone"
            color="#efefef"
            width="22px"
            height="22px"
            class="mx-auto"
          />
        </a>
      </address>
      <button
        class="text-white bg-green-500 py-2 w-full rounded-bl-lg rounded-br-lg"
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
    @apply rounded-lg shadow text-center;
  }
  .card-header {
    @apply relative mb-3;
  }
}
</style>
