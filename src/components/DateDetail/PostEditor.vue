<template>
  <div class="modal fade" id="postEditor" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content bg-bg-color">
        <div class="modal-header">
          <div class="input-group">
            <span class="input-group-text">Title</span>
            <input type="text" class="form-control" :placeholder="dateString" v-model="editingPost.title">
            <button class="btn btn-outline-dark" type="button" @click="editingPost.title = ''">✖</button>
          </div>
        </div>
        <div class="modal-body">
          <div class="input-group mb-1">
            <input type="date" class="form-control" v-model="editingPost.from">
            <span class="input-group-text">~</span>
            <input type="date" class="form-control" v-model="editingPost.to">
          </div>
          <div class="input-group mb-3 justify-content-end">
            <button class="btn btn-sm btn-outline-dark" type="button" @click="editingPost.to = editingPost.from">Same Start</button>
          </div>
          <div class="input-group">
            <span class="input-group-text">Color</span>
            <input type="radio" class="btn-check" name="colorOptions" id="light-blue" value="light-blue" v-model="editingPost.color">
            <label class="btn btn-light-blue mx-2" for="light-blue">Ｂ</label>
            <input type="radio" class="btn-check" name="colorOptions" id="light-yellow" value="light-yellow" v-model="editingPost.color">
            <label class="btn btn-light-yellow me-2" for="light-yellow">Ｙ</label>
            <input type="radio" class="btn-check" name="colorOptions" id="light-red" value="light-red" v-model="editingPost.color">
            <label class="btn btn-light-red" for="light-red">Ｒ</label>
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
          <button type="button" class="btn btn-sm btn-secondary" @click="addPhotoArea">
            <SvgIcon :svgName="'icon-add-photo'" :className="'tw-w-6 tw-h-6 tw-stroke-current tw-text-white'"/>
          </button>
          <button type="button" class="btn btn-sm btn-secondary"  @click="saveAction">
            <SvgIcon :svgName="'icon-upload'" :className="'tw-w-6 tw-h-6'"/>
          </button>
          <button type="button" id="closeBtn" class="btn btn-sm btn-secondary" data-bs-dismiss="modal" aria-label="Close">
            <SvgIcon :svgName="'icon-close'" :className="'tw-w-6 tw-h-6'"/>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    class="tw-w-screen tw-h-full tw-overflow-hidden tw-absolute tw-top-0 tw-left-0 bg-bg-color tw-opacity-95"
    style="z-index: 2147483647"
    :class="{'tw-hidden': !masked}"
  >
    <div class="centered-element" :class="{'tw-animate-pulse': masked}">
      <div class="tw-flex tw-space-x-4" :class="{'tw-animate-bounce': masked}">
        <SvgIcon :svgName="'icon-upload'" :className="'tw-w-20 text-light-red'" />
        <SvgIcon :svgName="'icon-upload'" :className="'tw-w-20 text-light-blue'" />
        <SvgIcon :svgName="'icon-upload'" :className="'tw-w-20 text-light-yellow'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  toRefs,
  watch,
} from 'vue';
import FileCaptionPair from '@/interface/FileCaptionPair';
import Post from '@/interface/Post';
import useMutationPostApi from '@/composables/useMutationPostApi';
import EnumColor from '@/enum/EnumColor';
import PostEditorAddPhotoArea from './PostEditorAddPhotoArea.vue';
import SvgIcon from '../SvgIcon.vue';

export default defineComponent({
  components: { PostEditorAddPhotoArea, SvgIcon },
  name: 'PostEditor',
  props: {
    isNewPost: {
      type: Boolean,
      required: true,
    },
    dateString: {
      type: String,
      required: true,
    },
    post: {
      type: Object as () => Post,
    },
    refetch: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { isNewPost, dateString, post } = toRefs(props);
    const existingPost = ref({ ...props.post } as Post);

    watch(post, () => { existingPost.value = { ...props.post } as Post; });

    const newPost = ref({
      id: 0,
      title: '',
      from: dateString.value,
      to: dateString.value,
      color: EnumColor.LightBlue,
    } as Post);

    const editingPost = computed(() => {
      if (isNewPost.value) {
        return newPost.value;
      }
      if (existingPost.value) {
        return existingPost.value;
      }
      return newPost.value;
    });

    const pairsCollection = ref([] as FileCaptionPair[][]);

    const savePhotosToCollection = (photoAreaId: number, pairs: FileCaptionPair[]) => {
      // @ts-ignore
      pairsCollection.value[photoAreaId] = pairs;
    };

    const addPhotoArea = () => {
      const pairCollection = [] as FileCaptionPair[];
      pairsCollection.value.push(pairCollection);
    };

    const clearPhotoArea = () => {
      pairsCollection.value.splice(0, pairsCollection.value.length);
    };

    watch(editingPost, () => { clearPhotoArea(); });

    const {
      addPost,
      updatePost,
      addPostApiLoading,
      updatePostApiLoading,
    } = useMutationPostApi(pairsCollection, editingPost);

    const masked = ref(false);

    const saveAction = () => {
      masked.value = true;
      if (editingPost.value.title === '') {
        editingPost.value.title = dateString.value;
      }

      const save = isNewPost.value ? addPost : updatePost;
      save();
    };
    const loading = computed(() => isNewPost.value ? addPostApiLoading.value : updatePostApiLoading.value);

    watch(loading, (to, from) => {
      if (from && !to) { // from loading to not loading
        const closeBtn = document.getElementById('closeBtn');
        if (closeBtn) {
          closeBtn.click();
        }
        masked.value = false;
        props.refetch();
      }
    });

    return {
      editingPost,
      pairsCollection,
      addPhotoArea,
      savePhotosToCollection,
      saveAction,
      masked,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/scss/colors";

* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.btn-secondary {
  background: $font-color;
}

.centered-element {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<style lang="postcss" scoped>
.input-group-text {
  @apply tw-bg-transparent
}

.form-control, .input-group-text {
  @apply tw-border-black
}
</style>
