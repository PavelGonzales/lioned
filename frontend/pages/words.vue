<template>
  <v-flex xs12 sm8 md6 lg4>
     <v-layout v-if="loading" align-center justify-center column fill-height>
      <v-progress-circular
        :size="70"
        :width="7"
        color="blue"
        indeterminate />
    </v-layout>

    <template v-else>
      <v-tabs
        v-if="hasWords"
        centered
        icons-and-text
        v-model="activeTab"
        color="transparent"
        grow
        class="fill-width"
        >
        <v-tabs-slider color="blue"></v-tabs-slider>

        <v-tab href="#new">Новые</v-tab>
        <v-tab href="#know">Знаю</v-tab>
        <v-tab href="#not_know">Не знаю</v-tab>

        <v-tab-item v-model="activeTab" id="new" class="scroller">
          <app-words-list 
            :itemHeight="101"
            :hasAction="true"
            :list="newWords"
            :needUpdate="needUpdate.new"
            :callback="getMoreWords(countNewWords)"
          />
        </v-tab-item>

        <v-tab-item v-model="activeTab" id="know" class="scroller">
          <app-words-list
            :itemHeight="53"
            :list="knowWords"
            :needUpdate="needUpdate.know"
            :callback="getMoreWords(countKnowWords)"
          />
        </v-tab-item>

        <v-tab-item v-model="activeTab" id="not_know" class="scroller">
          <app-words-list
            :itemHeight="53"
            :list="notKnowWords"
            :needUpdate="needUpdate.not_know"
            :callback="getMoreWords(countNotKnowWords)"
          />
        </v-tab-item>
      </v-tabs>

      <v-layout v-else align-center justify-center column fill-height>
        <h3 class="display-1 text-xs-center mb-3 font-weight-light">У вас еще нет слов</h3>
        <v-btn class="elevation-24" color="blue" large round dark nuxt to="/add">добавить статью</v-btn>
      </v-layout>
    </template>
  </v-flex>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import WordsList from '~/components/WordsList'

export default {
  middleware: 'auth',
  
  data: () => ({
    activeTab: 'new',
    loading: true
  }),

  head: () => ({
    title: `Мои слова в lioned.online`,
  }),

  async created() {
    await Promise.all([
      this.$store.dispatch('words/GET_USER_WORDS', {limit: 20, offset: 0, type: 'new'}),
      this.$store.dispatch('words/GET_USER_WORDS', {limit: 20, offset: 0, type: 'know'}),
      this.$store.dispatch('words/GET_USER_WORDS', {limit: 20, offset: 0, type: 'not_know'})
    ])
    
    this.loading = false
  },

  computed: {
    ...mapState({
      newWords: ({words}) => words.new.data,
      knowWords: ({words}) => words.know.data,
      notKnowWords: ({words}) => words.not_know.data
    }),

    ...mapGetters('words', {
      countNewWords: 'countNewWords',
      countKnowWords: 'countKnowWords',
      countNotKnowWords: 'countNotKnowWords',
      hasWords: 'hasWords'
    }),

    needUpdate() {
      return {
        new: this.countNewWords.needUpdate && this.activeTab === 'new',
        know: this.countNewWords.needUpdate && this.activeTab === 'know',
        not_know: this.countNewWords.needUpdate && this.activeTab === 'not_know'
      }
    }
  },

  methods: {
    getMoreWords(countGetter) {
      return async () => {
        await this.$store.dispatch('words/GET_USER_WORDS', {
          limit: 20, 
          offset: countGetter.load, 
          type: this.activeTab
        })
      }
      
    }
  },

  components: {
    'app-words-list': WordsList
  }
}
</script>

<style>
.fill-width {
  width: 100%;
}

.scroller {
  height: calc(100vh - 56px - 80px - 72px);
}
</style>


