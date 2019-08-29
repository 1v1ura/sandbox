<template>
  <div>
    <TheHeader />
    <div class="wrapper">
      <nuxt />
    </div>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader'

export default {
  components: {
    TheHeader
  }
}
</script>
