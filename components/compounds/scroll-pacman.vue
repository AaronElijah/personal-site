<template>
  <div class="h-screen w-full concentric">
    <pacman-character
      :class="`relative left-[${percentageAnimationComplete}]`"
      :style="{ left: `${percentageAnimationComplete}%` }"
    />
  </div>
</template>
<script lang="ts">
import pacmanCharacter from '~/components/atoms/pacman-character.vue'

export default {
  name: 'ScrollPacman',
  components: { pacmanCharacter },
  props: {
    wheelMovement: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      percentageAnimationComplete: 0.5,
    }
  },
  watch: {
    wheelMovement(val: number) {
      if (val >= 0 && this.percentageAnimationComplete < 100) {
        this.percentageAnimationComplete += 0.5
      } else if (val < 0 && this.percentageAnimationComplete > 0.5) {
        this.percentageAnimationComplete -= 0.5
      }
    },
  },
}
// :class="`relative left-[${percentageAnimationComplete}%]`"
</script>
<style lang="css">
.concentric {
  /* background: repeating-radial-gradient(red 0 8%, yellow 8% 16%, blue 16% 24%); */
  background-color: darkseagreen;
}
</style>
