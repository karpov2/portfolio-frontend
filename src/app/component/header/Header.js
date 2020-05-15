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

    viewPopup(props) {
        const open = () => {
            // Если popup уже создан, пропускаем создание
            if (!this.Popup.elementPopup) {
                // Создаем popup
                this.authorization.insertAdjacentHTML(
                    'afterend',
                    props.view()
                )
            }

            // Открываем popup
            this.Popup.open()
        }

        // Добавляем слушатель на кнопку авторизации для открытия popup окна
        this.Event.addEvent(this.authorization, 'click', open)
    }

    signup() {
        this.viewPopup({view: this.Popup.viewSignup})
    }

    signin() {
        this.viewPopup({view: this.Popup.viewSignin})
    }

    test() {
        console.log(this.Popup.test)
    }
}
