import dateToString from '@/helpers/dateFormateHelper';
import { useStore } from '@/store';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default function useMonthPanel() {
  const store = useStore();
  const router = useRouter();
  const currentMonth = computed(() => store.state.currentMonth);

  const goToAddMonth = (month: number) => {
    const addMonth = currentMonth.value.addMonth(month);
    router.push({ name: 'Calendar', params: { dateString: dateToString(addMonth) } });
  };

  return { currentMonth, goToAddMonth };
}
