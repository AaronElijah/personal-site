<template>
  <div
    id="title-card"
    class="text-center border-[1rem] border-double border-blue-800 title-box"
  >
    <h1 class="text-8xl">{{ heading }}</h1>
    <h3 class="text-4xl">{{ subheading }}</h3>
  </div>
</template>
<script lang="ts">
import { FetchReturn } from '@nuxt/content/types/query-builder'
import Vue from 'vue'

export default Vue.extend({
  name: 'TitleCard',
  props: {
    viewportMousePosition: {
      type: Object,
      default() {
        return {
          x: 0,
          y: 0,
        }
      },
    },
  },
  data() {
    return {
      heading: '',
      subheading: '',
    }
  },
  async fetch() {
    const { heading, subheading } = (await this.$content(
      'home'
    ).fetch()) as FetchReturn & { heading: string; subheading: string }
    this.heading = heading
    this.subheading = subheading
  },
  watch: {
    viewportMousePosition(val: { x: number; y: number }) {
      const titleCard = document.querySelector('#title-card') as HTMLDivElement
      const rect = titleCard.getBoundingClientRect()
      const vectorToMouse = {
        x: val.x - (rect.x + 0.5 * rect.width),
        y: val.y - (rect.y + 0.5 * rect.height),
      }
      const angle = Math.atan(vectorToMouse.y / vectorToMouse.x)

      titleCard.style.setProperty(
        '--box-shadow-top',
        `${Math.abs(Math.sin(angle) * 2)}rem`
      )
      titleCard.style.setProperty(
        '--box-shadow-bottom',
        `${-Math.abs(Math.sin(angle) * 2)}rem`
      )
      titleCard.style.setProperty(
        '--box-shadow-left',
        `${Math.abs(Math.cos(angle) * 2)}rem`
      )
      titleCard.style.setProperty(
        '--box-shadow-right',
        `${-Math.abs(Math.cos(angle) * 2)}rem`
      )
    },
  },
})
</script>
<style scoped>
.title-box {
  --box-shadow-top: 2rem;
  --box-shadow-right: -2rem;
  --box-shadow-bottom: -2rem;
  --box-shadow-left: 2rem;

  box-shadow: var(--box-shadow-right) var(--box-shadow-bottom) darkturquoise,
    var(--box-shadow-left) var(--box-shadow-top) lightcoral;
}
</style>
