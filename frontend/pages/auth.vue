<template>
  <v-layout align-center justify-center row wrap fill-height>
    <v-form ref="form" v-model="valid" lazy-validation>
      <h1 class="display-3 font-weight-bold grey--text text--darken-3">Авторизация</h1>

      <v-text-field
        class="input-elevation-24 br-8"
        solo
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        placeholder="Введите e-mail"
        required />

      <v-text-field
        class="input-elevation-24 br-8"
        color="white"
        solo
        v-model="password"
        :append-icon="showPassword ? 'visibility_off' : 'visibility'"
        :rules="[rules.required, rules.min]"
        :type="showPassword ? 'text' : 'password'"
        name="input-10-1"
        hint="Минимум 8 символов"
        counter
        @click:append="showPassword = !showPassword"
        label="Пароль"
        placeholder="Введите пароль"
        required />

      <v-checkbox
        v-model="checkbox"
        label="Запомнить" />

      <v-btn
        bottom
        block
        round
        large
        dark
        color="green"
        :disabled="!valid"
        class="elevation-24"
        @click="submit">
        войти
      </v-btn>

      <nuxt-link to="/registration">Еще нет аккаунта?</nuxt-link>
    </v-form>
  </v-layout>
</template>

<script>
import ga from '~/helpers/ga';

const isDev = process.env.NODE_ENV === 'development'
const formModel = {
  email: isDev ? 'develop.gonzales@gmail.com' : '',
  password: isDev ? 'qwerty1234' : '',
}

export default {
  data: () => ({
    ...formModel,
    showPassword: false,
    showConfirmPassword: false,
    rules: {
      required: value => !!value || 'Пароль обязателен для заполнения',
      min: v => v.length >= 8 || 'Минимум 8 символов'
    },
    valid: true,
    emailRules: [
      v => !!v || 'E-mail обязателен для заполнения',
      v => /.+@.+/.test(v) || 'E-mail не валиден'
    ],
    checkbox: false
  }),

  head: () => ({
    title: `Войти в lioned.online`,
    meta: [
      {hid: 'title', name: 'title', content: 'Войти в lioned.online'},
      {hid: 'og:title', name: 'og:title', content: 'Войти в lioned.online'},
      {hid: 'description', name: 'description', content: 'Читай! Переводи! Учись!'},
      {hid: 'og:description', name: 'og:description', content: 'Читай! Переводи! Учись!'},
    ]
  }),

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        const {email, password} = this;
        
        ga.user.login({email});
        await this.$store.dispatch('LOGIN', {email, password});
      }
    },
  }
}
</script>

<style scoped>
.br-8,
.br-8 >>> .v-input__slot {
  border-radius: 8px !important;
}

.input-elevation-24 >>> .v-input__slot {
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12) !important;
}
</style>
