<template>
  <div class="modal-body border-top">
  <div class="input-group mb-3">
    <span class="input-group-text">圖片標題</span>
    <input type="text" class="form-control" v-model="caption">
  </div>
  <input type="file" multiple="multiple" accept="image/*" class="form-control" @change="getFiles">
</div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import FileCaptionPair from '@/interface/FileCaptionPair';

export default defineComponent({
  props: {
    imagePartId: {
      type: Number,
      required: true,
    },
    setImages: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const caption = ref('');
    const files = ref([] as File[]);

    const getFiles = (e: Event) => {
      // @ts-ignore
      const fileList = e.target.files as FileList;
      files.value = Object.values(fileList);
    };

    watchEffect(() => {
      const pairs = files.value.map(file => {
        const pair: FileCaptionPair = { file, caption: caption.value };
        return pair;
      });
      props.setImages(props.imagePartId, pairs);
    });

    return { caption, getFiles };
  },
});
</script>
