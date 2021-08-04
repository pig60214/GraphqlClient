import { Ref } from 'vue';
import FileCaptionPair from '@/interface/FileCaptionPair';
import fileToBase64 from '@/helpers/toBase64FileHelper';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default function usePostApi(pairsCollection: Ref<FileCaptionPair[][]>, title: Ref<string>, from: Ref<string>, to: Ref<string>, color: Ref<string>) {
  const { mutate } = useMutation(gql`
    mutation ($addPostInput: AddPostInput!) {
      addPost(addPostInput: $addPostInput) {
        title,
      }
    }
  `);

  const addPost = async () => {
    const pairs = pairsCollection.value.flat();
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

  return {
    addPost,
  };
}
