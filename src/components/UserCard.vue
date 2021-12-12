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
            class="mx-auto"
            color="#ffa230"
          />
        </a>
        <a
          :href="`tel:${user.phone}`"
          class="hover:bg-green-100 py-2 px-5 flex-1"
          ><Icon
            name="phone"
            width="22px"
            height="22px"
            color="#33B864"
            class="mx-auto"
          />
        </a>
      </address>
      <button
        class="hover:bg-blue-900 text-white bg-blue-800 py-2 w-full rounded-bl-lg rounded-br-lg"
        @click="openModal(user)"
      >
        View Details
      </button>
    </div>
    <!-- <Teleport to="body" v-if="isModalOpen">
      <Modal :context="user" />
    </Teleport> -->
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue";
// import Modal from "@/components/Modal.vue";
// import { ref } from "vue";

export default {
  name: "Card",
  components: {
    Icon,
    // Modal,
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
  emits: ["openModal", "modalContext"],
  setup(props, context) {
    // let isModalOpen = ref(false);
    // const openModal = () => {
    //   isModalOpen.value = true;
    // };
    // return {
    //   isModalOpen,
    //   openModal,
    // };
    const openModal = (data) => {
      console.log(data);
      context.emit("openModal");
      context.emit("modalContext", data);
    };
    return {
      openModal,
    };
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
