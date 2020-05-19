import notFoundImage from '../../images/not-found.svg';

export class Article {
    constructor(props) {
        this.props = props;
        this.Api = props.newsApi;
        this.Post = props.post;
        this.Event = props.event;
        this.articles = document.querySelector(props.articles.articles);
    }

    renderResult(keyword, pageNum = 1) {
        console.log('keyword: ', keyword);
        console.log('pageNum: ', pageNum);
        this.keyword = keyword;

        if (!this.articles.querySelector(this.props.articles.wrapper)) {
            this.articles.insertAdjacentHTML(
                'afterbegin',
                `
                        <div class="articles__wrapper root__wrapper articles__wrapper_geometry">
                            <!--Прелодер-->
                            <div class="preloader preloader_none">
                                <i class="preloader__load"></i>
                                <p class="description preloader__description">Идет поиск новостей...</p>
                            </div>

                            <!--Если не одна статья не найдена-->
                            <div class="not-found not-found_none">
                                <img src="${notFoundImage}" alt="Ничего не смог найти" class="not-found__img">
                                <h3 class="title not-found__title">Ничего не найдено</h3>
                                <p class="description not-found__description">К сожалению по вашему запросу
                                    ничего не найдено.</p>
                            </div>
                        </div>
                        `
            );
            this.wrapper = this.articles.querySelector(this.props.articles.wrapper);
        } else {
            this.renderError(false);
        }

        // Запускаю прелоадер
        this.renderLoader();

        this.Api.getNews(this.keyword, pageNum)
            .then(res => {
                // Удаляю прелоадер
                this.renderLoader();
                if (res.totalResults === 0) {
                    this.renderError(true);
                } else {
                    if (!this.wrapper.querySelector(this.props.articles.postList)) {
                        this.wrapper.insertAdjacentHTML(
                            'afterbegin',
                            `
                            <h2 class="title articles__title">Что в мире творится?</h2>

                            <div class="articles__content"></div>

                            <button type="submit" class="button button_flat-round articles__button">Показать ещё</button>
                            `
                        );
                        this.postList = this.articles.querySelector(this.props.articles.postList);
                        this.showMore();
                    }
                    res.articles.forEach(item => {
                        this.postList.insertAdjacentHTML('beforeend', this.Post.card(item))
                    });
                }
            })
            .catch(err => console.error(err));
    }

    renderLoader() {
        if (!this.preloader) {
            this.preloader = this.wrapper.querySelector(this.props.articles.preloader);
        }
        this.preloader.classList.toggle('preloader_none');
    }

    renderError(switchBoolean) {
        if (!this.notFound) {
            this.notFound = this.wrapper.querySelector(this.props.articles.notFound);
        }

        if (switchBoolean) {
            this.notFound.classList.remove('not-found_none');
        } else {
            this.notFound.classList.add('not-found_none');
        }
    }

    showMore() {
        if (!this.showMoreBtn) {
            this.showMoreBtn = this.wrapper.querySelector(this.props.articles.showMoreBtn);
        }

        let countPage = 1;
        const show = () => {
            countPage++;
            this.renderResult(this.keyword, countPage);
        }

        this.Event.addEvent(this.showMoreBtn, 'click', show);
    }

    addCard() {

    }
}
