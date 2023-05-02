import { Ref } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import Post from '@/interface/Post';
import PostsQueryInput from '@/interface/graphql/PostsQueryInput';

export default function useQueryPostApi(variable: Ref<PostsQueryInput>) {
  const { result, refetch, loading } = useQuery(gql`
    query ($postsQueryInput: PostsQueryInput!){
      posts(postsQueryInput: $postsQueryInput){
        id,
        title,
        from,
        to,
        color,
        photos {
          path,
          caption
        },
      }
    }
  `, {
    postsQueryInput: variable.value,
  },
  {
    fetchPolicy: 'no-cache',
  });
  // @ts-ignore
  const posts: Ref<Readonly<Post[]>> = useResult(result, [] as Post[], data => data.posts as Post[]);
  return { posts, refetch, loading };
}
