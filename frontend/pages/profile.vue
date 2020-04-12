<template>
  <v-flex xs12 sm6 md6>
    <div class="custom-user grey lighten-5">
      <v-avatar size="150" color="blue">
        <img
          v-if="user.avatar"
          :src="user.avatar"
          :alt="user.username" />
        <span v-else class="white--text display-3">{{ initials }}</span>
      </v-avatar>
      <div class="user-info ml-2">
        <h2 class="font-weight-regular">{{ user.username }}</h2>
        <div class="level">Уровень {{ user.level || 0 }}</div>
        <div class="level">Знаю слов {{ user.know_words || 0 }}</div>
        <div class="level">Всего слов {{ user.all_my_words || 0 }}</div>
        <div class="level">Моих статей {{ user.articles_count || 0 }}</div>
      </div>
    </div>

    <v-layout row justify-center class="pt-4">
      <h3 class="headline font-weight-bold blue--text">Достижения</h3>
    </v-layout>

    <v-layout row wrap justify-center class="pt-3 badges-wrap">
      <img class="badge not-active elevation-24" src="~assets/svg/badges/achievement_leade.svg" />
      <img class="badge not-active elevation-24" src="~assets/svg/badges/award_medal.svg" />
      <img class="badge not-active elevation-24" src="~assets/svg/badges/apple_checkmark.svg" />
      <img class="badge not-active elevation-24" src="~assets/svg/badges/done_finish.svg" />
      <img class="badge not-active elevation-24" src="~assets/svg/badges/flag_leader.svg" />
      <img class="badge not-active elevation-24" src="~assets/svg/badges/awar_check.svg" />
      <img class="badge not-active elevation-24" src="~assets/svg/badges/fast_result.svg" />
      <img class="badge not-active elevation-24" src="~assets/svg/badges/activity_pr.svg" />
      <img class="badge not-active elevation-24" src="~assets/svg/badges/achievement_award.svg" />
      <img class="badge not-active elevation-24" src="~assets/svg/badges/award_cup_leader.svg" />
      <img class="badge not-active elevation-24" src="~assets/svg/badges/award_badge_compl.svg" />
      <img class="badge not-active elevation-24" src="~assets/svg/badges/bottle_drin.svg" />
    </v-layout>

  </v-flex>
</template>

<script>
import {mapState} from 'vuex';

export default {
  middleware: 'auth',

  head: () => ({
    title: `Мои профиль в lioned.online`,
  }),
  
  computed: {
    ...mapState({
      user: ({user}) => user,
    }),

    initials() {
      return this.user.username
        .split(' ')
        .reduce((res, item, index) => index > 1 ? res : res += item[0], '');
    }
  }
  
}
</script>

<style>
.custom-user {
  width: calc(100% + 32px);
  padding: 80px 16px 16px;
  margin: -80px -16px 0;
  display: flex;
  position: relative;
}

.custom-user::before {
  content: '';
  width: 100vw;
  height: 246px;
  position: fixed;
  top: 0;
  left: 0;
  background: #fafafa;
  box-shadow: 0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12) !important
}

@media (max-width: 599px) {
  .custom-user::before {
    left: 0;
  }
}

.badges-wrap {
  width: calc(100% + 10px)
}

.badge {
  width: 75px;
  height: 75px;
  margin-bottom: 10px;
  margin-right: 10px;
  border-radius: 50%;
  background: #2196f3;
}

.badge.not-active {
  filter: grayscale(100%);
}

.user-info {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
</style>
