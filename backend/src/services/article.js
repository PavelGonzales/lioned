import Model from './../models';

const Article = Model.Article;
const Meta = Model.ArticleMeta;
const UserArticles = Model.UserArticles;

const addArticle = async ({user, article, metadata}) => {
  const res = await Meta.findOne({
    where: {
      url: metadata.url
    },
    raw: true
  });


  if (!res) {
    try {
      const $metadata = await Meta.create(metadata);
      const $article = await Article.create({...article, meta_id: $metadata.dataValues.id});
      Meta.update({
        article_id: $article.dataValues.id
      }, {
        where: {
          id: $metadata.dataValues.id
        }
      });
      await UserArticles.create({user_id: user.id, article_id: $article.dataValues.id});

      return {
        metadata: {
          ...$metadata.dataValues,
          article_id: $article.dataValues.id
        },
        article: $article
      };

    } catch (err) {
      throw new Error('Ошибка создания статьи');
    }
  } else {
    try {
      await UserArticles.create({user_id: user.id, article_id: res.id});
      return {
        metadata: res,
      };
    } catch (err) {
      throw new Error('Статья уже добавлена');
    }
  }
};

const getArticlesMeta = async ({user_id}) => {
  try {
    const res = await UserArticles.findAll({
      where: {
        user_id
      },
      raw: true
    });
    const articleIds = res.map(item => item.article_id);

    try {
      const metaArticles = await Meta.findAll({
        where: {
          id: articleIds
        },
        order: [
          ['createdAt', 'DESC']
        ],
        raw: true
      });
      return metaArticles.map((item, index) => {
        item.know_words = res[index].know_words;

        return item;
      });
    } catch (err) {
      throw new Error('Ошибка поиска мета данных статей');
    }
  } catch (err) {
    throw new Error('Ошибка поиска статей');
  }
};

const getArticle = async ({user_id, article_id}) => {
  try {
    let userArticles = undefined;
    const article = await Article.findOne({
      where: {
        id: article_id
      },
      raw: true
    });

    if (user_id) {
      userArticles = await UserArticles.findAll({
        where: {
          user_id,
          article_id
        },
        raw: true
      });
    }

    const metadata = await Meta.findOne({
      where: {
        id: article.meta_id
      },
      raw: true
    });

    return {
      ...article,
      metadata: {
        ...metadata,
        know_words: userArticles ? userArticles[0].know_words : null
      },
    };
  } catch (err) {
    throw new Error('Ошибка получения статьи');
  }
};

export default {
  addArticle,
  getArticle,
  getArticlesMeta
};