<template>
<v-container fluid class="pa-0">
  <v-layout 
    row wrap
    justify-center
    class="py-5"
    style="background: linear-gradient(rgb(24, 103, 192), rgb(92, 187, 246))">
    <v-flex xs12 sm8 md8 lg6>
      <v-layout align-center justify-center column fill-height>
        <h1 class="display-4 text-xs-center mb-3 font-weight-light grey--text text--lighten-5 custom-size">lioned.online</h1>
      </v-layout>
    </v-flex>
  </v-layout>
  <v-container>
    <v-layout row wrap class="px-3 pt-5">
      <v-flex
        xs12
        sm7
        md8 
        lg6
        xl4
        offset-sm2
        offset-md2
        offset-lg3
        offset-xl4
        class="pb-5">
        <h3 class="display-2 mb-3 font-weight-light">О приложении</h3>
        <p class="subheading mb-5">Приложение нацелено на помощь в чтении англоязычных статей. Вы можете пользоваться приложением для отложенного чтения или для изучения слов. Можете наблюдать за вашим прогрессом и заранее видеть на сколько хорошо вы можете прочитать новую статью.</p>

        <h3 class="display-2 mb-3 font-weight-light">Цель</h3>
        <p class="subheading mb-5">Дать людям удобный инструмент для одновременного чтения статей и изучения слов. Ускорить поставку переводов ситатей в рунет.</p>

        <h3 class="display-2 mb-3 font-weight-light">Как пользоваться</h3>
        <p class="subheading">Приложение пока разрабатывается, поэтому функционал ограничен.</p>
        <ol class="mb-5">
          <li class="title mb-5">
            Копируем ссылку на статью которую хотите прочитать и вставляем в нужно поле. Далее нажимаем на кнопку добавить. Все, статья успешно добавлена.
            <video controls loop class="video mt-2" src="~/static/video/add.mp4" />
          </li>
          <li class="title mb-5">
            Переходим в статью с этой же страницы, либо с главной.
            <video controls loop class="video mt-2" src="~/static/video/read.mp4" />
          </li>
          <li class="title mb-5">
            Читаем статью и кликаем на все незнакомые слова.
            <video controls loop class="video mt-2" src="~/static/video/translate.mp4" />
          </li>
          <li class="title mb-5">
            На момент добавления статьи вам уже доступны слова из всех ваших статей.
            <video controls loop class="video mt-2" src="~/static/video/words.mp4" />
          </li>
        </ol>

        <h3 class="display-2 font-weight-light">ROADMAP <sup>*</sup></h3>
        <h4 class="title font-weight-light mb-3"><sup>*</sup> что планируется</h4>
        <ol>
          <li>
            Возможность выкладывать свой перевод.
          </li>
          <li>
            Получать ревью своего перевода.
          </li>
          <li>
            Аудирование слов.
          </li>
          <li>
            Поддержка перевода нескольких слов / фраз / предложений.
          </li>
          <li>
            Удобный блок с изучением слов (карточки, аудирование, ассоциации, повторение).
          </li>
          <li>
            Уровни сложности статей.
          </li>
          <li>
            Статистика в профиле.
          </li>
          <li>
            Достижения.
          </li>
        </ol>

      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-btn
        bottom
        round
        large
        dark
        nuxt
        :to="isLoggedIn ? '/' : '/registration'"
        color="blue"
        class="elevation-24">
        {{ isLoggedIn ? 'На главную' : 'Зарегистрироваться'}}
      </v-btn>
    </v-layout>
  </v-container>
</v-container>
</template>

<script>
import {mapState} from 'vuex';

export default {
  layout: 'empty',

  head: () => ({
    title: 'О проекте lioned.online',
    meta: [
      {hid: 'title', name: 'title', content: 'О проекте lioned.online'},
      {hid: 'og:title', name: 'og:title', content: 'О проекте lioned.online'},
      {hid: 'description', name: 'description', content: 'Приложение нацелено на помощь в чтении англоязычных статей. Вы можете пользоваться приложением для отложенного чтения или для изучения слов. Можете наблюдать за вашим прогрессом и заранее видеть на сколько хорошо вы можете прочитать новую статью.'},
      {hid: 'og:description', name: 'og:description', content: 'Приложение нацелено на помощь в чтении англоязычных статей. Вы можете пользоваться приложением для отложенного чтения или для изучения слов. Можете наблюдать за вашим прогрессом и заранее видеть на сколько хорошо вы можете прочитать новую статью.'},
    ]
  }),

  computed: {
    ...mapState({
      isLoggedIn: ({auth}) => auth.isLoggedIn
    }),
  }
}
</script>

<style>
.video,
.img {
  width: 100%;
}

ol {
  padding-right: 24px;
}

@media (max-width: 599px) {
  .custom-size {
    font-size: 17vw !important;
  }
}
</style>