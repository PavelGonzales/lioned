import read from 'node-readability';
import metascraper from 'metascraper';
import metascraperAuthor from 'metascraper-author';
import metascraperDate from 'metascraper-date';
import metascraperDescription from 'metascraper-description';
import metascraperImage from 'metascraper-image';
import metascraperLogo from 'metascraper-logo';
import metascraperClearbitLogo from 'metascraper-clearbit-logo';
import metascraperPublisher from 'metascraper-publisher';
import metascraperTitle from 'metascraper-title';
import metascraperUrl from 'metascraper-url';
import articleService from './../services/article';
import wordService from './../services/word';
import {countWords} from './../helpers/text';

const metascrape = metascraper([
  metascraperAuthor(),
  metascraperDate(),
  metascraperDescription(),
  metascraperImage(),
  metascraperLogo(),
  metascraperClearbitLogo(),
  metascraperPublisher(),
  metascraperTitle(),
  metascraperUrl()
]);

const scrape = (req, res) => {
  const url = req.body.url;

  read(url, async (err, article) => {
    if (err) {
      res.json(err);
    }
    const {content, title, textBody, html} = article;
    const metadata = await metascrape({html, url});
    const words = countWords(content);
    
    res.json({
      content,
      title,
      text: textBody,
      metadata: {
        ...metadata,
        ...words
      }
    });

    article.close();
  });
};

const add = async (req, res) => {
  const {user, article, metadata} = req.body;
  const words = metadata && metadata.uniq_words || [];

  try {
    const response = await articleService.addArticle({
      user,
      article, 
      metadata
    });
    const user_id = user.id;
    const article_id = response.article.dataValues.id;
    const wordsRes = await wordService.addWords({words});
    
    // TODO Заменить words -> word_ids
    wordService.addWordsByArticle({article_id, words});
    wordService.setUserKnownWords({user_id, article_id, words});

    if (wordsRes.length) {
      const word_ids = wordsRes.map(item => item.dataValues.id);

      wordService.addWordsByUser({user_id, word_ids});
    }

    res.json(response);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

const getMeta = async (req, res) => {
  const user_id = req.body.user_id;

  try {
    const response = await articleService.getArticlesMeta({user_id});
    
    res.json(response);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

const get = async (req, res) => {
  const user_id = req.query.user_id;
  const article_id = req.params.id;

  try {
    const response = await articleService.getArticle({user_id, article_id});

    res.json(response);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

export default {
  add,
  get,
  getMeta,
  scrape,
};