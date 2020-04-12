<template>
  <v-flex xs12 sm8 md8 lg6>
    <v-layout align-center justify-center column fill-height>
      <h3 class="display-1 text-xs-center mb-3 font-weight-light">Coming soon...</h3>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  middleware: 'auth',

  head: () => ({
    title: `Тренировка в lioned.online`,
  }),
}
</script>