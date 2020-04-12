<template>
  <div transition="fade-transition" v-if="show" class="custom-background"/>
</template>

<script>
export default {
  name: 'AppBackground',

  computed: {
    show() {
      return this.$route.name === 'index' 
        || this.$route.name === 'add'
        || this.$route.name === 'auth'
        || this.$route.name === 'registration'
        || this.$route.name === 'profile'
        || this.$route.name === 'training'
    }
  }
}
</script>

<style scoped>
.custom-background {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  /* background-image: url('~static/doodles.png') !important; */
  background: url('~static/memphis-colorful.png');
  /* background-image: url('~static/leaves-pattern.png') !important; */
}
</style>

