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
        const myHeaders = new Headers();
        return fetch(`https://api.karpov-portfolio.tk/exit`, {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }).then(res => {
            console.log(res);
            return res.json();
        });
    }

}
