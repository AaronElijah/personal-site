<template>
  <div>
    <h1>Hello world!</h1>
    <div class="w-40 h-40 bg-white flex flex-col">
      <div class="flex-1 bg-yellow-600 rounded-full scale-95">
        <div
          class="w-[10%] h-[10%] rounded-full bg-black relative left-[55%] top-1/4"
        />
        <div class="pacman-mouth" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  layout: 'side-bar',
})
</script>
<style lang="css" scoped>
.pacman-mouth {
  background: white;
  height: 100%;
  width: 100%;
  position: relative;
  clip-path: polygon(110% 10%, 50% 40%, 110% 70%);
  animation-name: eat;
  animation-duration: 0.7s;
  animation-iteration-count: infinite;
}

@keyframes eat {
  0% {
    clip-path: polygon(110% 40%, 50% 40%, 110% 40%);
  }

  50% {
    clip-path: polygon(110% 10%, 50% 40%, 110% 70%);
  }

  100% {
    clip-path: polygon(110% 40%, 50% 40%, 110% 40%);
  }
}
</style>
