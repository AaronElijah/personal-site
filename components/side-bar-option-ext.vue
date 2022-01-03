<template>
  <div class="side-bar-icon-ext">
    <fa-icon :icon="icon" transform="shrink-8" />
    <span class="tooltip">{{ name }}</span>
  </div>
</template>
<script>
export default {
  props: {
    icon: { type: String, required: true },
    name: { type: String, required: true },
  },
}
</script>
<style lang="postcss">
.side-bar-icon-ext {
  @apply relative flex items-center justify-center h-12 w-12 mt-2 mb-2 ml-2 shadow-lg bg-gray-800 text-green-500 rounded-3xl transition-all duration-300 ease-linear cursor-pointer;

  &:hover {
    @apply bg-green-600 text-white rounded-xl;
  }
}

.side-bar-icon-ext > .tooltip {
  @apply absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold origin-left;
}
</style>
