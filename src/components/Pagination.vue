<template>
  <div v-show="total" class="mb-4">
    <ul class="flex text-sm justify-center">
      <li class="min-w-6 mr-1 page-to-link">
        <a
          href="javascript:;"
          class="inline-block align-middle px-1.5"
          :class="{ 'page-lock': !isPrev }"
          @click.prevent="prev"
          ><Icon name="arrow-left"
        /></a>
      </li>
      <li
        class="min-w-6 mr-1 page-to-link"
        :class="{ active: currentPage === 1 }"
      >
        <a
          href="javascript:;"
          class="inline-block px-2.5"
          @click.prevent="setPage(1)"
          >1</a
        >
      </li>
      <li class="min-w-6 mr-1 page-to-link" v-show="isShowPrevDots">
        <a
          href="javascript:;"
          title="prev5"
          class="inline-block px-2.5"
          @click.prevent="prev5"
          >•••</a
        >
      </li>
      <li
        v-for="pageNum in pageList"
        :key="pageNum"
        class="mr-1 min-w-6 page-to-link"
        :class="{ active: isCurrentPage(pageNum) }"
      >
        <a
          href="javascript:;"
          class="inline-block px-2.5"
          @click.prevent="setPage(pageNum)"
          >{{ pageNum }}</a
        >
      </li>
      <li class="min-w-6 mr-1 page-to-link" v-show="isShowNextDots">
        <a
          href="javascript:;"
          title="next5"
          class="inline-block px-2.5"
          @click.prevent="next5"
          >•••</a
        >
      </li>
      <li
        class="min-w-6 mr-1 page-to-link"
        :class="{ active: currentPage === totalPage }"
      >
        <a
          href="javascript:;"
          class="inline-block px-2.5"
          @click.prevent="setPage(totalPage)"
          >{{ totalPage }}</a
        >
      </li>
      <li class="min-w-6 page-to-link">
        <a
          href="javascript:;"
          class="inline-block align-middle px-1.5"
          :class="{ 'page-lock': !isNext }"
          @click.prevent="next"
          ><Icon name="arrow-right"
        /></a>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import Icon from "@/components/Icon.vue";

export default {
  components: {
    Icon,
  },
  emits: ["setPage"],
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    const prev = () => {
      if (isPrev.value) {
        setPage(props.currentPage - 1);
      }
    };
    const prev5 = () => {
      if (isShowPrevDots.value) {
        setPage(props.currentPage - 5);
      }
    };
    const next = () => {
      if (isNext.value) {
        setPage(props.currentPage + 1);
      }
    };
    const next5 = () => {
      if (isShowNextDots.value) {
        setPage(props.currentPage + 5);
      }
    };
    const isCurrentPage = (pageNum) => {
      return props.currentPage === pageNum;
    };
    const setPage = (pageNum) => {
      if (pageNum < 1) {
        pageNum = 1;
      }
      if (pageNum > totalPage.value) {
        pageNum = totalPage.value;
      }
      context.emit("setPage", pageNum);
    };
    const totalPage = computed(() => {
      return props.total > 0 ? Math.ceil(props.total / props.perPage) : 1;
    });
    const isPrev = computed(() => {
      return props.currentPage !== 1;
    });
    const isShowPrevDots = computed(() => {
      return totalPage.value > 8 && props.currentPage > 4;
    });
    const isNext = computed(() => {
      return props.currentPage !== totalPage.value;
    });
    const isShowNextDots = computed(() => {
      return totalPage.value > 8 && props.currentPage < totalPage.value - 3;
    });
    const isRestPages = computed(() => {
      const fastMovePage = 5;
      let minFixedBoundary = fastMovePage - 2; //3
      let maxFixedBoundary = totalPage.value - 2; //48
      return (
        totalPage.value > 8 &&
        props.currentPage > minFixedBoundary &&
        props.currentPage < maxFixedBoundary
      );
    });
    const pageList = computed(() => {
      let range = [];
      if (rangeMin.value) {
        for (let i = rangeMin.value; i <= rangeMax.value; i++) {
          range.push(i);
        }
      }
      return range;
    });
    const rangeMin = computed(() => {
      if (isRestPages.value) {
        return props.currentPage - 2;
      } else if (
        totalPage.value > 8 &&
        props.currentPage >= totalPage.value - 2
      ) {
        return totalPage.value - 5;
      } else {
        return 2;
      }
    });
    const rangeMax = computed(() => {
      if (isRestPages.value) {
        // fastMovePage + 2
        return props.currentPage + 2;
      } else if (totalPage.value < 3) {
        return totalPage.value;
      } else if (totalPage.value > 8 && props.currentPage < 4) {
        return 5;
      } else {
        return totalPage.value - 1;
      }
    });
    return {
      prev,
      next,
      prev5,
      next5,
      setPage,
      isCurrentPage,
      totalPage,
      isPrev,
      isNext,
      isShowPrevDots,
      isShowNextDots,
      pageList,
      rangeMin,
    };
  },
};
</script>
<style lang="postcss">
.page-to-link {
  @apply border border-gray-300 border-solid rounded hover:border-blue-300 hover:text-blue-300;
  line-height: 30px;
}
.page-to-link.active {
  @apply border-blue-300 text-blue-300 font-bold;
}
.page-lock {
  @apply text-gray-300 cursor-not-allowed;
}
</style>
