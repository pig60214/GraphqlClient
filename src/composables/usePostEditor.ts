import {
  computed,
  ref,
  Ref,
  watch,
} from 'vue';
import Post from '@/interface/Post';
import EnumColor from '@/enum/EnumColor';

export default function usePostEditor(isNewPost: Ref<boolean>, dateString: Ref<string>, post: Ref<Post | undefined>) {
  const originalTitle = computed(() => {
    if (isNewPost.value) {
      return dateString.value;
    }
    return post.value ? post.value.title : '';
  });

  const originalFrom = computed(() => {
    if (isNewPost.value) {
      return dateString.value;
    }
    return post.value ? post.value.from : '';
  });

  const originalTo = computed(() => {
    if (isNewPost.value) {
      return dateString.value;
    }
    return post.value ? post.value.to : '';
  });

  const originalColor = computed(() => {
    if (isNewPost.value) {
      return EnumColor.LightBlue;
    }
    return post.value ? post.value.color : EnumColor.LightBlue;
  });

  const title = ref('');
  const from = ref('');
  const to = ref('');
  const color = ref(EnumColor.LightBlue);

  watch(originalTitle, () => {
    title.value = originalTitle.value;
  });

  watch(originalFrom, () => {
    from.value = originalFrom.value;
  });

  watch(originalTo, () => {
    to.value = originalTo.value;
  });

  watch(originalColor, () => {
    color.value = originalColor.value;
  });

  return {
    title,
    from,
    to,
    color,
  };
}
