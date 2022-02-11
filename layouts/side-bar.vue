<template>
  <div>
    <div v-if="!isExtended">
      <div
        class="fixed top-0 left-0 h-screen w-[3.75rem] m-0 flex flex-col bg-gray-900 text-white shadow-lg"
      >
        <side-bar-option
          v-for="sidebarIcon in sidebarIcons"
          :key="sidebarIcon.icon"
          :icon="sidebarIcon.icon"
          :name="sidebarIcon.name"
          :href="sidebarIcon.href"
        />
      </div>
      <div
        class="fixed top-0 left-[3.75rem] h-screen w-1 cursor-move bg-gray-500 z-10"
        @mousedown="onMouseDown"
      />
      <div class="ml-[3.75rem]">
        <Nuxt />
      </div>
    </div>
    <div v-else>
      <div
        class="fixed top-0 left-0 h-screen w-[12.75rem] m-0 flex flex-col items-start bg-gray-900 text-white shadow-lg"
      >
        <!-- Alter the key of elements to explicity render new component, rather than wait for tooltip to transition -->
        <side-bar-option
          v-for="sidebarIcon in sidebarIcons"
          :key="sidebarIcon.icon + '-ext'"
          :icon="sidebarIcon.icon"
          :name="sidebarIcon.name"
          :is-extended="isExtended"
          :href="sidebarIcon.href"
        />
      </div>
      <div
        class="fixed top-0 left-[12.75rem] h-full w-1 cursor-move bg-gray-500"
        @mousedown="onMouseDown"
      />
      <div class="ml-[12.75rem]">
        <Nuxt />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { CombinedVueInstance } from 'vue/types/vue'

type ISideBar = CombinedVueInstance<
  Vue,
  {
    current: number
    start: number
    isExtended: boolean
    sidebarIcons: {
      icon: string
      name: string
      href: string
    }[]
  },
  {
    onMouseDown: (e: MouseEvent) => void
  },
  unknown,
  Readonly<Record<keyof Vue, any>>
>

export default Vue.extend({
  name: 'SideBar',
  data() {
    return {
      current: 0,
      start: 0,
      isExtended: false,
      sidebarIcons: [
        {
          icon: 'fire',
          name: 'Home 🧘🏻',
          href: '/',
        },
        { icon: 'chart-pie', name: 'Charts ⚡', href: '/' },
        { icon: 'plus', name: 'Blogs 📜', href: '/space' },
        { icon: 'hat-wizard', name: 'Wizardy 🦄', href: '/' },
        { icon: 'biohazard', name: 'Risky! ⚠️', href: '/' },
      ],
    }
  },
  watch: {
    current(val: number) {
      const oldExtended = this.isExtended
      this.isExtended = !oldExtended
        ? val > this.start + 150
        : val > this.start - 150
      if (this.isExtended !== oldExtended) {
        this.start = val
      }
    },
  },
  methods: {
    onMouseDown(e: MouseEvent) {
      e.preventDefault()
      const this_ = this as unknown as ISideBar
      this_.start = e.clientX

      function elementDrag(e: MouseEvent) {
        e.preventDefault()
        // calculate the new cursor position:
        this_.current = e.clientX
      }

      function closeDragElement() {
        document.onmouseup = null
        document.onmousemove = null
      }

      document.onmouseup = closeDragElement.bind(this_)
      document.onmousemove = elementDrag.bind(this_)
    },
  },
})
</script>
<style lang="postcss" scoped>
div {
  z-index: 50;
}
</style>
