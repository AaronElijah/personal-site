<template>
  <silly-page />
</template>
<script lang="ts">
import Vue from 'vue'
import SillyPage from '~/components/molecules/silly-page.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: { 'silly-page': SillyPage },
  layout: 'side-bar',
})
</script>
