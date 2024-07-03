export default {
    name: "datebook",
    props: ["book", "status"],
    data() {
        return {
            bookStatus: this.status
        }
    },
    template: `
        <div class="date_book">
            <div class="inside_date_book">
                <h1>{{book.title}}</h1>
                <img :src="book.images" :alt="book.alt">
                <p>{{book.description}}</p>
                <select v-model="bookStatus" @change="changeBookStatus">
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
        },
        changeBookStatus() {
            this.$parent.deleteBook();
            switch (this.bookStatus) {
                case "reading":
                    this.$root.getReadingList().push(this.book);
                    break;
                case "wanttoread":
                    this.$root.getWantToReadList().push(this.book);
                    break;
                case "finishread":
                    this.$root.getFinishReadList().push(this.book);
                    break;
            }
        }
    }
}