<template>
  <space-page />
</template>
<script lang="ts">
import Vue from 'vue'
import SpacePage from '~/components/organisms/space-page.vue'

export default Vue.extend({
  name: 'SpacePage',
  components: { 'space-page': SpacePage },
})
</script>
