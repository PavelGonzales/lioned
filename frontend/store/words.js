// import {diff} from '~/helpers/array'

export default {
  state: () => ({
    new: {
      total: 0,
      data: []
    },
    know: {
      total: 0,
      data: []
    },
    not_know: {
      total: 0,
      data: []
    },
    sort: 'new',
    needUpdate: true
  }),

  mutations: {
    setWords(state, {key, words}) {
      state[key] = words;
    },

    concatWords(state, {key, words}) {
      state[key].total = words.total;
      state[key].data = [...state[key].data, ...words.data];
    },

    changeWordStatus(state, {index, status, old_status}) {
      const word = {...state[old_status].data[index]};
      state[status].data.push(word);
      state[old_status].data.splice(index, 1);
    }
  },

  getters: {
    countNewWords: state => {
      const total = state.new.total;
      const load = state.new.data.length;
      return {
        total,
        load,
        needUpdate: total > load
      };
    },

    countKnowWords: state => {
      const total = state.know.total;
      const load = state.know.data.length;
      return {
        total,
        load,
        needUpdate: total > load
      };
    },

    countNotKnowWords: state => {
      const total = state.not_know.total;
      const load = state.not_know.data.length;
      return {
        total,
        load,
        needUpdate: total > load
      };
    },

    hasWords: state => {
      return state.new.total || state.know.total || state.not_know.total;
    }
  },

  actions: {
    async GET({commit}, text) {
      try {
        const {data} = await this.$axios.get(`${process.env.API_URL}/word/get/${text}`);

        if (!data.translate) {
          return {
            original: text,
            translate: 'Не удалось получить перевод'
          };
        }

        return data;
      } catch (err) {
        console.error('GET', err.response.data.message);
      }
    },

    async GET_USER_WORDS({commit, rootState}, {limit, offset, type}) {
      try {
        const res = await this.$axios.post(`${process.env.API_URL}/user/words`, {
          user_id: rootState.user.id,
          limit,
          offset,
          type
        });

        commit('concatWords', {key: type, words: res.data.data});
        return res.data.data;
      } catch (err) {
        console.error('GET_USER_WORDS', err.response.data.message);
      }
    },

    async CHANGE_WORD_STATUS({commit, rootState}, {index, word_id, status}) {
      try {
        await this.$axios.put(`${process.env.API_URL}/words/changestatus`, {
          user_id: rootState.user.id,
          word_id,
          status
        });

        commit('changeWordStatus', {index, status, old_status: 'new'});
      } catch (err) {
        console.error('CHANGE_WORD_STATUS', err.response.data.message);
      }
    }
  }
};
