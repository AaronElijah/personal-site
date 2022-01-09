<template>
  <div
    class="h-screen w-full bg-inherit overflow-hidden py-4 pl-4 flex justify-center items-center"
    @wheel.prevent
  >
    <ghost-character
      class="absolute"
      name="pinky"
      :style="{
        left: `${characterPositions.pinky.x}%`,
        top: `${characterPositions.clyde.y}%`,
      }"
      :is-vulnerable="isEating"
    />
    <ghost-character
      class="absolute"
      name="blinky"
      :style="{
        left: `${characterPositions.blinky.x}%`,
        top: `${characterPositions.clyde.y}%`,
      }"
      :is-vulnerable="isEating"
    />
    <ghost-character
      class="absolute"
      name="inky"
      :style="{
        left: `${characterPositions.inky.x}%`,
        top: `${characterPositions.clyde.y}%`,
      }"
      :is-vulnerable="isEating"
    />
    <ghost-character
      class="absolute"
      name="clyde"
      :style="{
        left: `${characterPositions.clyde.x}%`,
        top: `${characterPositions.clyde.y}%`,
      }"
      :is-vulnerable="isEating"
    />
    <pacman-character
      id="pacman"
      :class="`absolute ${isEating ? 'scale-x-[-1]' : ''}`"
      :style="{
        left: `${characterPositions.pacman.x}%`,
        top: `${characterPositions.clyde.y}%`,
      }"
    />

    <slot />
  </div>
</template>
<script lang="ts">
import { CombinedVueInstance } from 'vue/types/vue'
import PacmanCharacter from '~/components/atoms/pacman-character.vue'
import GhostCharacter from '~/components/atoms/ghost-character.vue'

type Characters = 'pacman' | 'pinky' | 'clyde' | 'inky' | 'blinky'

const startPositionChase: Record<Characters, { x: number; y: number }> = {
  pacman: {
    x: 5,
    y: 5,
  },
  pinky: {
    x: -30,
    y: 5,
  },
  blinky: {
    x: -60,
    y: 5,
  },
  inky: {
    x: -90,
    y: 5,
  },
  clyde: {
    x: -120,
    y: 5,
  },
}

const endPositionChase: Record<Characters, { x: number; y: number }> = {
  pacman: {
    x: 203, // positions are slightly less than the end position when going forward due to adding on the movement of the scroll
    y: 5,
  },
  pinky: {
    x: 218,
    y: 5,
  },
  blinky: {
    x: 188,
    y: 5,
  },
  inky: {
    x: 158,
    y: 5,
  },
  clyde: {
    x: 128,
    y: 5,
  },
}

const startPositionEat: Record<Characters, { x: number; y: number }> = {
  pacman: {
    x: 280,
    y: 75,
  },
  pinky: {
    x: 220,
    y: 75,
  },
  blinky: {
    x: 190,
    y: 75,
  },
  inky: {
    x: 160,
    y: 75,
  },
  clyde: {
    x: 130,
    y: 75,
  },
}

type IScrollPacman = CombinedVueInstance<
  Vue,
  {
    animationStep: number
    characterPositions: Record<
      Characters,
      {
        x: number
        y: number
      }
    >
    isEating: boolean
  },
  unknown,
  unknown,
  Readonly<{
    wheelMovement: number
  }>
>

export default {
  name: 'ScrollPacman',
  components: { PacmanCharacter, GhostCharacter },
  props: {
    wheelMovement: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      animationStep: 0,
      characterPositions: startPositionChase,
      isEating: false,
    }
  },
  watch: {
    wheelMovement(val: number) {
      const this_ = this as unknown as IScrollPacman
      const characters = Object.keys(this_.characterPositions) as Characters[]

      if (this_.animationStep < 50) {
        if (val >= 0) {
          // Going forward being chased
          for (const character of characters) {
            const displacement = character === 'pacman' ? 2 : 2.5
            this_.characterPositions[character].x += displacement
          }

          this_.animationStep += 0.5
        } else if (val < 0 && this_.animationStep > 0) {
          // Going backwards being chased
          for (const character of characters) {
            const displacement = character === 'pacman' ? 2 : 2.5
            this_.characterPositions[character].x -= displacement
          }

          this_.animationStep -= 0.5
        }
      } else if (this_.animationStep >= 50) {
        if (val >= 0) {
          // Going forward on the eat animation
          for (const character of characters) {
            const displacement = character === 'pacman' ? 2.5 : 2
            this_.characterPositions[character].x -= displacement
          }

          this_.animationStep += 0.5
        } else if (val < 0) {
          // Going backward (actually left->right) on the eat animation
          for (const character of characters) {
            const displacement = character === 'pacman' ? 2.5 : 2
            this_.characterPositions[character].x += displacement
          }

          this_.animationStep -= 0.5
        }
      }
    },
    animationStep(val: number, oldVal: number) {
      const this_ = this as unknown as IScrollPacman
      if (val > 50 && oldVal <= 50) {
        // Move to the next row
        this_.characterPositions = startPositionEat
        this_.isEating = true
      } else if (val < 50 && oldVal >= 50) {
        // Reverse to previous row
        this_.characterPositions = endPositionChase
        this_.isEating = false
      }
    },
  },
}
</script>
<style lang="css">
div {
  background-color: inherit;
}
</style>
