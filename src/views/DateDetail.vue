<template>
  <div id="dateDetail" class="container rounded-3 shadow" >
    <div class="row justify-content-md-center">
      <div class="col-xs-auto col-md-4 align-self-center bg-vue-blue">
        <PhotoCarousel :carouselId="'DateDetailHeader'" :photos="photos" />
      </div>
      <div class="col-xs-auto col-md-8 px-0 align-self-center">
        <div class="col-md-9 m-auto">
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
                    <li
                      class="list-group-item list-group-item-action text-truncate text-start ps-2 pe-0 py-1"
                      :data-bs-target="index === currentPostIndex ? '#postEditor' : ''"
                      :data-bs-toggle="index === currentPostIndex ? 'modal' : ''"
                      v-for="post, index in posts"
                      :key="index"
                      :class="{ 'list-group-item-primary': index === currentPostIndex }"
                      @click="clickPost(index)"
                    >
                      {{ post.title }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-footer py-1">
              <div class="d-grid d-flex justify-content-end">
                <button type="button" class="btn btn-sm btn-secondary"  data-bs-toggle="modal" data-bs-target="#postEditor" @click="clickAddPost">✚</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <PostEditor :isNewPost="isNewPost" :dateString="dateString" :post="currentPost" />
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  reactive,
} from 'vue';
import PhotoCarousel from '@/components/PhotoCarousel/PhotoCarousel.vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import DateOfCalendar from '@/class/DateOfCalendar';
import Post from '@/interface/Post';
import PostEditor from '@/components/DateDetail/PostEditor.vue';

export default defineComponent({
  components: { PhotoCarousel, PostEditor },
  props: {
    dateString: {
      type: String,
      required: true,
    },
  },
  name: 'DateDetail',
  setup(props) {
    const monthList = ['一 月', '二 月', '三 月', '四 月', '五 月', '六 月', '七 月', '八 月', '九 月', '十 月', '十一月', '十二月'];
    const weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const dateOfCalendar = new DateOfCalendar();
    dateOfCalendar.date = new Date(props.dateString);
    const currentDate = ref(dateOfCalendar);

    const variable = reactive({
      postsQueryInput: {
        from: props.dateString,
        to: props.dateString,
      },
    });

    const { result } = useQuery(gql`
      query ($postsQueryInput: PostsQueryInput!){
        posts(postsQueryInput: $postsQueryInput){
          id,
          title,
          from,
          to,
          color,
          photos {
            path,
            caption
          },
        }
      }
    `, variable,
    {
      fetchPolicy: 'no-cache',
    });

    const posts = useResult(result, [] as Post[], data => {
      const toPostList = (data.posts as any[]).map(postFromApi => {
        const post = {
          ...postFromApi,
          postId: postFromApi.id,
        } as Post;
        return post;
      });
      return toPostList;
    });

    const currentPostIndex = ref(0);
    const currentPost = computed(() => (posts.value.length > 0) ? posts.value[currentPostIndex.value] : null);
    const photos = computed(() => (currentPost.value) ? currentPost.value.photos : null);

    const isNewPost = ref(false);

    const clickPost = (index: number) => {
      currentPostIndex.value = index;
      isNewPost.value = false;
    };

    const clickAddPost = () => { isNewPost.value = true; };

    return {
      currentDate,
      posts,
      currentPostIndex,
      currentPost,
      monthList,
      weekList,
      photos,
      isNewPost,
      clickPost,
      clickAddPost,
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
