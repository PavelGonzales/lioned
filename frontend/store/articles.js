export default {
  state: () => ({
    totalCount: 0,
    current: {
      metadata: {}
    },
    data: [],
    sort: 'new',
    needUpdate: true
  }),

  mutations: {
    setData(state, articles) {
      state.data = articles;
    },

    pushData(state, articles) {
      state.data = [...articles, ...state.data];
    },

    setArticle(state, article) {
      state.current = article;
    },

    setNeedUpdate(state, needUpdate) {
      state.needUpdate = needUpdate;
    }
  },

  actions: {
    async SCRAPE({commit}, url) {
      const res = await this.$axios.post(`${process.env.API_URL}/articles/scrape`, {url});
      return res.data;
    },

    PUSH({commit}, articles) {
      commit('pushData', articles);
    },

    async ADD({commit, dispatch, rootState}, {article, metadata}) {
      const copyArticle = {...article};
      copyArticle && delete copyArticle.metadata;

      try {
        const res = await this.$axios.post(`${process.env.API_URL}/articles/add`, {
          user: rootState.user,
          article: copyArticle,
          metadata
        });

        dispatch('snackbar/SHOW', {
          text: 'Статья успешно добавлена',
          color: 'success',
          visible: true
        }, {root: true});

        commit('pushData', [res.data.metadata]);
        return res.data.metadata;
      } catch (err) {
        const text = err && err.response && err.response.data && err.response.data.message || 'Неизвестная ошибка';

        dispatch('snackbar/SHOW', {
          text,
          color: 'success',
          visible: true
        }, {root: true});
      }
    },

    async GET_ARTICLES_META({commit, state, rootState}) {
      if (state.needUpdate) {
        try {
          const articlesMeta = await this.$axios.post(`${process.env.API_URL}/articles/get/meta`, {
            user_id: rootState.user.id
          });

          commit('pushData', [articlesMeta.data][0]);
          commit('setNeedUpdate', false);
        } catch (err) {
          console.log('Ошибка articles/GET_ARTICLES_META');
        }
      }
    },

    async GET_ARTICLE({commit}, {user_id, article_id}) {
      try {
        const article = await this.$axios.get(`${process.env.API_URL}/articles/get/${article_id}`, {
          params: {
            user_id
          }
        });

        commit('setArticle', article.data);
      } catch (err) {
        console.log('Ошибка articles/GET_ARTICLE');
      }
    }
  }
};
