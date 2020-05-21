/*
 * Подключение модулей
 */

// Стили
import '../pages/article.css';

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

// const post = new Post(document.querySelectorAll('.post__description'));
// const posts = document.querySelectorAll('.post__description');

const newsApi = new NewsApi();
const mainApi = new MainApi();
const event = new Event();
const post = new Post({posts, mainApi});
const article = new Article({event, newsApi, mainApi, post, articles, posts});
const form = new Form({event, forms, search, article, mainApi, post});
const popup = new Popup({event, form, popups})
const header = new Header({event, popup, headers, mainApi, post, search});

form.Popup = popup;
form.Header = header;
article.Header = header;
post.Header = header;

// Перебирает каждую статью и если текст (description) больше доступной высоты, текст обрезается
// const ellipsis = () => {
//     /**
//      * Доступ до значения свойств классов елемента
//      * @param props
//      * @returns {string}
//      */
//     const styleValue = (props) => {
//         return getComputedStyle(props.element)
//             .getPropertyValue(props.value)
//             .match(/[\d.]/g)
//             .join('')
//     }
//
//     // Перебор всех статей
//     posts.forEach((post) => {
//         // Условие применяется: если доступная высота текста не равна основной
//         if (post.clientHeight !== post.scrollHeight) {
//             shave(
//                 post,
//                 Math.floor(
//                     post.clientHeight / styleValue({element: post, value: 'line-height'})
//                 ) *
//                 +styleValue({element: post, value: 'line-height'})
//             );
//         } else {
//             shave(post, post.scrollHeight)
//         }
//     });
// }

/**
 * Подключение событий
 */

event.addEvent(window, 'load', [
    header.activeLink(),
    header.signin(),
    article.renderResult(),
    // ellipsis()
])

// event.addEvent(window, 'resize', ellipsis())
