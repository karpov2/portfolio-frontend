export class NewsApi {
    getNews(keyword, pageNum) {
        // Ссылка на api с новосятми
        const url = 'http://newsapi.org/v2/everything';
        // Текст запроса
        const q = `q=${keyword}`;
        /**
         * Получаем дату в формате год-месяц-день
         * @param num
         * @returns {string}
         */
        const date = (num) => {
            const date = new Date();
            date.setDate(date.getDate() - num);
            return date.toISOString();
        };
        // С какой даты начать поиск
        const from = `from=${date(7)}`;
        // По какую дату закончить поиск
        const to = `to=${date(0)}`;
        // Отсортировать массив статей
        const sortBy = 'sortBy=popularity';
        // Количество элементов в массиве
        const pageSize = 'pageSize=3';
        const page = `page=${pageNum}`;
        // api ключ для запроса
        const apiKey = 'apiKey=1806c7549b12494a803f295331d677c4';

        return fetch(`${url}?${q}&${from}&${to}&${sortBy}&${pageSize}&${page}&${apiKey}`)
            .then(post => post.json())
    }
}
