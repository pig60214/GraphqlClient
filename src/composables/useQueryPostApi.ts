import { reactive, Ref, watch } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import Post from '@/interface/Post';
import { useStore } from '@/store';

export default function useQueryPostApi() {
  const store = useStore();

  const variable = reactive({
    postsQueryInput: {
      from: store.state.currentMonth.firstDateString,
      to: store.state.currentMonth.lastDateString,
    },
  });

  watch(
    () => store.state.currentMonth,
    (newVal, oldVal) => {
      if (newVal.equals(oldVal)) return;
      variable.postsQueryInput.from = store.state.currentMonth.firstDateString;
      variable.postsQueryInput.to = store.state.currentMonth.lastDateString;
    },
  );

  const { result } = useQuery(gql`
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
  `, variable,
  {
    fetchPolicy: 'no-cache',
  });
  // @ts-ignore
  const posts: Ref<Readonly<Post[]>> = useResult(result, [] as Post[], data => data.posts as Post[]);
  return posts;
}
