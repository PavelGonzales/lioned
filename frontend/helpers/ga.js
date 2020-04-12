export default {
  article: {
    add({user_id = '', article_id = ''}) {
      ga && ga('send', {
        hitType: 'event',
        eventCategory: 'Article',
        eventAction: 'add',
        eventLabel: `user_id=${user_id}:article_id=${article_id}`,
      });
    }
  },
  words: {
    know({user_id = '', word_id = ''} = {}) {
      ga && ga('send', {
        hitType: 'event',
        eventCategory: 'Words',
        eventAction: 'know',
        eventLabel: `user_id=${user_id}:word_id=${word_id}`,
      });
    },
    not_know({user_id = '', word_id = ''} = {}) {
      ga && ga('send', {
        hitType: 'event',
        eventCategory: 'Words',
        eventAction: 'not_know',
        eventLabel: `user_id=${user_id}:word_id=${word_id}`,
      });
    }
  },
  user: {
    create({email = '', username = ''}) {
      ga && ga('send', {
        hitType: 'event',
        eventCategory: 'User',
        eventAction: 'create',
        eventLabel: `email=${email}:username=${username}`,
      });
    },
    login({email = ''}) {
      ga && ga('send', {
        hitType: 'event',
        eventCategory: 'User',
        eventAction: 'login',
        eventLabel: `email=${email}`,
      });
    },
    logout({email = ''}) {
      ga && ga('send', {
        hitType: 'event',
        eventCategory: 'User',
        eventAction: 'logout',
        eventLabel: `email=${email}`,
      });
    }
  }
};
