<template>
  <v-layout row wrap align-center class="py-2 border-bottom">
    <v-btn flat icon color="blue" class="my-0" @click="changeLanguage">
      <v-icon>
        translate
      </v-icon>
    </v-btn>
    <v-progress-linear
      v-if="loadWord"
      class="my-0"
      height="24"
      color="grey lighten-3" 
      indeterminate />

    <div v-else class="title font-weight-regular">{{ activeWord }}</div>

    <v-flex v-if="hasAction" xs12 class="d-flex">
      <v-btn
        color="red"
        outline
        @click="onClickButton('not_know')"
      >не знаю</v-btn>
      <v-btn
        color="green"
        outline
        @click="onClickButton('know')"
      >знаю</v-btn>
    </v-flex>
   
  </v-layout>
</template>

<script>
import ga from '~/helpers/ga';
import {mapState} from 'vuex';

export default {
  data: () => ({
    activeLanguage: 'en'
  }),

  props: {
    original: {
      type: String,
      default: ''
    },

    translate: {
      type: String,
      default: ''
    },

    index: {
      type: Number,
      default: 0
    },

    wordId: {
      type: Number,
      default: 0
    },

    hasAction: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapState({
      user: ({user}) => user,
    }),
    loadWord() {
      return !this.activeWord
    },

    activeWord() {
      return this.activeLanguage === 'en' 
        ? this.original 
        : this.translate
    }
  },

  methods: {
    onClickButton(status) {
      const word_id = this.wordId;
      const user_id = this.user.id;

      ga.words[status]({word_id, user_id})

      this.$store.dispatch('words/CHANGE_WORD_STATUS', {
        index: this.index, 
        word_id, 
        status
      })
    },

    changeLanguage() {
      this.activeLanguage === 'en' 
        ? this.activeLanguage = 'ru' 
        : this.activeLanguage = 'en'
    },
  }
}
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid #E0E0E0;
}

.action-button {
  width: 50%;
}

.action-button.add {
  border-radius: 2px 0 0 2px;
}

.action-button.done {
  border-radius: 0 2px 2px 0;
}
</style>
