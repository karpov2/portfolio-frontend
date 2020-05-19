export class Form {
    constructor(props) {
        this.props = props;
        // Класс Event
        this.Event = props.event;
        // Класс Article
        this.Article = props.article;
        // Класс Api
        this.MainApi = props.mainApi;
        // Состояние формы (регистрация или авторизация)
        this.form = 'signin';
    }

    search() {
        const elementSearch = document.querySelector(this.props.search.form);
        const elementSearchInput = elementSearch.querySelector(this.props.search.input);
        const elementSearchButton = elementSearch.querySelector(this.props.search.button);

        const searchNews = (event) => {
            event.preventDefault();
            const { search } = elementSearch.elements;
            console.log(search.value);
            this.Article.renderResult(search.value);
        };

        this.Event.addEvent(elementSearchButton, 'click', searchNews)
    }

    send() {
        this.elementForm = document.querySelector(this.props.forms.form);
        this.elementButton = this.elementForm.querySelector(this.props.forms.button);
        this.elementLink = this.elementForm.querySelector(this.props.forms.link);
        this.elementButton.classList.remove('button_disabled');

        const sendForm = (event) => {
            event.preventDefault();

            if (this.form === 'signup') {
                this.MainApi.signup(this.elementForm.elements)
                    .then(res => {
                        console.log(res);
                        if (res._id) {
                            console.log('res._id: ', res._id);
                            this.Popup.render('success', this.Popup.elementWrapper);
                        } else if (res.error) {
                            console.error('res.error: ', res.error);
                        }
                    })
                    .catch(err => console.error(err));
            } else {
                this.MainApi.signin(this.elementForm.elements)
                    .then(res => {
                        console.log(res);
                        if (res.message === 'Вход успешно выполнен') {
                            console.log('res.user: ', res.user);
                            this.Popup.close(event, true);
                            this.Header.viewExitButton(res.user.name);
                        } else if (res.error) {
                            console.error('res.error: ', res.error);
                        }
                    })
                    .catch(err => console.error(err));
            }

            // this.Event.removeEvent(this.elementButton, 'click', sendForm);
        }

        const switchForm = (event) => {
            if (event.target.textContent === 'Зарегистрироваться') {
                this.form = 'signup';
                this.Popup.render(this.form, this.Popup.elementWrapper);
            } else {
                this.form = 'signin';
                this.Popup.render(this.form, this.Popup.elementWrapper);
            }
        }

        this.Event.addEvent(this.elementButton, 'click', sendForm);
        this.Event.addEvent(this.elementLink, 'click', switchForm);
    }

    // Шаблон для регистрации
    signup() {
        return `
            <form action="/" method="post" class="form">

                <h4 class="popup__title">Регистрация</h4>

                <label for="email" class="form__label">Email
                    <input type="email" class="form__input" name="email" id="email" placeholder="Введите свою почту" pattern="^[a-zA-Z0-9]+[-_\\.]*[a-zA-Z0-9]+@[a-zA-Z]+\\.[a-zA-Z]{2,8}" required>
                    <span class="form__error">Неправильный формат email</span>
                </label>
                <label for="password" class="form__label">Пароль
                    <input type="password" class="form__input" name="password" id="password" placeholder="Введите пароль" minlength="8" maxlength="30" required>
                    <span class="form__error">Неправильный формат пароля</span>
                </label>
                <label for="name" class="form__label">Имя
                    <input type="text" class="form__input" name="name" id="name" placeholder="Введите своё имя" minlength="2" maxlength="20" pattern="(^[А-Я][а-яё]+)[\\s-]*([А-Я][а-яё]+)?" required>
                    <span class="form__error">&nbsp;</span>
                </label>

                <span class="form__error form__error_geometry">Такой пользователь уже есть</span>
                <button class="button button_disabled form__button" type="submit">Зарегистрироваться</button>

                <span class="popup__text">или <a href="#" class="link popup__link">Войти</a></span>
            </form>
        `.trim()
    }

    // Шаблон для авторизации
    signin() {
        return `
            <form action="" method="post" class="form">

                <h4 class="popup__title">Вход</h4>

                <label for="email" class="form__label">Email
                    <input type="email" class="form__input" name="email" id="email" placeholder="Введите свою почту" pattern="^[a-zA-Z0-9]+[-_\\.]*[a-zA-Z0-9]+@[a-zA-Z]+\\.[a-zA-Z]{2,8}" required>
                    <span class="form__error">Неправильный формат email</span>
                </label>
                <label for="password" class="form__label">Пароль
                    <input type="password" class="form__input" name="password" id="password" placeholder="Введите пароль" minlength="8" maxlength="30" required>
                    <span class="form__error">Неправильный формат пароля</span>
                </label>

                <span class="form__error form__error_geometry">Такой пользователь уже есть</span>
                <button class="button button_disabled form__button" type="submit">Войти</button>

                <span class="popup__text">или <a href="#" class="link popup__link">Зарегистрироваться</a></span>
            </form>
        `.trim()
    }

    // Шаблон для успешной регистрации
    success() {
        return `
            <h4 class="popup__title">Пользователь успешно зарегистрирован!</h4>

            <a href="#" class="link popup__link">Выполнить вход</a>
        `.trim()
    }
}
