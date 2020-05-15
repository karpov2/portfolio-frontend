export class Popup {
    constructor(props) {
        this.props = props;
        // Класс Event
        this.Event = this.props.Event;
        // css класс открывающий popup
        this.elementOpen = this.props.open;

        // Биндим метод закрытия popup окна
        this.callbackClose = this.close.bind(this);

        this.test = false;
    }

    // Открыть popup
    open() {
        // Подключение к элементу popup
        this.elementPopup = document.querySelector(this.props.popup);
        // Подключение к элементу формы popup окна
        this.elementForm = this.elementPopup.querySelector(this.props.form);
        // Подключение к элементу "крестика" для закрытия popup окна
        this.elementPopupClose = this.elementForm.querySelector(this.props.close);

        // Добавляем css класс открывающий popup
        this.elementPopup.classList.add(this.elementOpen);

        // Добавляем слушатели для закрытия popup окна
        this.Event.addEvent(this.elementPopup, 'click', this.callbackClose);
        this.Event.addEvent(this.elementPopupClose, 'click', this.callbackClose);
        this.Event.addEvent(document, 'keydown', this.callbackClose)
    }

    // Закрыть popup
    close(event) {
        event.stopPropagation();

        const remove = () => {
            // Удаляем css класс открывающий popup
            this.elementPopup.classList.remove(this.elementOpen);

            // Удаляем слушатели для закрытия popup окна
            this.Event.removeEvent(this.elementPopup, 'click', this.callbackClose)
            this.Event.removeEvent(this.elementPopupClose, 'click', this.callbackClose)
            this.Event.removeEvent(document, 'keydown', this.callbackClose);
        }

        // Если клик по элементу === родителю события
        if (event.target === event.currentTarget) return remove()

        // Если тип события нажатия клавиши
        if (event.type === 'keydown') {
            // и клавиша 'Escape'
            if (event['code' || 'key'] === 'Escape') return remove()
        }

        this.test = !this.test;
    }

    // Регистрация
    signup() {

    }

    // Шаблон для регистрации
    viewSignup() {
        return `
            <div class="popup popup_hidden">
                <form action="/" method="post" class="popup__form">
                    <svg viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg" class="popup__close">
                        <path d="M3 0L0 3L8.5 11.5L0 20L3 23L11.5 14.5L20 23L23 20L14.5 11.5L23 3L20 0L11.5 8.5L3 0Z"/>
                    </svg>

                    <h4 class="popup__title">Регистрация</h4>

                    <label for="email" class="popup__label">Email
                        <input type="email" class="popup__input" name="email" id="email" placeholder="Введите свою почту">
                        <span class="popup__error">Неправильный формат email</span>
                    </label>
                    <label for="password" class="popup__label">Пароль
                        <input type="password" class="popup__input" name="password" id="password" placeholder="Введите пароль">
                        <span class="popup__error">Неправильный формат пароля</span>
                    </label>
                    <label for="name" class="popup__label">Имя
                        <input type="text" class="popup__input" name="name" id="name" placeholder="Введите своё имя">
                        <span class="popup__error">&nbsp;</span>
                    </label>

                    <span class="popup__error popup__error_geometry">Такой пользователь уже есть</span>
                    <button class="button button_disabled popup__button" type="submit">Зарегистрироваться</button>

                    <span class="popup__text">или <a href="#" class="link popup__link">Войти</a></span>
                </form>
            </div>
        `.trim()
    }

    // Шаблон для авторизации
    viewSignin() {
        return `
            <div class="popup popup_hidden">
                <form action="/" method="post" class="popup__form">
                    <svg viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg" class="popup__close">
                        <path d="M3 0L0 3L8.5 11.5L0 20L3 23L11.5 14.5L20 23L23 20L14.5 11.5L23 3L20 0L11.5 8.5L3 0Z"/>
                    </svg>

                    <h4 class="popup__title">Вход</h4>

                    <label for="email" class="popup__label">Email
                        <input type="email" class="popup__input" name="email" id="email" placeholder="Введите свою почту">
                        <span class="popup__error">Неправильный формат email</span>
                    </label>
                    <label for="password" class="popup__label">Пароль
                        <input type="password" class="popup__input" name="password" id="password" placeholder="Введите пароль">
                        <span class="popup__error">Неправильный формат пароля</span>
                    </label>

                    <span class="popup__error popup__error_geometry">Такой пользователь уже есть</span>
                    <button class="button button_disabled popup__button" type="submit">Войти</button>

                    <span class="popup__text">или <a href="#" class="link popup__link">Зарегистрироваться</a></span>
                </form>
            </div>
        `.trim()
    }
}
