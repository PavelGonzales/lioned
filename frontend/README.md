# lioned.online

## About

> Online service for deferred reading of articles and learning words from articles

## Run buld in prod

```shell
pm2 start npm --name "frontend" -- start
```

## ROADMAP

- **Перевести все на Quasar framework**
- настроить ES Linter как на бэке
- логгировать все ошибки в каком-нибудь сервисе
- Переверстать адаптивно карточки статей
- Переверстать сетку статей на главной под все разрешения
- Подумать как оптимизировать Google Fonts что бы они не грузились так долго
- Подключить TextToSpeech либу для слов
- Продумать модель данных для юзера
  - name
  - avatar
  - level
  - know_words
  - all_my_words
  - articles_count
  - achievements
- Доделать блок с тренировкой