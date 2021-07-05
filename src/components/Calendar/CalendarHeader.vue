<template>
    <div class="ratio ratio-1x1">
        <img alt="Tree House" src="@/assets/TreeHouse.jpg">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CalenderHeader',
});
</script>

<style lang="sass" scoped>
  img
    max-height: 100%
    max-width: 100%
    width: auto
    height: auto
    margin: auto
    right: 0
    bottom: 0
</style>
