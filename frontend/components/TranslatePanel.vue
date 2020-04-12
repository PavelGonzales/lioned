<template>
  <v-card color="white" class="pa-3 elevation-24 brt-8">
    <div class="caption text-uppercase font-weight-light">Оригинал</div>

    <v-layout align-center class="mb-3">
      <v-progress-linear
        v-if="loadOriginal"
        class="my-0"
        height="24"
        color="grey lighten-3" 
        indeterminate />

      <div v-else class="headline">{{ original }}</div>
    </v-layout>

    <div class="caption text-uppercase font-weight-light">Перевод</div>

    <v-layout align-center>
      <v-progress-linear
        v-if="loadTranslate"
        class="my-0"
        height="24"
        color="grey lighten-3" 
        indeterminate />

      <div v-else class="headline">{{ translate }}</div>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    original: {
      type: String,
      default: ''
    },

    translate: {
      type: String,
      default: ''
    }
  },

  computed: {
    loadOriginal() {
      return !this.original
    },

    loadTranslate() {
      return !this.translate
    }
  },
}
</script>

<style scoped>
.br-8 {
  border-radius: 8px;
}

.brt-8 {
  border-radius: 8px 8px 0 0;
}

.brr-8 {
  border-radius: 0 8px 8px 0;
}
</style>
