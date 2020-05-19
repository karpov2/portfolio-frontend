export class Popup {
    constructor(props) {
        this.props = props;
        // Класс Event
        this.Event = props.event;
        // Класс Form
        this.Form = props.form;

        // Биндим метод закрытия popup окна
        this.callbackClose = this.close.bind(this);
    }

    // Открыть popup
    open() {
        // Подключение к элементу popup
        this.elementPopup = document.querySelector(this.props.popups.popup);
        // Подключение к элементу формы popup окна
        this.elementWrapper = this.elementPopup.querySelector(this.props.popups.wrapper);
        // Подключение к элементу "крестика" для закрытия popup окна
        this.elementPopupClose = this.elementWrapper.querySelector(this.props.popups.close);
        // css класс открывающий popup
        this.elementOpen = this.props.popups.open;

        // Добавляем css класс открывающий popup
        this.elementPopup.classList.add(this.elementOpen);

        // Добавляем слушатели для закрытия popup окна
        this.Event.addEvent(this.elementPopup, 'click', this.callbackClose);
        this.Event.addEvent(this.elementPopupClose, 'click', this.callbackClose);
        this.Event.addEvent(document, 'keydown', this.callbackClose)
    }

    /**
     * Закрыть popup
     * @param event
     * @param bool
     */
    close(event, bool = false) {
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

        if (bool) return remove()
    }

    /**
     * Отрисовка Popup
     * @param content
     * @param element
     */
    render(content, element) {
        const view = () => {
            switch (content) {
                case 'signup':
                    return this.Form.signup();
                case 'signin':
                    return this.Form.signin();
                case 'success':
                    return this.Form.success();
                default:
                    return this.Form.signin();
            }
        }

        // Если popup уже создан, пропускаем создание
        if (!this.elementPopup) {
            // Создаем popup
            element.insertAdjacentHTML(
                'afterend',
                `
                    <div class="popup popup_hidden">
                        <div class="popup__wrapper">
                            <svg viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg" class="popup__close">
                                <path d="M3 0L0 3L8.5 11.5L0 20L3 23L11.5 14.5L20 23L23 20L14.5 11.5L23 3L20 0L11.5 8.5L3 0Z"/>
                            </svg>

                            ${view()}
                        </div>
                    </div>
                `.trim()
            )
            // Открываем popup
            this.open();
        } else {
            this.elementWrapper.removeChild(this.Form.elementForm);
            this.elementWrapper.insertAdjacentHTML('beforeend', view());
        }

        if (!this.elementPopup.classList.contains(this.elementOpen)) {
            // Открываем popup
            this.open();
        }

        this.Form.send();
    }
}
