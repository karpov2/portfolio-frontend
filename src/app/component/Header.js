export class Header {
    constructor(props) {
        this.props = props;
        this.Event = this.props.event;
        this.Popup = this.props.popup;
        this.MainApi = this.props.mainApi;
        this.link = document.querySelectorAll(this.props.headers.link);
        this.authorization = document.querySelector(this.props.headers.authorization);
        this.authorizationText = this.authorization.querySelector(this.props.headers.authorizationText);
        this.icon = this.authorization.querySelector(this.props.headers.icon);
        this.authorizationName = this.props.headers.authorizationName;

        this.signinBind = this.signin.bind(this);
    }

    activeLink() {
        this.link.forEach(str => {
            if (str.firstElementChild.href === document.location.href) {
                str.classList.add('header__link_active');
            }
        })
    }

    authorizationBtn() {
        if (this.authorizationText.textContent === this.authorizationName) {
            this.signin();
        } else {
            this.viewExitButton('Ilya')
        }
    }

    signin() {
        if (!this.icon.classList.contains('button__img_none')) {
            this.MainApi.exit()
                .then(res => {
                    console.log(res);
                    if (res.status === 'ok') {
                        this.Event.removeEvent(this.authorization, 'click', this.signinBind);
                        this.authorizationText.textContent = this.authorizationName;
                        this.icon.classList.add('button__img_none');
                    }
                })
                .catch(err => console.error(err))
        } else {
            this.popupRender = () => this.Popup.render('signin', this.authorization);
            // Добавляем слушатель на кнопку авторизации для открытия popup окна
            this.Event.addEvent(this.authorization, 'click', this.popupRender);
        }
    }

    viewExitButton(name) {
        this.authorizationText.textContent = name;
        this.icon.classList.remove('button__img_none');

        this.Event.removeEvent(this.authorization, 'click', this.popupRender);
        // Добавляем слушатель на кнопку выхода из ЛК
        this.Event.addEvent(this.authorization, 'click', this.signinBind);
    }
}
