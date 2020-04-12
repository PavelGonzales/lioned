<template>
  <v-flex>
    <v-layout v-if="loading" align-center justify-center column fill-height>
      <v-progress-circular
        :size="70"
        :width="7"
        color="blue"
        indeterminate />
    </v-layout>

    <v-layout v-if="!articles.length" align-center justify-center column fill-height>
      <h3 class="display-1 text-xs-center mb-3 font-weight-light">У вас еще нет статей</h3>
      <v-btn class="elevation-24" color="blue" large round dark nuxt to="/add">добавить</v-btn>
    </v-layout>

    <v-layout v-else row wrap>
      <v-flex
        xs12
        sm6
        md4
        lg3
        xl2
        class="px-2"
        v-for="article in articles" 
        :key="article.id">
        <app-article-card
          class="mb-4"
          :article="article"/>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import {mapState} from 'vuex';
import ArticleCard from '~/components/ArticleCard';

export default {
  middleware: 'auth',

  data: () => ({
    loading: true
  }),

  head: () => ({
    title: `Мои статьи в lioned.online`,
  }),

  async created() {
    await this.$store.dispatch('articles/GET_ARTICLES_META')
    this.loading = false
  },

  components: {
    'app-article-card': ArticleCard
  },

  computed: mapState({
    articles: ({articles}) => articles.data
  }),
}
</script>