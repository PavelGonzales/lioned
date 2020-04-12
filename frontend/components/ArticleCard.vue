<template>
  <v-card color="white" class="pa-2 elevation-24 br-8 overflow-a-none">
    <nuxt-link class="reset-link" :to="link">

      <v-img
        v-if="article.image && !imageLoadError"
        :src="article.image"
        @error="onImageLoadError"
        height="100px"
        class="br-8"
        cover />

      <v-card-title class="pa-0 pt-3" primary-title>
        <div>
          <h3 class="title mb-2">{{ article.title }}</h3>
        </div>
      </v-card-title>
      <v-card-text class="subheading pa-0" v-show="showDescription">
        {{ article.description }}
      </v-card-text>

      <template v-if="progress">
        <v-progress-linear
          class="br-8 mb-0"
          color="blue"
          height="10"
          :value="progress" />
        <p class="subheading">
          Знаю {{ article.know_words | pluralize(['слово', 'слова', 'слов']) }} из {{ article.uniq }}
        </p>
      </template>
    </nuxt-link>

    <v-card-actions>
      <a class="grey--text" :href="article.url" target="_blank">{{ article.publisher }}</a>
      <v-spacer></v-spacer>
      <v-btn icon @click="showDescription = !showDescription">
        <v-icon>{{ !showDescription ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    showDescription: false,
    imageLoadError: false,
  }),

  created() {
    this.showDescription = this.isExpanded;
  },

  computed: {
    progress() {
      return this.article.know_words / this.article.uniq * 100
    },

    link() {
      return this.article.article_id ? `/article/${this.article.article_id}` : '/';
    }
  },

  props: {
    article: {
      type: Object,
      required: true
    },
    isExpanded: {
      type: Boolean,
      required: false
    }
  },

  methods: {
    onImageLoadError() {
      this.imageLoadError = true
    }
  }
}
</script>

<style scoped>
.br-8 {
  border-radius: 8px;
}

.brr-8 {
  border-radius: 0 8px 8px 0;
}

.reset-link {
  text-decoration: none;
  color: inherit;
}

.overflow-a-none {
  overflow: hidden;
}
</style>
