export default {
    name: "bookcart",
    props: ["readbook"],
    template: `
        <div class="book_cart">
            <h3>{{readbook.title}}</h3>
            <img :src="readbook.images" :alt="readbook.alt">
            <div class="book_cart_buttons">
                <button>Подробнее</button>
                <button @click="deleteBook">Удалить</button>
            </div>
        </div>
    `,
    methods: {
        deleteBook() {
            this.$parent.deleteBook(this.readbook.title);
        }
    },
    mounted() {
        document.querySelectorAll(".book_cart").forEach(bookCart => {
            bookCart.addEventListener("mouseover", () => {
                const bookCartButton = bookCart.querySelectorAll(".book_cart_buttons");
                if (bookCartButton.length !== 0) {
                    bookCartButton[0].style.visibility = "visible";
                }
            });
            bookCart.addEventListener("mouseout", () => {
                const bookCartButton = bookCart.querySelectorAll(".book_cart_buttons");
                if (bookCartButton.length !== 0) {
                    bookCartButton[0].style.visibility = "hidden";
                }
            });
        });
    }
}