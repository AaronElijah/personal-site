<template>
  <div>
    <scroll-pacman :wheel-movement="wheelMovement" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ScrollPacman from '~/components/compounds/scroll-pacman.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    'scroll-pacman': ScrollPacman,
  },
  layout: 'side-bar',
  data() {
    return {
      wheelYCount: 0,
      wheelMovement: 0,
    }
  },
  watch: {
    wheelYCount(val: number, oldVal: number) {
      this.wheelMovement = val - oldVal
    },
  },
  mounted() {
    window.addEventListener('wheel', (event: WheelEvent) => {
      this.wheelYCount += event.deltaY
    })
  },
})
</script>
