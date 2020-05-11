/*
 * Подключение модулей
 */

import '../pages/article.css';
import shave from 'shave';
import { Header } from './component/header/Header.js'
import { Event } from './component/event/Event.js'
// import { Post } from './component/post/post.js'

/**
 * Подключение компонентов
 */

// const post = new Post(document.querySelectorAll('.post__description'));
const posts = document.querySelectorAll('.post__description');

const header = new Header({
    link: '.header__link-wrapper'
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

const event = new Event();

event.addEvent(window, 'load', [
    header.activeLink(),
    ellipsis()
])

event.addEvent(window, 'resize', ellipsis())
