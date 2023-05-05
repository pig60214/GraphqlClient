<template>
<div class="tw-animate-show">
  <div id="dateDetail" class="tw-divide-y tw-divide-black" :class="{ 'tw-animate-pulse': loading }">
    <h2 class="my-1 tw-text-3xl tw-hidden md:tw-block"> {{ weekList[currentDate.date.getDay()] }} </h2>
    <div class="tw-flex md:tw-divide-x md:tw-divide-black">
      <div id="date" class="md:tw-w-1/3 align-self-center tw-hidden md:tw-block">
        <div class="row">
          <div class="col-6 px-1 text-end">
            <p class="m-0 tw-text-7xl"> {{ currentDate.date.getDate() }} </p>
          </div>
          <div class="col-6 px-1 text-start align-self-center">
            <p class="m-0"> {{ monthList[currentDate.date.getMonth()] }} </p>
            <p class="tw-m-0 tw--mt-3"> {{ currentDate.date.getFullYear() }} </p>
          </div>
        </div>
      </div>
      <div id="posts" class="tw-w-full md:tw-w-2/3">
        <ul class="tw-divide-y tw-divide-gray-400 tw-h-full">
          <template v-if="loading">
            <li>
              <div class="tw-flex tw-items-center tw-h-12">
                <SvgIcon :svgName="'icon-bullet-point'" :className="'tw-w-4 tw-h-4 text-font-color'" />
                <div class="tw-ml-1 tw-cursor-text tw-bg-gray-500 tw-rounded tw-h-7 tw-w-1/2">&nbsp;</div>
              </div>
            </li>
            <li>
              <div class="tw-flex tw-items-center tw-h-12">
                <SvgIcon :svgName="'icon-bullet-point'" :className="'tw-w-4 tw-h-4 text-font-color'" />
                <div class="tw-ml-1 tw-cursor-text tw-bg-gray-500 tw-rounded tw-h-7 tw-w-1/3">&nbsp;</div>
              </div>
            </li>
            <li>
              <div class="tw-flex tw-items-center tw-h-12">
                <SvgIcon :svgName="'icon-bullet-point'" :className="'tw-w-4 tw-h-4 text-font-color'" />
                <div class="tw-ml-1 tw-cursor-text tw-bg-gray-500 tw-rounded tw-h-7 tw-w-2/3">&nbsp;</div>
              </div>
            </li>
          </template>
          <li v-if="!loading && posts.length == 0" class="tw-h-full tw-animate-show">
            <button type="button" class="btn-outline-dark tw-w-12 tw-h-12 md:tw-h-full" data-bs-toggle="modal" data-bs-target="#postEditor" @click="clickAddPost">
              <SvgIcon :svgName="'icon-add'" :className="'tw-w-5 tw-h-5'" />
            </button>
          </li>
          <li
            class="tw-truncate text-start ps-2 pe-0 py-1 tw-cursor-pointer tw-flex tw-items-center tw-justify-between tw-animate-show"
            v-for="post, index in posts"
            :key="index"
            :class="[ index === currentPostIndex ? `bg-${post.color}` : '' ]"
            @click="clickPost(index)"
          >
            <div
              class="tw-flex-grow"
              :data-bs-target="index === currentPostIndex ? '#postEditor' : ''"
              :data-bs-toggle="index === currentPostIndex ? 'modal' : ''"
            >
              <SvgIcon :svgName="'icon-bullet-point'" :className="`tw-w-4 tw-h-4 ${index === currentPostIndex ? 'text-bg-color' : `text-${post.color}`}`" />
              <span class="tw-ml-1 tw-cursor-text">{{ post.title }}</span>
            </div>
            <button v-if="post.photos.length > 0" class="md:tw-hidden btn btn-sm btn-outline-dark tw-rounded-full tw-w-8 tw-h-8" @click="showPhoto">
              <SvgIcon :svgName="'icon-photo'" :className="'tw-w-3 tw-h-3'" />
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="d-grid d-flex justify-content-end">
      <button v-if="posts.length > 0" type="button" class="btn-outline-dark tw-w-8" data-bs-toggle="modal" data-bs-target="#postEditor" @click="clickAddPost">
        <SvgIcon :svgName="'icon-add'" :className="'tw-w-3 tw-h-3'" />
      </button>
    </div>
  </div>
</div>
  <PostEditor :isNewPost="isNewPost" :dateString="dateString" :post="currentPost" :refetch="refetch" />
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  Ref,
  watch,
} from 'vue';
import DateOfCalendar from '@/class/DateOfCalendar';
import PostEditor from '@/components/DateDetail/PostEditor.vue';
import useQueryPostApi from '@/composables/useQueryPostApi';
import PostsQueryInput from '@/interface/graphql/PostsQueryInput';
import SvgIcon from '@/components/SvgIcon.vue';
import { useStore } from '@/store';
import useTogglePhoto from '@/composables/useTogglePhoto';

export default defineComponent({
  components: { PostEditor, SvgIcon },
  props: {
    dateString: {
      type: String,
      required: true,
    },
  },
  name: 'DateDetail',
  setup(props) {
    // const monthList = ['一 月', '二 月', '三 月', '四 月', '五 月', '六 月', '七 月', '八 月', '九 月', '十 月', '十一月', '十二月'];
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // const weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    // const weekList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekList = ['Sunday // 星期日', 'Monday // 星期一', 'Tuesday // 星期二', 'Wednesday // 星期三', 'Thursday // 星期四', 'Friday // 星期五', 'Saturday // 星期六'];
    const dateOfCalendar = new DateOfCalendar();
    dateOfCalendar.date = new Date(props.dateString);
    const currentDate = ref(dateOfCalendar);
    const store = useStore();

    const variable: Ref<PostsQueryInput> = ref({
      from: props.dateString,
      to: props.dateString,
    });

    const { posts, refetch, loading } = useQueryPostApi(variable);

    const currentPostIndex = ref(0);
    const currentPost = computed(() => (posts.value.length > 0) ? posts.value[currentPostIndex.value] : null);

    watch(
      () => currentPost.value,
      () => {
        store.state.photosInCarousel = currentPost.value ? currentPost.value.photos : [];
      },
      { deep: true },
    );

    const isNewPost = ref(false);

    const clickPost = (index: number) => {
      if (index >= 0 && index < posts.value.length) {
        currentPostIndex.value = index;
        isNewPost.value = false;
      }
    };

    const clickAddPost = () => { isNewPost.value = true; };

    const { showPhoto } = useTogglePhoto();

    document.onkeydown = (e) => {
      e = e || window.event;
      const arrowUp = 38;
      const arrowDown = 40;
      if (e.keyCode === arrowUp) {
        clickPost(currentPostIndex.value - 1);
      } else if (e.keyCode === arrowDown) {
        clickPost(currentPostIndex.value + 1);
      }
    };

    return {
      currentDate,
      posts,
      currentPostIndex,
      currentPost,
      monthList,
      weekList,
      isNewPost,
      clickPost,
      clickAddPost,
      refetch,
      loading,
      showPhoto,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/scss/colors";
</style>
