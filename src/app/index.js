/*
 * Подключение модулей
 */

// Стили
import '../pages/index.css';

// Компоненты
import { NewsApi } from './api/NewsApi.js';
import { MainApi } from './api/MainApi.js';
import { Header } from './component/Header.js';
import { Event } from './component/Event.js';
import { Popup } from './component/Popup.js';
import { Form } from './component/Form.js';
import { Article } from './component/Article.js';
import { Post } from './component/Post.js';

// Константы
import { search, forms, popups, headers, articles, posts } from './constants/dom.js';

/**
 * Подключение компонентов
 */

const newsApi = new NewsApi();
const mainApi = new MainApi();
const event = new Event();
const post = new Post({posts, mainApi});
const article = new Article({event, newsApi, mainApi, post, articles, posts});
const form = new Form({event, forms, search, article, mainApi, post});
const popup = new Popup({event, form, popups})
const header = new Header({event, popup, headers, mainApi, post});

form.Popup = popup;
form.Header = header;
article.Header = header;
post.Header = header;

/**
 * Подключение событий
 */

event.addEvent(window, 'load', [
    header.activeLink(),
    header.signin(),
    form.search()
])
