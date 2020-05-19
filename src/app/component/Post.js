export class Post {
    card(props) {
        const searchTagList = /<\/?ol>|<\/?ul>|<\/?li>/g;
        if (searchTagList.test(props.description)) {
            props.description = props.description.replace(searchTagList, '')
        }
        const date = new Date(props.publishedAt);
        const time = `
            ${date.getDate() + 1}
            ${date.toLocaleString('ru', {month: 'long'})},
            ${date.getFullYear()}
        `;

        return `
        <div class="post">
            <div class="post__navigation">
                <div class="tooltip tooltip_message post__btn" data-tooltip="Войдите, чтобы сохранять статьи">
                    <svg class="post__icon" viewBox="0 0 14 19" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M0 1C0 0.447715 0.447715 0 1 0H13C13.5523 0 14 0.447715 14 1V19L7 13.5L0 19V1ZM12 2H2V15L7 11L12 15V2Z"/>
                    </svg>
                </div>
            </div>

            <img src="${props.urlToImage}" alt="" class="post__img">
            <div class="post__content">
                <time class="post__date" datetime="2020-05-15">${time}</time>
                <h3 class="title post__title">${props.title}</h3>
                <p class="description post__description">${props.description}</p>
                <a href="#" class="link post__source">${props.source.name}</a>
            </div>
        </div>
        `.trim();
    }
}
