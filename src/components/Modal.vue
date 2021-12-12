<template>
  <div class="modal">
    <div class="float-right p-1 cursor-pointer" @click="hide">
      <Icon name="close" width="20px" height="20px" />
    </div>
    <div class="clear-both">
      <slot name="header"></slot>
    </div>
    <div class="modal-context">
      <slot name="context"></slot>
    </div>
    <div class="modal-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue";

export default {
  components: {
    Icon,
  },
  emits: ["hide"],
  setup(props, context) {
    const hide = () => {
      context.emit("hide");
    };
    return {
      hide,
    };
  },
};
</script>

<style lang="postcss">
@layer components {
  .modal {
    @apply z-10 fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-lg w-6/12 p-3;
  }
  .modal-context {
    @apply my-2;
  }
}
</style>
