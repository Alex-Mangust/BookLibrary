import bookcart from "../bookCart.js"
export default {
    name: "readingblock",
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
        <div style="componentStyle" class="reading">
            <h2>Читаю в данный момент</h2>
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
            this.$parent.updateBooksList(newBookList, 1);
        }
    }
}

