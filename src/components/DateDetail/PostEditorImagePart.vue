<template>
  <div class="modal-body border-top">
  <div class="input-group mb-3">
    <span class="input-group-text">圖片標題</span>
    <input type="text" class="form-control" :value="caption" @change="updatCaption">
  </div>
  <input type="file" multiple="multiple" accept="image/*" class="form-control" @change="getImages">
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    caption: String,
    updatCaption: Function,
    getImages: Function,
  },
});
</script>
