<template>
    <v-flex xs12 sm12 md12>
      <v-tabs
        centered
        grow
        icons-and-text
        class="custom-layout fill-height"
        color="grey lighten-5">
       
        <v-tabs-slider color="blue" />

        <v-tab href="#link" class="ml-3">
          Ссылка
          <v-icon>link</v-icon>
        </v-tab>

        <v-tab href="#text" class="mr-3">
          Текст
          <v-icon>text_fields</v-icon>
        </v-tab>

        <v-tab-item id="link" class="custom-inner-content">
          <v-text-field
            v-model="link"
            name="link"
            label="Вставьте ссылку"
            color="white"
            class="input-elevation-24 br-8"
            solo />

          <div :style="{'position': 'relative'}">
            <transition name="scale-transition">
              <div class="text-xs-center" v-if="isParse && !isDoneParse">
                <v-progress-circular
                  :size="70"
                  :width="7"
                  color="blue"
                  indeterminate />
              </div>
            </transition>
            <div :class="['content', {'absolute': isParse}]">
              <transition name="scale-transition">
                <v-card v-if="!isParse && !isDoneParse" color="white" class="elevation-24 br-8">
                  <v-card-title primary-title>
                    <div class="subheading">Скопируйте и вставьте ссылку в поле выше, чтобы увидеть карточку статьи.</div>
                  </v-card-title>
                </v-card>
              </transition>
              <transition name="down-slide-transition">
                <v-btn
                  bottom
                  block
                  round
                  large
                  dark
                  v-if="!isParse && !isDoneParse"
                  color="blue"
                  class="elevation-24 custom-btn-align"
                  @click="parse">
                  Готово
                  <v-icon right>done</v-icon>
                </v-btn>
              </transition>
            </div>

            <div :class="['content', {'absolute': isParse}]">
              <transition name="scale-transition">
                <v-card v-if="isDone" color="white" class="elevation-24 br-8">
                  <v-card-title primary-title>
                    <div class="subheading">Готово!<br>Статья успешно добавлена.</div>
                  </v-card-title>
                </v-card>
              </transition>
            </div>
            <div :class="['content', {'absolute': isParse}]">
              <transition name="scale-transition">
                <app-article-card
                  v-if="isDoneParse && newArticle && isDoneParse"
                  :isExpanded="true"
                  :article="newArticle.metadata" />
              </transition>
              
              <transition name="down-slide-transition">
                <v-btn
                  bottom
                  block
                  round
                  large
                  dark
                  v-if="!isParse && isDoneParse && !isDone"
                  color="success"
                  class="elevation-24 custom-btn-align"
                  @click="add">
                  Добавить
                  <v-icon right>add_circle_outline</v-icon>
                </v-btn>
              </transition>
            </div>
          </div>
        </v-tab-item>

        <v-tab-item id="text" class="custom-inner-content">
          <v-text-field
            v-model="titleArticle"
            name="titleArticle"
            label="Заголовок"
            color="blue"
            class="input-elevation-24 br-8"
            solo />
          <v-textarea
            solo
            name="textArticle"
            label="Текст"
            class="textarea-full-height input-elevation-24 br-8"
            :value="textArticle"
          ></v-textarea>
          <v-btn
            bottom
            block
            round
            large
            dark
            color="success"
            class="elevation-24 custom-btn-align">
            Добавить
            <v-icon right>add_circle_outline</v-icon>
          </v-btn>
        </v-tab-item>
       
      </v-tabs>
    </v-flex>
</template>

<script>
import ArticleCard from '~/components/ArticleCard';

export default {
  data: () => ({
    link: 'https://medium.com/s/story/mobile-apps-will-disappear-soon-4b4e54f46eb8',
    newArticle: null,
    titleArticle: '',
    textArticle: '',
    isParse: false,
    isDoneParse: false,
    isDone: false
  }),

  components: {
    'app-article-card': ArticleCard
  },

  methods: {
    async parse() {
      this.isParse = true;
      const article = await this.$store.dispatch('articles/SCRAPE', this.link)
      this.isParse = false;
      this.newArticle = article;
      this.isDoneParse = true;
    },

    async add() {
      this.isParse = true;
      await this.$store.dispatch('articles/ADD', {
        article: this.newArticle,
        meta: this.newArticle.metadata
      })
      this.isParse = false;
      this.isDone = true;
    }
  }
};
</script>

<style scoped>
.custom-layout {
  max-width: calc(100% + 32px);
  flex-basis: calc(100% + 32px);
  margin-left: -16px;
  margin-right: -16px;
}

.custom-inner-content {
  width: 100%;
  height: calc(100% - 124px);
  padding-top: 25px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
}

.content {
  top: 0;
  width: 100%;
}

.content.absolute {
  position: absolute;
}

.custom-btn-align {
  bottom: 0;
  margin-top: 28px;

}

@media (min-width: 440px) {
  .custom-layout {
      min-height: calc(100% - 70px);
  }

  .custom-inner-content {
    padding-left: 32px;
    padding-right: 32px;
  }
}

.custom-layout >>> .v-tabs__items {
  height: calc(100% - 25px);
}

.br-8,
.br-8 >>> .v-input__slot {
  border-radius: 8px;
}

.input-elevation-24 >>> .v-input__slot {
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12) !important;
}

.textarea-full-height {
  height: calc(100% - 135px);
}

.textarea-full-height >>> .v-input__control,
.textarea-full-height >>> .v-input__slot,
.textarea-full-height >>> .v-text-field__slot,
.textarea-full-height >>> textarea {
  height: 100%;
}

/* motion */

.down-slide-transition-leave-active {
  position: relative;
}

.down-slide-transition-enter-active,
.down-slide-transition-leave,
.down-slide-transition-leave-to {
  transition: all .15s ease-in-out;
}

.down-slide-transition-enter,
.down-slide-transition-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* scale */
.scale-transition-leave-active {
  /* position: absolute; */
  top: 0;
  width: 100%;
}

.scale-transition-enter-active {
  opacity: 0;
  transform: scale(0.9);
}

.scale-transition-enter-active,
.scale-transition-leave,
.scale-transition-leave-to {
  transition: all .15s ease-in-out;
}

.scale-transition-enter-to {
  opacity: 1;
  transform: scale(1);
}

.scale-transition-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>


