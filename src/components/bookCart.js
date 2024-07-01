import datebook from "./dateBook.js";
export default {
    name: "bookcart",
    props: ["readbook"],
    components: {
        datebook
    },
    template: `
        <div class="book_cart">
            <h3>{{readbook.title}}</h3>
            <img :src="readbook.images" :alt="readbook.alt">
            <div class="book_cart_buttons">
                <button @click="showDateBook">Подробнее</button>
                <button @click="deleteBook">Удалить</button>
            </div>
            <datebook :book="readbook"></datebook>
        </div>
    `,
    methods: {
        deleteBook() {
            this.$parent.deleteBook(this.readbook.title);
        },
        showDateBook() {
            this.$children[0].$el.style.display = "flex";
            const color = window.getComputedStyle(this.$parent.$el).backgroundColor;
            this.$children[0].$el.querySelectorAll("h1, p").forEach(element => {
                element.style.color = color;
            })
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