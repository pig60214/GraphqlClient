import { onMounted, onUnmounted, ref } from 'vue';

export default function useWindowSize() {
  const windowWidth = ref(window.innerWidth);
  const windowHeight = ref(window.innerHeight);

  const handleResize = () => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  return { windowWidth, windowHeight };
}
