<template>
  <div class="modal fade" id="postEditor" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="input-group">
            <span class="input-group-text">標題</span>
            <input type="text" class="form-control" v-model="title">
            <button class="btn btn-outline-secondary" type="button" @click="title = ''">✖</button>
          </div>
        </div>
        <div class="modal-body">
          <div class="input-group mb-1">
            <span class="input-group-text">日期</span>
            <input type="date" class="form-control" v-model="from">
            <span class="input-group-text">~</span>
            <input type="date" class="form-control" v-model="to">
          </div>
          <div class="input-group mb-3 justify-content-end">
            <button class="btn btn-sm btn-outline-secondary" type="button" @click="to = from">同起始日</button>
          </div>
          <div class="input-group">
            <span class="input-group-text">顏色</span>
            <input type="radio" class="btn-check" name="colorOptions" id="light-blue" value="light-blue" v-model="color">
            <label class="btn btn-light-blue mx-2" for="light-blue">藍</label>
            <input type="radio" class="btn-check" name="colorOptions" id="light-yellow" value="light-yellow" v-model="color">
            <label class="btn btn-light-yellow me-2" for="light-yellow">黃</label>
            <input type="radio" class="btn-check" name="colorOptions" id="light-red" value="light-red" v-model="color">
            <label class="btn btn-light-red" for="light-red">紅</label>
          </div>
        </div>
        <PostEditorAddPhotoArea v-for="_, index in pairsCollection" :key="index" :photoAreaId="index" :setPhotos="setPhotos" />
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="addPhotoArea">新增照片</button>
          <button type="button" class="btn btn-primary" @click="addPost">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
} from 'vue';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import FileCaptionPair from '@/interface/FileCaptionPair';
import Post from '@/interface/Post';
import usePostEditor from '@/composables/usePostEditor';
import fileToBase64 from '@/helpers/toBase64FileHelper';
import PostEditorAddPhotoArea from './PostEditorAddPhotoArea.vue';

export default defineComponent({
  components: { PostEditorAddPhotoArea },
  name: 'PostEditor',
  props: {
    isNewPost: {
      type: Boolean,
      equired: true,
    },
    dateString: {
      type: String,
      required: true,
    },
    post: {
      type: Object as () => Post,
    },
  },
  setup(props) {
    const { isNewPost, dateString, post } = toRefs(props);
    const {
      title,
      from,
      to,
      color,
    } = usePostEditor(isNewPost, dateString, post);

    const pairsCollection = reactive([] as FileCaptionPair[][]);

    const setPhotos = (photoAreaId: number, pairs: FileCaptionPair[]) => {
      // @ts-ignore
      pairsCollection[photoAreaId] = pairs;
    };

    const { mutate } = useMutation(gql`
      mutation ($addPostInput: AddPostInput!) {
        addPost(addPostInput: $addPostInput) {
          title,
        }
      }
    `);

    const addPost = async () => {
      const pairs = pairsCollection.flat();
      const base64FileCaptionPairs = await fileToBase64(pairs);
      mutate({
        addPostInput: {
          title: title.value,
          from: from.value,
          to: to.value,
          color: color.value,
          photos: base64FileCaptionPairs,
        },
      });
    };

    const addPhotoArea = () => {
      const pairCollection = [] as FileCaptionPair[];
      pairsCollection.push(pairCollection);
    };

    return {
      title,
      from,
      to,
      color,
      pairsCollection,
      addPhotoArea,
      setPhotos,
      addPost,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/scss/colors";
</style>
