/*
 * Подключение модулей
 */

import '../pages/index.css';
import { Header } from './component/header/Header.js'
import { Event } from './component/event/Event.js'
import { Popup } from './component/popup/Popup.js'

/**
 * Подключение компонентов
 */
const event = new Event();
const popup = new Popup({
    Event: event,
    popup: '.popup',
    open: 'popup_active',
    form: '.popup__form',
    close: '.popup__close',
})
const header = new Header({
    Event: event,
    Popup: popup,
    link: '.header__link-wrapper',
    authorization: '#signup'
});

/**
 * Подключение событий
 */

event.addEvent(window, 'load', [
    header.activeLink(),
    header.signup()
])
