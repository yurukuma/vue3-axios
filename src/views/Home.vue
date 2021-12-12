<template>
  <div class="home">
    <!-- view mode -->
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
    <!-- TODO:resolve 資料render速度不一 -->
    <template v-if="gotUserData">
      <component
        :is="currentComponent"
        :userList="userInfoList"
        @openModal="toggleModal"
        @modalContext="modalContext"
      />
    </template>
    <Teleport to="#app" v-if="isModalOpen">
      <Modal @hide="toggleModal">
        <template #context>
          <div class="p-6 flex">
            <img
              class="rounded-full mx-3"
              :src="modalData.picture.large"
              alt="profile picture"
            />
            <div>
              <div>
                <span>Name: </span>
                <span
                  >{{ modalData.name.first }} {{ modalData.name.last }}</span
                >
              </div>
              <div>
                <span>Mail: </span>
                <span>{{ modalData.email }}</span>
              </div>
              <div>
                <span>Phone: </span>
                <span>{{ modalData.phone }}</span>
              </div>
              <div>
                <span>Cell: </span>
                <span>{{ modalData.cell }}</span>
              </div>
              <div>
                <span>Location: </span>
                <span
                  >{{ modalData.location.street.number
                  }}{{ modalData.location.street.name }},{{
                    modalData.location.city
                  }},{{ modalData.location.state }},{{
                    modalData.location.postcode
                  }},{{ modalData.location.country }}</span
                >
              </div>
              <div>
                <span>DOB: </span
                ><span>{{ convertToDateString(modalData.dob.date) }}</span>
              </div>
            </div>
          </div>
        </template>
      </Modal>
    </Teleport>
    <div
      v-show="isModalOpen"
      class="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-60"
      @click="toggleModal"
    ></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { ref, onMounted, computed } from "vue";
import UserList from "@/components/UserList.vue";
import Icon from "@/components/Icon.vue";
import CardContainer from "@/components/Home/CardContainer.vue";
import Modal from "@/components/Modal.vue";

// services
import { getUser } from "@/services/UserInfo.js";
// utility
import { convertToDateString } from "@/utility/dateFormatter.js";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    // UserCard,
    UserList,
    CardContainer,
    Icon,
    Modal,
  },
  setup() {
    let userInfoList = ref([]);
    const count = 6;
    let currentComponent = ref("CardContainer");
    let gotUserData = ref(false);
    let isModalOpen = ref(false);
    let modalData = ref({});
    // call api get data
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
    const toggleModal = () => {
      isModalOpen.value = !isModalOpen.value;
    };
    const modalContext = (data) => {
      modalData.value = data;
    };
    // computed
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
      isModalOpen,
      modalContext,
      modalData,
      toggleModal,
      convertToDateString,
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
</style>
