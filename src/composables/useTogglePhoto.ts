import { useStore } from '@/store';
import { computed } from 'vue';

export default function useTogglePhoto() {
  const store = useStore();
  const showPhotoInMobile = computed(() => store.state.showPhotoInMobile);
  const toggle = () => { store.state.showPhotoInMobile = !store.state.showPhotoInMobile; };
  const showPhoto = () => { store.state.showPhotoInMobile = true; };
  return { showPhotoInMobile, toggle, showPhoto };
}
