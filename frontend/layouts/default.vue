<template>
  <v-app>
    <app-background />
    <app-header v-if="isLoggedIn" />
    
    <v-container class="custom-padding castom-layout relative">
      <v-layout row wrap justify-center fill-height>
        <nuxt />
      </v-layout>
    </v-container>
    
    <app-bottom-nav v-if="isLoggedIn" />

    <v-snackbar
      v-model="snackbar.visible"
      :color="snackbar.color"
      :top="true"
      :multi-line="true"
      :timeout="0"
      :vertical="false"
    >
      {{ snackbar.text }}
      <v-btn
        dark
        flat
        @click="hideSnackbar"
      >
        Закрыть
      </v-btn>
    </v-snackbar>
    
  </v-app>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import AppHeader from './../components/AppHeader';
import BottomNav from './../components/BottomNav';
import Background from './../components/Background';

export default {
  components: {
    'app-header': AppHeader,
    'app-bottom-nav': BottomNav,
    'app-background': Background
  },

  computed: {
    ...mapState({
      snackbar: ({snackbar}) => snackbar,
      isLoggedIn: ({auth}) => auth.isLoggedIn
    }),
  },

  methods: {
    ...mapActions('snackbar', {
      hideSnackbar: 'HIDE'
    }),

    handleNetworkStatus(e) {
      this.$store.dispatch('SET_NETWORK_STATUS', e.type === 'offline' ? false : true)
    }
  },

  created() {
    if (process.browser) {
      this.$store.commit('setNetworkStatus', window.navigator.onLine)
      window.addEventListener('online', this.handleNetworkStatus);
      window.addEventListener('offline', this.handleNetworkStatus);
    }
  },

  beforeDestroy() {
    window.removeEventListener('online', this.handleNetworkStatus);
    window.removeEventListener('offline', this.handleNetworkStatus);
  }
}
</script>

<style scoped>
.custom-padding {
  padding-top: 80px;
  padding-bottom: 56px;
}

.castom-layout {
  max-width: 1920px;
}

.relative {
  position: relative;
}
</style>