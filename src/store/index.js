import { createStore } from "vuex";
import { getUser } from "@/services/UserInfo.js";

export default createStore({
  state: {
    userList: [],
  },
  mutations: {
    SET_USER_INFO(state, userList) {
      state.userList = userList;
    },
  },
  actions: {
    getUser({ commit }, countNum) {
      getUser(countNum)
        .then((res) => {
          commit("SET_USER_INFO", res);
        })
        .catch((err) => {
          // TODO:error handler
          console.log(err);
        });
    },
  },
});
