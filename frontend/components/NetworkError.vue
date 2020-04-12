<template>
  <v-layout fill-height column align-center justify-center>
    <v-icon class="custom-large">cloud_off</v-icon>
    <h3 class="title grey--text font-weight-medium text--darken-1 text-xs-center">Нет подключения к Интернету</h3>
    <h4 class="subheading grey--text text--darken-1 text-xs-center">Повторите попытку позже</h4>
    <v-btn
      bottom
      round
      large
      dark
      color="blue"
      class="elevation-24 mt-5"
      @click="refresh">
      Перезагрузить
      </v-btn>
  </v-layout>
</template>

<script>
export default {
  name: 'AppNetworkError',

  methods: {
    refresh() {
      location.reload();
    }
  }
}
</script>

<style scoped>
.custom-large {
  font-size: 60px;
}
</style>

