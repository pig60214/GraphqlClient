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
        <div class="container">
          <div class="row" v-if="!isNewPost && post && post.photos">
            <div class="col-6" v-for="photo, index in post.photos" :key="index">
              <div class="ratio ratio-1x1">
                <img :alt="photo.caption" :src="photo.path">
              </div>
              <strong>{{ photo.caption}}</strong>
            </div>
          </div>
        </div>
        <PostEditorAddPhotoArea v-for="_, index in pairsCollection" :key="index" :photoAreaId="index" :savePhotosToCollection="savePhotosToCollection" />
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
  ref,
  toRefs,
} from 'vue';
import FileCaptionPair from '@/interface/FileCaptionPair';
import Post from '@/interface/Post';
import usePostEditor from '@/composables/usePostEditor';
import usePostApi from '@/composables/usePostApi';
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

    const pairsCollection = ref([] as FileCaptionPair[][]);

    const savePhotosToCollection = (photoAreaId: number, pairs: FileCaptionPair[]) => {
      // @ts-ignore
      pairsCollection[photoAreaId] = pairs;
    };

    const addPhotoArea = () => {
      const pairCollection = [] as FileCaptionPair[];
      pairsCollection.value.push(pairCollection);
    };

    const { addPost } = usePostApi(pairsCollection, title, from, to, color);

    return {
      title,
      from,
      to,
      color,
      pairsCollection,
      addPhotoArea,
      savePhotosToCollection,
      addPost,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/scss/colors";
</style>
