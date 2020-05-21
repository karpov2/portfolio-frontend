export class MainApi {
    signup(props) {
        return fetch(`https://api.karpov-portfolio.tk/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: props.email.value,
                password: props.password.value,
                name: props.name.value
            })
        }).then(res => res.json());
    }

    signin(props) {
        return fetch(`https://api.karpov-portfolio.tk/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: props.email.value,
                password: props.password.value
            })
        }).then(res => res.json());
    }

    exit() {
        return fetch(`https://api.karpov-portfolio.tk/exit`, {
            method: 'GET',
            credentials: 'include',
        }).then(res => res.json());
    }

    getUserData() {
        return fetch(`https://api.karpov-portfolio.tk/users/me`, {
            method: 'GET',
            credentials: 'include',
        }).then(res => res.json());
    }

    getArticles() {
        return fetch(`https://api.karpov-portfolio.tk/articles`, {
            method: 'GET',
            credentials: 'include',
        }).then(res => res.json());
    }

    createArticle(props) {
        return fetch(`https://api.karpov-portfolio.tk/articles`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                keyword: props.keyword,
                title: props.title,
                description: props.description,
                date: props.date,
                source: props.source,
                link: props.link,
                image: props.image
            })
        }).then(res => res.json());
    }

    removeArticle(props) {
        return fetch(`https://api.karpov-portfolio.tk/articles/${props.id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        }).then(res => res.json());
    }
}
