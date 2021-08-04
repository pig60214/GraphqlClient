import {
  computed,
  ref,
  Ref,
  watch,
} from 'vue';
import Post from '@/interface/Post';

export default function usePostEditor(isNewPost: Ref<boolean>, dateString: Ref<string>, post: Ref<Post | undefined>) {
  const originalTitle = computed(() => {
    if (isNewPost.value) {
      return dateString.value;
    }
    return post.value ? post.value.title : '';
  });

  const title = ref('');

  watch(originalTitle, () => {
    title.value = originalTitle.value;
  });

  return {
    title,
  };
}
