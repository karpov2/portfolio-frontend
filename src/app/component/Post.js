export class Post {
    constructor(props) {
        this.props = props;
        // Класс MainApi
        this.MainApi = props.mainApi;
        this.href = document.location.href;
    }

    tooltipActive() {
        if (this.Header.isLoggedIn) {
            this.elementPost = document.querySelectorAll(this.props.posts.post);
            const articleHref = /article/.test(this.href);

            this.MainApi.getArticles().then(res => {
                console.log('tooltipActive: ', res)
                this.elementPost.forEach(item => {
                    const elementPostTitle = item.querySelector(this.props.posts.postTitle);
                    const elementPostIcon = item.querySelector(this.props.posts.postIcon);

                    if (res.some(item => item.title === elementPostTitle.textContent) && !articleHref) {
                        elementPostIcon.classList.add(this.props.posts.postIconActive)
                    } else {
                        console.log('Удаляю активную иконку: ', item)
                        elementPostIcon.classList.remove(this.props.posts.postIconActive)
                    }
                })
            })
        }
    }

    noTooltipMessage() {
        this.tooltipMessage = document.querySelectorAll(this.props.posts.tooltipMessage);
        console.log('noTooltipMessage', this.tooltipMessage);
        if (this.Header.isLoggedIn) {
            this.tooltipMessage.forEach(item => {
                if (!item.classList.contains(this.props.posts.noTooltipMessage)) {
                    item.setAttribute('data-tooltip', 'Убрать из сохранённых');
                }
            })
        } else {
            this.tooltipMessage.forEach(item => {
                if (item.classList.contains(this.props.posts.noTooltipMessage)) {
                    item.setAttribute('data-tooltip', 'Войдите, чтобы сохранять статьи');
                }
            })
        }
    }

    card(props) {
        const articleHref = /article/.test(this.href);
        const searchTagList = /<\/?ol>|<\/?ul>|<\/?li>/g;
        if (searchTagList.test(props.description)) {
            props.description = props.description.replace(searchTagList, '')
        }
        const date = new Date(articleHref ? props.date : props.publishedAt);
        const time = `
            ${date.getDate() + 1}
            ${date.toLocaleString('ru', {month: 'long'})},
            ${date.getFullYear()}
        `;

        return `
        <div class="post">
            <div class="post__navigation">
                <div class="tooltip tooltip_message post__btn">
                    ${articleHref ?
                        `<svg class="post__icon post__icon_delete" width="18" height="19" viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 4V2H6V0H12V2H18V4H0Z"/>
                            <path d="M4 6H2V17C2 18.1046 2.89543 19 4 19H14C15.1046 19 16 18.1046 16 17V6H14V17H4V6Z"/>
                            <path d="M8 6H6V15H8V6Z"/>
                            <path d="M12 6H10V15H12V6Z"/>
                        </svg>`.trim() :
                        `<svg class="post__icon post__icon_flag" width="14" height="19" viewBox="0 0 14 19" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.38218 12.7137L1 16.9425V1H13V16.9425L7.61782 12.7137L7 12.2283L6.38218 12.7137Z" stroke-width="2"/>
                        </svg>`.trim()}
                </div>
            </div>

            <img src="${articleHref ? props.image : props.urlToImage}" alt="" class="post__img">
            <div class="post__content">
                <time class="post__date" datetime="${date}">${time}</time>
                <h3 class="title post__title">${props.title}</h3>
                <p class="description post__description">${props.description}</p>
                <a href="#" class="link post__source">${articleHref ? props.source : props.source.name}</a>
            </div>
        </div>
        `.trim();
    }
}
