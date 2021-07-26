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
import axios, { AxiosRequestConfig } from 'axios';
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
    const images = ref([]);

    // @ts-ignore
    const getImages = (e) => {
      images.value = e.target.files;
    };

    const uploadPicture = () => {
      const config: AxiosRequestConfig = {
        url: 'https://api.imgur.com/3/image',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer beaf5d7bf18bed387f377c2d0668a9a88b4cd10e',
        },
        data: new FormData(),
      };

      images.value.forEach(image => {
        const form = new FormData();
        form.append('image', image);
        // @ts-ignore
        form.append('title', image.name);
        form.append('description', title.value);
        form.append('album', 'uDUHmuu');
        config.data = form;

        axios(config)
          .then(res => console.log(res))
          .catch(e => console.log(e));
      });
    };

    const { mutate: addPost } = useMutation(gql`
      mutation ($addPostInput: AddPostInput!) {
        addPost(addPostInput: $addPostInput) {
          title,
        }
      }
    `,
    {
      variables: {
        addPostInput: {
          title: title.value,
        },
      },
    });

    return {
      title,
      from,
      to,
      getImages,
      uploadPicture,
      addPost,
    };
  },
});
</script>
