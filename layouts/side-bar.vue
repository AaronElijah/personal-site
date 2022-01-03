<template>
  <div>
    <div v-if="!isExtended">
      <div
        class="fixed top-0 left-0 h-screen w-[3.75rem] m-0 flex flex-col bg-gray-900 text-white shadow-lg"
      >
        <side-bar-option icon="fire" name="home by the fire 🧘🏻" />
        <side-bar-option icon="chart-pie" name="cool charts ⚡" />
        <side-bar-option icon="plus" name="blogs 📜" />
        <side-bar-option icon="hat-wizard" name="code wizardy 🦄" />
        <side-bar-option icon="biohazard" name="risky! ⚠️" />
      </div>
      <div
        class="absolute top-0 left-[3.75rem] h-screen w-1 cursor-move bg-gray-500"
        @mousedown="onMouseDown"
      />
      <div class="ml-[4.25rem]">
        <div>{{ start }} - {{ current }} - {{ isExtended }}</div>
        <Nuxt />
      </div>
    </div>
    <div v-else>
      <div
        class="fixed top-0 left-0 h-screen w-[12.75rem] m-0 flex flex-col items-start bg-gray-900 text-white shadow-lg"
      >
        <side-bar-option-ext icon="fire" name="profile 🧘🏻" />
        <side-bar-option-ext icon="chart-pie" name="cool charts ⚡" />
        <side-bar-option-ext icon="plus" name="blogs 📜" />
        <side-bar-option-ext icon="hat-wizard" name="code wizardy 🦄" />
        <side-bar-option-ext icon="biohazard" name="risky! ⚠️" />
      </div>
      <div
        class="absolute top-0 left-[12.75rem] h-screen w-1 cursor-move bg-gray-500"
        @mousedown="onMouseDown"
      />
      <div class="ml-[13.25rem]">
        <div>{{ start }} - {{ current }} - {{ isExtended }}</div>
        <Nuxt />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

function onMouseDown(e: MouseEvent) {
  e.preventDefault()
  this.start = e.clientX
  document.onmouseup = closeDragElement.bind(this)
  document.onmousemove = elementDrag.bind(this)
}

function elementDrag(e: MouseEvent) {
  e.preventDefault()
  // calculate the new cursor position:
  this.current = e.clientX
}

function closeDragElement() {
  document.onmouseup = null
  document.onmousemove = null
}

export default Vue.extend({
  name: 'SideBar',
  data() {
    return { current: 0, start: 0, isExtended: false }
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
    onMouseDown,
  },
})
</script>
