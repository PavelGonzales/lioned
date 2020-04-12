export default {
  state: () => ({
    text: '',
    color: 'success',
    visible: false,
    timeout: 6000
  }),

  mutations: {
    set(state, options) {
      state = Object.assign(state, options);
    },

    hide(state) {
      state.visible = false;
    }
  },

  actions: {
    SHOW({commit, state}, options) {
      commit('hide');
      if (!state.visible) {
        commit('set', options);
        setTimeout(() => {
          commit('hide');
        }, state.timeout);
      }
    },

    HIDE({commit, state}) {
      if (state.visible) {
        commit('hide');
      }
    }
  }
};
