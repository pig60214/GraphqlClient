<template>
  <div id="calendar" class="container rounded-3 shadow" >
    <div class="row justify-content-md-center">
      <div class="col-xs-auto col-md-4 align-self-center bg-vue-blue">
        <PhotoCarousel :carouselId="'DateDetailHeader'" :photos="photos" />
      </div>
      <div class="col-xs-auto col-md-8 px-0 align-self-center">
        <div class="card">
          <div class="card-header shadow-sm">
            <p class="my-1"> {{ weekList[currentDate.date.getDay()] }} </p>
          </div>
          <div class="card-body">
            <div class="row">
              <div id="date" class="col-5 align-self-center">
                <div class="row">
                  <div class="col-6 px-1 text-end">
                    <p class="m-0" style="font-size: 3rem"> {{ currentDate.date.getDate() }} </p>
                  </div>
                  <div class="col-6 px-1 text-start align-self-center">
                    <p class="m-0" style="font-size: 1.2rem"> {{ monthList[currentDate.date.getMonth()] }} </p>
                    <p class="m-0" style="font-size: 1.2rem"> {{ currentDate.date.getFullYear() }} </p>
                  </div>
                </div>
              </div>
              <div id="posts" class="col-7 border-start">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item text-truncate text-start ps-2 pe-0 py-1" v-for="post, index in currentDate.posts" :key="index"> {{ post.title }} </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
} from 'vue';
import { useStore } from '@/store';
import PhotoCarousel from '@/components/PhotoCarousel/PhotoCarousel.vue';

export default defineComponent({
  components: { PhotoCarousel },
  name: 'DateDetail',
  setup() {
    const monthList = ['一 月', '二 月', '三 月', '四 月', '五 月', '六 月', '七 月', '八 月', '九 月', '十 月', '十一月', '十二月'];
    const weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const store = useStore();
    const currentDate = ref(store.state.currentDate);
    const { posts } = store.state.currentDate;
    const post = (posts) ? posts[0] : null;
    const currentPost = ref(post);

    const photos = computed(() => {
      if (currentPost.value) {
        return currentPost.value.photos;
      }
      return null;
    });

    return {
      currentDate,
      monthList,
      weekList,
      photos,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/scss/colors";

.text-truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>