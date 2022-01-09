<template>
  <div class="w-40 h-40 bg-white">
    <div
      :class="`${name} h-[90%] rounded-t-full flex flex-col justify-center items-center`"
    >
      <div class="w-3/4 h-1/2 flex justify-around items-center">
        <div
          class="w-1/3 h-5/6 rounded-3xl bg-white flex flex-col justify-end items-center"
        >
          <div class="w-1/2 h-1/3 bg-blue-700 rounded-full" />
        </div>
        <div
          class="w-1/3 h-5/6 rounded-3xl bg-white flex flex-col justify-end items-center"
        >
          <div class="w-1/2 h-1/3 bg-blue-700 rounded-full" />
        </div>
      </div>
    </div>
    <div :class="`${name} tail h-[10%]`" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.component('GhostCharacter', {
  props: {
    name: {
      type: String,
      required: true,
      validator: (value) =>
        ['pinky', 'blinky', 'inky', 'clyde'].includes(value),
    },
  },
})
</script>
<style lang="css" scoped>
.pinky {
  background-color: hotpink;
}

.blinky {
  background-color: crimson;
}

.inky {
  background-color: aqua;
}

.clyde {
  background-color: darkorange;
}

.tail {
  clip-path: polygon(
    0 0,
    0 100%,
    10% 0%,
    20% 100%,
    30% 0%,
    40% 100%,
    50% 0%,
    60% 100%,
    70% 0%,
    80% 100%,
    90% 0%,
    100% 100%,
    100% 0%
  );
  animation: move-tail 0.7s steps(3, jump-both) 0s infinite normal;
}

@keyframes move-tail {
  0% {
    clip-path: polygon(
      0 0,
      0 100%,
      10% 0%,
      20% 100%,
      30% 0%,
      40% 100%,
      50% 0%,
      60% 100%,
      70% 0%,
      80% 100%,
      90% 0%,
      100% 100%,
      100% 0%
    );
  }

  50% {
    clip-path: polygon(
      0 0,
      10% 100%,
      20% 0%,
      30% 100%,
      40% 0%,
      50% 100%,
      60% 0%,
      70% 100%,
      80% 0%,
      90% 100%,
      100% 0%
    );
  }

  100% {
    clip-path: polygon(
      0 0,
      0 100%,
      10% 0%,
      20% 100%,
      30% 0%,
      40% 100%,
      50% 0%,
      60% 100%,
      70% 0%,
      80% 100%,
      90% 0%,
      100% 100%,
      100% 0%
    );
  }
}
</style>
