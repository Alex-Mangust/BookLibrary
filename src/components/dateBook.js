export default {
    name: "datebook",
    props: ["book"],
    template: `
        <div class="date_book">
            <div class="inside_date_book">
                <h1>{{book.title}}</h1>
                <img :src="book.images" :alt="book.alt">
                <p>{{book.description}}</p>
                <select>
                    <option value="reading">Читаю</option>
                    <option value="wanttoread">Хочу прочитать</option>
                    <option value="finishread">Закончил читать</option>
                </select>
                <button @click="closeBookDate" class="close_book_date">X</button>
            </div>
        </div>
    `,
    methods: {
        closeBookDate() {
            this.$el.style.display = "none";
        }
    },
    mounted() {
        // console.log(this.book);
    }
}