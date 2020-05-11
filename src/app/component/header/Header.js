export class Header {
    constructor(props) {
        this.Event = props.Event;
        this.Popup = props.Popup;
        this.link = document.querySelectorAll(props.link);
        this.authorization = document.querySelector(props.authorization);
    }

    activeLink() {
        this.link.forEach(str => {
            if (str.firstElementChild.href === document.location.href) {
                str.classList.add('header__link_active');
            }
        })
    }



    signup() {
        const open = (event) => {
            // Если popup уже создан, пропускаем создание
            if (!this.Popup.elementPopup) {
                // Создаем popup
                this.authorization.insertAdjacentHTML(
                    'afterend',
                    this.Popup.viewSignup()
                )
            }

            // Открываем popup
            this.Popup.open()
        }

        // Добавляем слушатель на кнопку авторизации для открытия popup окна
        this.Event.addEvent(this.authorization, 'click', open)
    }

    signin() {
        const open = (event) => {
            // Если popup уже создан, пропускаем создание
            if (!this.Popup.elementPopup) {
                // Создаем popup
                this.authorization.insertAdjacentHTML(
                    'afterend',
                    this.Popup.viewSignin()
                )
            }

            // Открываем popup
            this.Popup.open()
        }

        // Добавляем слушатель на кнопку авторизации для открытия popup окна
        this.Event.addEvent(this.authorization, 'click', open)
    }
}
