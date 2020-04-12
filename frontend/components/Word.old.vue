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

    <v-btn flat icon color="blue" class="my-0" @click="speak(activeWord, activeLanguage)">
      <v-icon>
        volume_up
      </v-icon>
    </v-btn>


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
      console.log({index: this.index, word_id: this.wordId, status})
      this.$store.dispatch('words/CHANGE_WORD_STATUS', {
        index: this.index, 
        word_id: this.wordId, 
        status})
    },

    changeLanguage() {
      this.activeLanguage === 'en' 
        ? this.activeLanguage = 'ru' 
        : this.activeLanguage = 'en'
    },

    speak(text, lang = 'ru') {
      let voice = this.activeLanguage === 'en' 
        ? 'US English Female'
        : 'Russian Female'

      // responsiveVoice.speak(text, voice, {pitch: 1, rate: 1});
    }
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
