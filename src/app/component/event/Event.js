export class Event {

    /**
     * Добавить событие
     * @param element
     * @param event
     * @param callback
     * @param options
     */
    addEvent(element, event, callback, options) {
        if (Array.isArray(callback)) {
            return callback.forEach(i => element.addEventListener(event, i, options))
        }

        element.addEventListener(event, callback, options)
    }

    /**
     * Удалить событие
     * @param element
     * @param event
     * @param callback
     * @param options
     */
    removeEvent(element, event, callback, options) {
        if (Array.isArray(callback)) {
            return callback.forEach(i => element.removeEventListener(event, i, options))
        }

        element.removeEventListener(event, callback, options)
    }
}
