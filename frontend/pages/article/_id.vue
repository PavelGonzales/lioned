<template>
  <v-flex xs12 sm8 md8 lg6 class="pb-5">
    <div class="display-1 font-weight-medium mb-4">{{ metadata.title }}</div>
    <template v-if="isLoggedIn">
      <v-progress-linear
        class="br-8 mb-0"
        color="blue"
        height="10"
        :value="progress"
      />
      <p class="subheading">
        Знаю {{ metadata.know_words || 0 | pluralize(['слово', 'слова', 'слов']) }} из {{ metadata.uniq || 0 }}
      </p>
    </template>
    
    <div :class="['article-wrap', {'unauth': !isLoggedIn}]">
      <div ref="article" class="article-content" v-html="processedHTML" @click="selectWord"/>
    </div>

    <v-layout v-if="!isLoggedIn" justify-center>
      <v-btn
        round
        large
        dark
        nuxt
        to="/registration"
        color="blue"
        class="mt-5 elevation-24">
        Зарегистрироваться
      </v-btn>
    </v-layout>

    <v-bottom-sheet v-model="sheet" lazy>
      <v-layout justify-center>
        <v-flex xs12 sm8 md8 lg6>
          <app-translate-panel :original="selectedWord" :translate="translatedWord"/>
        </v-flex>
      </v-layout>
    </v-bottom-sheet>
  </v-flex>
</template>

<script>
import { mapState } from 'vuex';
import TranslatePanel from '~/components/TranslatePanel';

export default {
  data: () => ({
    sheet: false,
    selectedWord: '',
    translatedWord: '',
    processedHTML: '',
    selectedNodes: []
  }),

  async fetch({store, params}) {
     await store.dispatch('articles/GET_ARTICLE', {
      user_id: store.state.user.id,
      article_id: params.id
    });
  },

  async created() {
    this.processedHTML = this.wrapWords(this.article.content);
  },

  head() {
    const metadata = this.metadata;
    return {
      title: `Читать ${metadata.title} на lioned.online`,
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: `Читать ${metadata.title} на lioned.online`
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `Читать ${metadata.title} на lioned.online`
        },
        {
          hid: 'description',
          name: 'description',
          content: metadata.description
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: metadata.description
        },
        { 
          hid: 'og:image', 
          name: 'og:image', 
          content: metadata.image 
        }
      ]
    };
  },

  components: {
    "app-translate-panel": TranslatePanel
  },

  computed: {
    ...mapState({
      isLoggedIn: ({auth}) => auth.isLoggedIn,
      user: ({ user }) => user,
      article: ({ articles: { current } }) => current,
      metadata: ({
        articles: {
          current: { metadata }
        }
      }) => metadata
    }),
    progress() {
      return (
        ((this.metadata.know_words || 0) / (this.metadata.uniq || 0)) * 100
      );
    }
  },

  watch: {
    sheet(val) {
      if (!val) {
        this.selectedNodes.forEach(node => {
          node.classList.remove('selected');
        });
        this.selectedNodes = [];
      }
    }
  },

  methods: {
    wrapWords(str, tmpl) {
      const selfStr = str;

      return selfStr
        .replace(/&nbsp;/g, ' ')
        .replace(
          /\w+(?!([^<]+)?>)/g,
          tmpl || '<span class="article-word" data-word="$&">$&</span>'
        );
    },

    getWord(word) {
      return this.$store.dispatch('words/GET', word);
    },

    async selectWord(e) {
      if (!e.target.dataset.word) {
        return;
      }

      if (
        e.target.nodeName === 'A' ||
        e.target.parentNode.nodeName === 'A' ||
        e.target.parentNode.parentNode.nodeName === 'A'
      ) {
        e.preventDefault();
      }

      this.selectedNodes.push(e.target);
      e.target.classList.add('selected');
      this.translatedWord = '';
      this.sheet = true;
      this.selectedWord = e.target.innerText;

      const res = await this.getWord(this.selectedWord);

      this.translatedWord = res.translate;
    }
  }
};
</script>

<style>
.article-wrap.unauth {
  height: 700px;
  overflow: hidden;
  position: relative;
}

.article-wrap.unauth::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: linear-gradient(rgba(255, 255, 255, 0), #fafafa);

}

.article-content img {
  max-width: 100%;
}

.article-content pre {
  white-space: normal;
}

.article-content {
  font-size: 18px;
  word-break: break-word;
}

.article-word {
  cursor: pointer;
  border-radius: 3px;
}

.article-word.selected,
.article-word:hover {
  background: rgba(76, 175, 80, 0.3);
}

.br-8 {
  border-radius: 8px;
}

.v-dialog {
  box-shadow: none !important;
}

.v-overlay--active:before {
  opacity: 0.1;
}
</style>

