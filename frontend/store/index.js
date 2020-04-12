import Cookies from 'js-cookie';

export const state = () => ({
  auth: {
    token: '',
    isLoggedIn: false
  },
  user: {
    username: '',
    email: ''
  },
  browser: {
    online: true
  }
});

export const mutations = {
  setUser(state, data) {
    state.user = Object.assign(state.user, data);
  },

  setToken(state, token) {
    state.auth.token = token;
    state.auth.isLoggedIn = true;
  },

  setUnauthUser(state) {
    state.user = {
      username: '',
      email: ''
    };
    state.auth = {
      isLoggedIn: false,
      token: ''
    };
  },

  setNetworkStatus(state, online) {
    state.browser.online = online;
  }
};

export const getters = {
  isOnline: state => state.browser.online
};

export const actions = {
  async REGISTRATION({dispatch}, {username, email, password}) {
    try {
      await this.$axios.post(`${process.env.API_URL}/register`, {username, email: email.toLowerCase(), password});

      dispatch('LOGIN', {email, password});
    } catch (err) {
      const text = err && err.response && err.response.data && err.response.data.message || 'Неизвестная ошибка';

      dispatch('snackbar/SHOW', {
        text,
        color: 'error',
        visible: true
      });
      console.error('REGISTRATION', text);
    }
  },

  async LOGIN({state, dispatch}, {email, password}) {
    try {
      const {data} = await this.$axios.post(
        `${process.env.API_URL}/login`,
        {email: email.toLowerCase(), password}
      );

      const {token} = data;

      this.$axios.onRequest(config => {
        config.headers.common['Authorization'] = token;
      });

      await dispatch('SET_TOKEN', token);
      await dispatch('ME');
      await dispatch('articles/GET_ARTICLES_META');
      dispatch('snackbar/SHOW', {
        text: `Добро пожаловать, ${state.user.username}`,
        color: 'success',
        visible: true
      });

      this.$router.push('/');
    } catch (err) {
      const text = err && err.response && err.response.data && err.response.data.message || 'Неизвестная ошибка';

      dispatch('snackbar/SHOW', {
        text,
        color: 'error',
        visible: true
      });
      console.error('LOGIN', text);
    }
  },

  async LOGOUT({commit, dispatch, state}) {
    try {
      Cookies.remove('elingo_token');

      this.$router.push('/auth');
      dispatch('snackbar/SHOW', {
        text: `До скорых встреч, ${state.user.username}`,
        color: 'success',
        visible: true
      });
      commit('setUnauthUser');
    } catch (err) {
      console.log('Ошибка LOGOUT');
    }
  },

  async ME({dispatch}) {
    try {
      const {data} = await this.$axios.get(`${process.env.API_URL}/me`);

      dispatch('SET_USER', data);
      return data;
    } catch (err) {
      dispatch('LOGOUT');

      throw new Error(err);
    }
  },

  SET_TOKEN({commit}, token) {
    Cookies.set('elingo_token', token, {expires: 62});

    commit('setToken', token);
  },

  SET_USER({commit}, data) {
    commit('setUser', data);
  },

  SET_NETWORK_STATUS({commit, dispatch}, online) {
    commit('setNetworkStatus', online);

    const text = online 
      ? 'Соединение восстановлено' 
      : 'Соединение прервано';

    dispatch('snackbar/SHOW', {
      text,
      color: online ? 'success' : 'error',
      visible: true
    });
  }
};
