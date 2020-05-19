/*
 * Подключение модулей
 */

import '../pages/article.css';
import shave from 'shave';
import { Header } from './component/Header.js'
import { Event } from './component/Event.js'

/**
 * Подключение компонентов
 */

// const post = new Post(document.querySelectorAll('.post__description'));
const posts = document.querySelectorAll('.post__description');

const event = new Event();

const header = new Header({
    Event: event,
    link: '.header__link-wrapper',
    authorization: '#header-authorization',
    authorizationText: '.button__text',
    authorizationName: 'Авторизация',
    icon: '.button__img'
});

// Перебирает каждую статью и если текст (description) больше доступной высоты, текст обрезается
const ellipsis = () => {
    /**
     * Доступ до значения свойств классов елемента
     * @param props
     * @returns {string}
     */
    const styleValue = (props) => {
        return getComputedStyle(props.element)
            .getPropertyValue(props.value)
            .match(/[\d.]/g)
            .join('')
    }

    // Перебор всех статей
    posts.forEach((post) => {
        // Условие применяется: если доступная высота текста не равна основной
        if (post.clientHeight !== post.scrollHeight) {
            shave(
                post,
                Math.floor(
                    post.clientHeight / styleValue({element: post, value: 'line-height'})
                ) *
                +styleValue({element: post, value: 'line-height'})
            );
        } else {
            shave(post, post.scrollHeight)
        }
    });
}

/**
 * Подключение событий
 */

event.addEvent(window, 'load', [
    header.activeLink(),
    header.authorizationBtn(),
    ellipsis()
])

event.addEvent(window, 'resize', ellipsis())
