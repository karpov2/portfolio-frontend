import notFoundImage from '../../images/not-found.svg';

export class Article {
    constructor(props) {
        this.props = props;
        this.NewsApi = props.newsApi;
        this.MainApi = props.mainApi;
        this.Post = props.post;
        this.Event = props.event;
        this.articles = document.querySelector(props.articles.articles);
        // Массив статей из поиска
        this.newsPost = [];
        this.href = document.location.href;
        this.getArticles = {};
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
                        `.trim()
            );
            this.wrapper = this.articles.querySelector(this.props.articles.wrapper);
        } else {
            this.renderError(false);
        }

        // Запускаю прелоадер
        this.renderLoader();

        const createPost = (res) => {
            if (res.articles.length === 0) {
                this.renderError(true);
            } else {
                if (!this.wrapper.querySelector(this.props.articles.postList)) {
                    this.wrapper.insertAdjacentHTML(
                        'afterbegin',
                        `
                                <h2 class="title articles__title">Что в мире творится?</h2>

                                <div class="articles__content"></div>

                                <button type="submit" class="button button_flat-round articles__button">Показать ещё</button>
                                `.trim()
                    );
                    this.postList = this.articles.querySelector(this.props.articles.postList);
                    this.showMore();
                }
                res.articles.forEach(item => {
                    this.postList.insertAdjacentHTML('beforeend', this.Post.card(item));
                    this.newsPost.push(item);
                });
                if (this.Header.isLoggedIn) {
                    this.getPost().then(i => {
                        this.addPost();
                        this.Post.noTooltipMessage();
                        this.Post.tooltipActive();
                    });
                }
            }
        }

        if (/article/.test(this.href)) {
            this.getPost().then(i => {
                console.log('Какие статьи у меня сохранены', this.getArticles);
                // Удаляю прелоадер
                this.renderLoader();
                createPost(this.getArticles);

                if (this.postList.querySelectorAll(this.props.posts.post).length === i.length) {
                    this.hideShowMore(true);
                }
            })
        } else if (keyword) {
            this.NewsApi.getNews(this.keyword, pageNum)
                .then(res => {
                    console.log(res);
                    // Удаляю прелоадер
                    this.renderLoader();
                    createPost(res);
                    if (this.postList.querySelectorAll(this.props.posts.post).length === res.articles.length) {
                        this.hideShowMore(true);
                    }

                    if (res.totalResults === 0) {
                        // this.renderError(true);
                    }
                })
                .catch(err => console.error(err));
        }
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

    hideShowMore(hide) {
        if (!this.showMoreBtn) {
            this.showMoreBtn = this.wrapper.querySelector(this.props.articles.showMoreBtn);
        }

        if (hide) {
            this.showMoreBtn.classList.add(this.props.articles.noShowMoreBtn);
        } else {
            this.showMoreBtn.classList.remove(this.props.articles.noShowMoreBtn);
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

    addPost() {
        if (this.newsPost.length > 0) {
            this.elementPost = this.postList.querySelectorAll(this.props.posts.post);
            // this.tooltipPost = this.postList.querySelectorAll(this.props.posts.tooltipMessage);

            const savePost = (event) => {
                const elementPost = event.target.closest(this.props.posts.post);
                const elementTitle = elementPost.querySelector(this.props.posts.postTitle);
                const elementPostTooltipeMessage = elementPost.querySelector(this.props.posts.tooltipMessage);

                const newsPostItem = this.newsPost.find(item => elementTitle.textContent === item.title);
                console.log(newsPostItem);

                this.MainApi.createArticle({
                    keyword: this.keyword,
                    title: newsPostItem.title,
                    description: newsPostItem.description,
                    date: newsPostItem.publishedAt,
                    source: newsPostItem.source.name,
                    link: newsPostItem.url,
                    image: newsPostItem.urlToImage
                }).then(res => {
                    console.log('savepost: ', res, elementPostTooltipeMessage);
                    if (res.status === 'ok') {
                        this.getPost().then(i => {
                            elementPost.setAttribute('id', res.post._id);
                            elementPost.removeAttribute('post-save');
                            this.Event.removeEvent(elementPostTooltipeMessage, 'click', savePost);
                            this.Post.tooltipActive();
                            this.deletePost();
                        });
                    }
                })
            }

            this.elementPost.forEach(item => {
                const elementPostTitle = item.querySelector(this.props.posts.postTitle);
                const elementPostTooltipeMessage = item.querySelector(this.props.posts.tooltipMessage);
                const elementSavePost = this.getArticles.articles.find(item => item.title === elementPostTitle.textContent);

                if (elementSavePost && !item.hasAttribute('id')) {
                    item.setAttribute('id', elementSavePost._id);
                    this.deletePost();
                    console.log('Добавляю событие delete: ', item);
                } else if (!item.hasAttribute('post-save') && !item.hasAttribute('id')) {
                    item.setAttribute('post-save', 'true');
                    console.log('Добавляю событие save: ', item);
                    this.Event.addEvent(elementPostTooltipeMessage, 'click', savePost);
                }
            })
        }
    }

    deletePost() {
        const delPost = (event) => {
            const elementPost = event.target.closest(this.props.posts.post);
            const elementPostTooltipeMessage = elementPost.querySelector(this.props.posts.tooltipMessage);
            const articleHref = /article/.test(this.href);

            this.MainApi.removeArticle({id: elementPost.getAttribute('id')})
                .then(post => {
                    console.log('delPost: ', post)
                    console.log('delPost elementPostTooltipeMessage: ', elementPostTooltipeMessage)
                    if (post.status === 'ok') {
                        elementPost.removeAttribute('id');
                        elementPost.removeAttribute('post-event-delete');
                        this.Event.removeEvent(elementPostTooltipeMessage, 'click', delPost);
                        this.getPost().then(i => {
                            console.log('deletePost getArticles: ', this.getArticles)
                            if (articleHref) {
                                elementPost.remove();
                            } else {
                                this.addPost();
                                this.Post.tooltipActive();
                            }
                        });
                    }
                })
        }

        this.elementPost.forEach(item => {
            const elementPostTooltipeMessage = item.querySelector(this.props.posts.tooltipMessage);
            if (item.hasAttribute('id') && !item.hasAttribute('post-event-delete')) {
                console.log('deletePost Добавляю событие delete: ', item);
                item.setAttribute('post-event-delete', true);
                this.Event.addEvent(elementPostTooltipeMessage, 'click', delPost);
            }
        })
    }

    getPost() {
        return this.MainApi.getArticles()
            .then(i => this.getArticles.articles = i)
    }
}
