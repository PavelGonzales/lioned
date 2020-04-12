<template>
  <v-bottom-nav
    :active.sync="bottomNav"
    color="white"
    class="elevation-24"
    :value="true"
    fixed
  >
    <v-btn
      nuxt
      to="/"
      flat
      value="main"
      color="blue">
      <span class="hidden-xs-only">Главная</span>
      <v-icon medium>home</v-icon>
    </v-btn>

    <v-btn
      nuxt
      to="/words"
      flat
      value="words"
      color="blue">
      <span class="hidden-xs-only">Слова</span>
      <v-icon medium>book</v-icon>
    </v-btn>

    <v-btn
      nuxt
      to="/add"
      flat
      value="words"
      color="blue">
      <span class="hidden-xs-only">Добавить</span>
      <v-icon medium>add_circle_outline</v-icon>
    </v-btn>

    <v-btn
      nuxt
      to="/training"
      flat
      value="training"
      color="blue">
      <span class="hidden-xs-only">Тренировка</span>
      <v-icon medium>font_download</v-icon>
    </v-btn>

    <v-btn
      nuxt
      to="/profile"
      flat
      value="profile"
      color="blue">
      <span class="hidden-xs-only">Профиль</span>
      <v-icon medium>account_box</v-icon>
    </v-btn>

  </v-bottom-nav>
</template>

<script>
export default {
  name: 'BottomNav',

  data: () => ({
    bottomNav: 'main'
  }),
}
</script>
