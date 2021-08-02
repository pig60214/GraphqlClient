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
          <input type="file" multiple="multiple" accept="image/*" class="form-control" @change="getImages">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="addPost">儲存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default defineComponent({
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
    const images = ref([] as File[]);

    const toBase64 = (file: File) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // @ts-ignore
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });

    // @ts-ignore
    const getImages = async (e) => {
      images.value = e.target.files;
    };

    const { mutate } = useMutation(gql`
      mutation ($addPostInput: AddPostInput!) {
        addPost(addPostInput: $addPostInput) {
          title,
        }
      }
    `);

    const addPost = async () => {
      const toBase64Promise = Object.values(images.value).map(async image => {
        const base64Image = await toBase64(image);
        return base64Image;
      });

      const base64Images = await Promise.all(toBase64Promise);
      mutate({
        addPostInput: {
          title: title.value,
          from: from.value,
          to: to.value,
          images: base64Images,
        },
      });
    };

    return {
      title,
      from,
      to,
      getImages,
      addPost,
    };
  },
});
</script>
