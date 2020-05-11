/*
 * Подключение модулей
 */

import '../pages/index.css';
import { Header } from './component/header/header.js'

const header = new Header({
    link: document.querySelectorAll('.header__link-wrapper .link')
});

window.addEventListener('load', () => {
    header.activeLink();
})
