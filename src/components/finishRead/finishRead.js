import bookcart from "../bookCart.js"
export default {
    name: "finishread",
    components: {
        bookcart,
    },
    props: ["booklist"],
    data() {
        return {
            componentStyle: {}
        }
    },
    template: `
        <div style="componentStyle" class="finish_read">
            <h2>Закончил читать</h2>
            <div class="books">
                <div v-if="booklist.length === 0" class="book_cart">
                    <h3>В данный момент здесь пусто</h3>
                </div>
                <bookcart v-for="(book, index) in booklist" :key="index" :readbook="book"></bookcart>
            </div>
        </div>
    `,
    methods: {
        deleteBook(title) {
            const newBookList = this.booklist.filter(book => book.title !== title);
            this.$parent.updateBooksList(newBookList, 3);
        }
    }
}

