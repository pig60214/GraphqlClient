import { Ref } from 'vue';
import FileCaptionPair from '@/interface/FileCaptionPair';
import getBase64 from '@/helpers/imageHelper';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import Post from '@/interface/Post';

export default function useMutationPostApi(pairsCollection: Ref<FileCaptionPair[][]>, editedPost: Ref<Post>) {
  const { mutate: addPostApi, loading: addPostApiLoading } = useMutation(gql`
    mutation ($addPostInput: AddPostInput!) {
      addPost(addPostInput: $addPostInput) {
        title,
      }
    }
  `);

  const addPost = async () => {
    const pairs = pairsCollection.value.flat();
    const base64FileCaptionPairs = await getBase64(pairs);
    addPostApi({
      addPostInput: {
        title: editedPost.value.title,
        from: editedPost.value.from,
        to: editedPost.value.to,
        color: editedPost.value.color,
        photos: base64FileCaptionPairs,
      },
    });
  };

  const { mutate: updatePostApi, loading: updatePostApiLoading } = useMutation(gql`
    mutation ($updatePostInput: UpdatePostInput!) {
      updatePost(updatePostInput: $updatePostInput) {
        title,
      }
    }
  `);

  const updatePost = async () => {
    const pairs = pairsCollection.value.flat();
    const base64FileCaptionPairs = await getBase64(pairs);
    updatePostApi({
      updatePostInput: {
        id: editedPost.value.id,
        title: editedPost.value.title,
        from: editedPost.value.from,
        to: editedPost.value.to,
        color: editedPost.value.color,
        addPhotos: base64FileCaptionPairs,
      },
    });
  };

  return {
    addPost,
    updatePost,
    addPostApiLoading,
    updatePostApiLoading,
  };
}
