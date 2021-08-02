<template>
  <div class="modal fade" id="postEditor" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="input-group">
            <span class="input-group-text">標題</span>
            <input type="text" class="form-control" v-model="title">
          </div>
        </div>
        <div class="modal-body">
          <div class="input-group mb-3">
            <span class="input-group-text">日期</span>
            <input type="date" class="form-control" v-model="from">
            <span class="input-group-text">~</span>
            <input type="date" class="form-control" v-model="to">
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
import { defineComponent, reactive, ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import FileCaptionPair from '@/interface/FileCaptionPair';
import Base64FileCaptionPair from '@/interface/Base64FileCaptionPair';
import EnumColor from '@/enum/EnumColor';
import PostEditorAddPhotoArea from './PostEditorAddPhotoArea.vue';

export default defineComponent({
  components: { PostEditorAddPhotoArea },
  name: 'PostEditor',
  props: {
    dateString: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const title = ref(props.dateString);
    const from = ref(props.dateString);
    const to = ref(props.dateString);
    const color = ref(EnumColor.LightBlue);

    const toBase64 = (file: File) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // @ts-ignore
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });

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
      const toBase64Promise = pairs.map(async pair => {
        const base64File = await toBase64(pair.file);
        return { base64File, caption: pair.caption } as Base64FileCaptionPair;
      });

      const base64FileCaptionPairs = await Promise.all(toBase64Promise);
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
