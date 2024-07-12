<script>
import DateBook from "./DateBook.vue";
export default {
    name: "BookCart",
    props: ["bookInList", "bookstatus"],
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
            this.$emit("delete", this.bookInList);
        },
        showDateBook() {
            this.$refs.datebook.$el.style.display = "flex";
            this.displayDateBook = "flex";
            const color = window.getComputedStyle(this.$parent.$el).backgroundColor;
            this.$refs.datebook.$el.querySelectorAll("h1, p").forEach(element => {
                element.style.color = color;
            });
        },
        updateBooksList(book) {
            this.$emit("update", book);
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
        <h3>{{ bookInList.title }}</h3>
        <img :src="bookInList.images" :alt="bookInList.alt">
        <div class="book_cart_buttons">
            <button @click="showDateBook">Подробнее</button>
            <button @click="deleteBook">Удалить</button>
        </div>
        <DateBook @update="updateBooksList" @delete="deleteBook" @displayOff="displayOff" ref="datebook" :book="bookInList" :status="bookstatus">
        </DateBook>
    </div>
</template>