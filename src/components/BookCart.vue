<script>
import DateBook from "./DateBook.vue";
export default {
    name: "BookCart",
    props: ["readbook", "bookstatus"],
    date() {
        return {
            displayDateBook: "none"
        }
    },
    components: {
        DateBook
    },
    methods: {
        deleteBook() {
            this.$emit("delete", this.readbook.title);
        },
        showDateBook() {
            this.$refs.datebook.$el.style.display = "flex";
            this.displayDateBook = "flex";
            const color = window.getComputedStyle(this.$parent.$el).backgroundColor;
            this.$refs.datebook.$el.querySelectorAll("h1, p").forEach(element => {
                element.style.color = color;
            });
        },
        updateBooksList(book, mode) {
            if (mode === 1) {
                this.$emit("update", book, 1);
            } else if (mode === 2) {
                this.$emit("update", book, 2);
            } else if (mode === 3) {
                this.$emit("update", book, 3);
            }
        },
        displayOff() {
            this.displayDateBook = "none";
        },
        getDispayDateBook() {
            return this.displayDateBook;
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
</script>

<template>
    <div class="book_cart">
        <h3>{{ readbook.title }}</h3>
        <img :src="readbook.images" :alt="readbook.alt">
        <div class="book_cart_buttons">
            <button @click="showDateBook">Подробнее</button>
            <button @click="deleteBook">Удалить</button>
        </div>
        <DateBook @update="updateBooksList" @delete="deleteBook" @displayOff="displayOff" ref="datebook" :book="readbook" :status="bookstatus">
        </DateBook>
    </div>
</template>