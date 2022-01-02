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
    <component
      :is="currentComponent"
      :userList="currentData"
      @openModal="toggleModal"
      @modalContext="modalContext"
    />
    <Pagination
      class="mt-4"
      :total="total"
      :perPage="perPage"
      :currentPage="currentPage"
      @setPage="directPage"
    />
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
                <span>Birthday: </span
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
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import UserList from "@/components/UserList.vue";
import Icon from "@/components/Icon.vue";
import CardContainer from "@/components/Home/CardContainer.vue";
import Modal from "@/components/Modal.vue";
import Pagination from "@/components/Pagination.vue";
// services
import { getUser } from "@/services/UserInfo.js";
// utility
import { convertToDateString } from "@/utility/dateFormatter.js";

export default {
  name: "Home",
  components: {
    UserList,
    CardContainer,
    Icon,
    Modal,
    Pagination,
  },
  setup() {
    let userInfoList = ref([]);
    let currentComponent = ref("CardContainer");
    let gotUserData = ref(false);
    let isModalOpen = ref(false);
    let modalData = ref({});
    let userDataStore = reactive({});
    const total = 3010; //資料總數3010
    const perPage = 30;
    let currentPage = ref(1); // 當前頁碼
    const router = useRouter();
    const route = useRoute();
    // call api get data
    const getUserInfo = () => {
      getUser(perPage).then((res) => {
        userInfoList.value = res;
        gotUserData.value = true;
        userDataStore[currentPage.value] = res;
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
    const directPage = (pageNum) => {
      currentPage.value = pageNum;
      changePageRoute();
    };
    const changePageRoute = () => {
      router.push({ name: "Home", query: { page: currentPage.value } });
    };
    // computed
    const currentData = computed(() => {
      return userDataStore[currentPage.value];
    });
    const isCardMode = computed(() => {
      return currentComponent.value === "CardContainer";
    });
    watch(
      () => route.query.page,
      (newPage) => {
        if (userDataStore?.[newPage]) return;
        getUserInfo();
      }
    );
    // hook
    onMounted(() => {
      changePageRoute();
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
      currentPage,
      perPage,
      total,
      directPage,
      userDataStore,
      currentData,
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
