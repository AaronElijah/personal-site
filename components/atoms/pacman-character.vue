<template>
  <div class="container">
    <div class="h-full w-full bg-yellow-400 rounded-full">
      <div
        class="w-[10%] h-[10%] rounded-full bg-black relative left-[55%] top-1/4"
      />
    </div>
    <div class="pacman-mouth z-postbox" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({ name: 'PacmanCharacter' })
</script>
<style lang="postcss" scoped>
.container {
  width: 10rem;
  height: 10rem;
  background-color: inherit;
}

.pacman-mouth {
  background-color: inherit;
  height: 100%;
  width: 100%;
  top: -90%;
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
