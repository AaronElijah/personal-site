<template>
  <div :class="iconClassObject">
    <a :href="href">
      <fa-icon :icon="icon" class="scale-150" />
    </a>
    <span :class="spanClassObject">{{ name }}</span>
  </div>
</template>
<script>
export default {
  props: {
    icon: { type: String, required: true },
    name: { type: String, required: true },
    isExtended: { type: Boolean, default: false },
    href: { type: String, default: '/' },
  },
  computed: {
    iconClassObject() {
      return this.isExtended
        ? { 'side-bar-icon-ext': true, group: false }
        : {
            'side-bar-icon': true,
            group: true,
          }
    },
    spanClassObject() {
      return this.isExtended
        ? {
            tooltip: true,
            'group-hover:scale-100': false,
          }
        : {
            tooltip: true,
            'group-hover:scale-100': true,
          }
    },
  },
}
</script>
<style lang="postcss">
.side-bar-icon {
  @apply relative flex flex-row items-center justify-center h-12 w-12 mt-2 mb-2 mx-2 shadow-lg bg-gray-800 text-green-500 rounded-3xl transition-all duration-300 ease-linear cursor-pointer;
  &:hover {
    @apply bg-green-600 text-white rounded-xl;
  }
}
.side-bar-icon > .tooltip {
  @apply absolute inset-0 w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left;
}
.side-bar-icon-ext {
  @apply relative flex items-center justify-center h-12 w-12 mt-2 mb-2 ml-2 shadow-lg bg-gray-800 text-green-500 rounded-3xl transition-all duration-300 ease-linear cursor-pointer;
  &:hover {
    @apply bg-green-600 text-white rounded-xl;
  }
}
.side-bar-icon-ext > .tooltip {
  @apply absolute inset-0 w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold origin-left;
}
</style>
