<template>
  <svg class="tw-inline tw-fill-current" :class="className !== undefined ? className : ''">
    <use :xlink:href="`#${svgName}`"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    svgName: {
      type: String,
      required: true,
    },
    className: String,
  },
  setup() {
    return {};
  },
});
</script>
