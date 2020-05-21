export class Header {
    constructor(props) {
        this.props = props;
        this.Event = props.event;
        this.Popup = props.popup;
        this.MainApi = props.mainApi;
        this.Post = props.post;
        this.link = document.querySelectorAll(props.headers.link);
        this.authorization = document.querySelector(props.headers.authorization);
        this.authorizationText = this.authorization.querySelector(props.headers.authorizationText);
        this.icon = this.authorization.querySelector(props.headers.icon);
        this.authorizationName = props.headers.authorizationName;

        this.popupRender = () => this.Popup.render('signin', this.authorization);
        this.exitBind = this.exit.bind(this);
        this.href = document.location.href;
    }

    activeLink() {
        this.link.forEach(str => {
            if (str.firstElementChild.href === document.location.href) {
                str.classList.add('header__link_active');
            }
        })
    }

    signin() {
        this.MainApi.getUserData().then(data => {
            this.user = data;
            const articleHref = /article/.test(this.href);
            console.log(data);
            if (data.message === 'Необходима авторизация') {
                // Добавляем слушатель на кнопку авторизации для открытия popup окна
                this.Event.addEvent(this.authorization, 'click', this.popupRender);
            } else if (data.name && data.email) {
                this.isLoggedIn = true;
                this.Event.removeEvent(this.authorization, 'click', this.popupRender);
                // Добавляем слушатель на кнопку выхода из ЛК
                this.Event.addEvent(this.authorization, 'click', this.exitBind);
                this.authorizationText.textContent = data.name;
                this.icon.classList.remove('button__img_none');
                if (articleHref) {
                    this.render();
                }
                this.Post.noTooltipMessage();
                this.Post.tooltipActive();
                this.links();
            }
        })
    }

    exit() {
        this.MainApi.exit()
            .then(res => {
                console.log(res);
                if (res.status === 'ok') {
                    this.Event.removeEvent(this.authorization, 'click', this.exitBind);
                    this.authorizationText.textContent = this.authorizationName;
                    this.icon.classList.add('button__img_none');

                    // Добавляем слушатель на кнопку авторизации для открытия popup окна
                    this.Event.addEvent(this.authorization, 'click', this.popupRender);
                }
            })
            .catch(err => console.error(err))
    }

    links() {
        this.link.forEach(item => {
            if (item.classList.contains(this.props.headers.noLink)) {
                return item.classList.remove(this.props.headers.noLink)
            }
        })
    }

    render() {
        const elementSearchContainer = document.querySelector(this.props.search.container);

        this.MainApi.getArticles().then(i => {
            console.log(i);
            let test = i.reduce((val, item) => {
                val[item.keyword] = (val[item.keyword] || 0) + 1;
                return val
            }, {});
            console.log(test);
            elementSearchContainer.insertAdjacentHTML('beforeend', `
                <h1 class="title search__title">${this.user.name || 'Друг'}, у вас ${i.length} сохранённых статей</h1>
                <p class="description search__description">По ключевым словам: <span class="description_bolt">Природа, Тайга</span> и <span class="description_bolt">2 другим</span></p>
            `.trim())
        });
    }
}
