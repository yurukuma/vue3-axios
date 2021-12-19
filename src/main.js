import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";

// import svg
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
const req = require.context("./assets/icons", true, /\.svg$/);
requireAll(req);

createApp(App).use(router).mount("#app");
