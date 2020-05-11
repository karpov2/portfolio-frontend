export class Post {
    constructor(element) {
        const height = Post._getComputedHeight(element);
        console.log('height: ', height);

        const content = element.getElementsByClassName('content')[0];
        console.log('content: ', content);

        while (Post._getComputedHeight(content) > height) {
            content.innerHTML = content.innerHTML.replace(/\W*\s(\S)*$/, '...');
        }
    }

    static _getComputedHeight(el) {
        return parseInt(window.getComputedStyle(el).getPropertyValue('height'));
    }
}
