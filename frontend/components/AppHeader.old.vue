<template>
  <v-toolbar fixed class="elevation-0 custom-dorder" color="#fafafa">
    <v-btn v-if="visibleBack" nuxt to="/" flat class="ml-0 mr-0 pl-0" color="primary">
      <v-icon>keyboard_arrow_left</v-icon>
      назад
    </v-btn>
    <h1 class="font-weight-regular" v-else>{{ routeName }}</h1>

    <v-spacer></v-spacer>

    <v-btn
      dark
      icon>
      <v-badge overlap left color="red lighten-1">
        <span slot="badge">3</span>
        <v-icon medium dark color="blue">notification_important</v-icon>
      </v-badge>
    </v-btn>

    <v-menu bottom left>
      <v-btn
        slot="activator"
        dark
        icon>
        <v-icon medium dark color="blue">more_vert</v-icon>
      </v-btn>

      <v-list>
        <v-list-tile @click="logout">
          <v-list-tile-title class="font-weight-regular body-2">Выйти
            <v-icon right small>logout</v-icon>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

  </v-toolbar>
</template>

<script>
export default {
  name: 'AppHeader',

  data: () => ({
    routeName: ''
  }),

  created() {
    this.setRouteName(this.$route.name)
  },

  watch: {
    $route(to, from) {
      this.setRouteName(to.name)
    }
  },

  computed: {
    visibleBack() {
      return this.$route.name === 'article-id'
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('LOGOUT')
      this.$router.push('/auth');
    },

    setRouteName(name) {
      if (name === 'index') {
        this.routeName = 'Главная'
      }
      if (name === 'words') {
        this.routeName = 'Слова'
      }
      if (name === 'add') {
        this.routeName = 'Добавить'
      }
      if (name === 'training') {
        this.routeName = 'Тренироваться'
      }
      if (name === 'profile') {
        this.routeName = 'Профиль'
      }
    }
  }
}
</script>

<style scoped>
.custom-dorder::after {
  content: '';
  display: block;
  position: absolute;
  top: 100%;
  width: 50%;
  height: 3px;
  background-color: #2196f3;
}
</style>

