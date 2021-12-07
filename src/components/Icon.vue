<template>
  <svg
    class="icon"
    :style="{
      fill: color,
      width: width,
      height: height,
    }"
  >
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script>
export default {
  name: "icon",
  props: {
    name: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      // default: "currentColor",
    },

    width: {
      type: String,
      default: "18px",
    },

    height: {
      type: String,
      default: "18px",
    },
  },
};
</script>

<style>
.icon {
  vertical-align: middle;
  overflow: hidden;
}
</style>
