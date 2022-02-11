<template>
  <div id="home-page-container" class="bg-green-300">
    <scroll-pacman :wheel-movement="wheelMovement">
      <title-card :viewport-mouse-position="viewportMousePosition" />
    </scroll-pacman>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import ScrollPacman from '~/components/compounds/scroll-pacman.vue'
import TitleCard from '~/components/compounds/title-card.vue'

function splash(x: number, y: number) {
  const homePage = document.querySelector('#home-page-container') as Element
  for (let i = 0; i < 15; i++) {
    const bubble = document.createElement('div')
    bubble.style.position = 'absolute'
    bubble.style.backgroundColor =
      '#' + Math.floor(Math.random() * 16777215).toString(16)
    bubble.style.top = `${y}px`
    bubble.style.left = `${x}px`
    bubble.style.width = '10px'
    bubble.style.height = '10px'
    homePage.appendChild(bubble)
    setTimeout(function move() {
      const deltaY = Math.random() > 0.5 ? 10 : -10
      const deltaX = Math.random() > 0.5 ? 10 : -10
      const currentTop = Number(bubble.style.top.split('px')[0])
      const currentLeft = Number(bubble.style.left.split('px')[0])
      bubble.style.top = `${currentTop - deltaY}px`
      bubble.style.left = `${currentLeft + deltaX}px`
      setTimeout(move, 50)
    }, 50)
    setTimeout(() => homePage.removeChild(bubble), 3000)
  }
}

function explode() {
  const explosion = new Audio('/sounds/arcade_explode.wav')
  explosion.currentTime = 0
  explosion.play()
}

export default Vue.extend({
  name: 'SillyPage',
  components: {
    'scroll-pacman': ScrollPacman,
    'title-card': TitleCard,
  },
  data() {
    return {
      wheelYCount: 0,
      wheelMovement: 0,
      viewportMousePosition: { x: 0, y: 0 },
      heading: '',
      subheading: '',
    }
  },
  watch: {
    wheelYCount(val: number, oldVal: number) {
      this.wheelMovement = val - oldVal
    },
  },
  mounted() {
    window.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        e.preventDefault()
        this.wheelYCount += e.deltaY
      },
      { passive: false }
    )
    const homePage = document.querySelector('#home-page-container') as Element

    const isMouseEvent = (e: Event | MouseEvent): e is MouseEvent => 'x' in e
    homePage.addEventListener('mousemove', (e: Event) => {
      if (isMouseEvent(e)) {
        this.viewportMousePosition = { x: e.x, y: e.y }
      }
    })

    homePage.addEventListener('click', (e: Event) => {
      if (isMouseEvent(e)) {
        splash(e.pageX, e.pageY)
        explode()
      }
    })
  },
})
</script>
