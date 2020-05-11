export class Header {
    constructor(props) {
        this.link = props.link
    }

    activeLink() {
        this.link.forEach(str => {
            if (str.href === document.location.href) {
                str.closest('.header__link-wrapper').classList.add('header__link_active');
            }
        })
    }
}
