<script>
import DataBook from "./DataBook.vue";
export default {
    name: "BookCart",
    props: ["bookInList", "bookstatus", "bookIndex"],
    data() {
        return {
            displayDataBook: "none"
        }
    },
    components: {
        DataBook
    },
    methods: {
        deleteBook() {
            this.$emit("delete", this.bookInList);
        },
        showDataBook() {
            this.$refs.databook.$el.style.display = "flex";
            this.displayDataBook = "flex";
            const color = window.getComputedStyle(this.$parent.$el).backgroundColor;
            this.$refs.databook.$el.querySelectorAll("h1, p").forEach(element => {
                element.style.color = color;
            });
        },
        updateBooksList(book) {
            this.$emit("update", book);
        },
        displayOff() {
            this.displayDataBook = "none";
        },
        getDispayDataBook() {
            return this.displayDataBook;
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
    <div class="book_cart" @click="showDataBook">
        <h3>{{ bookInList.title }}</h3>
        <img :src="bookInList.images" :alt="bookInList.alt">
        <div class="book_cart_buttons">
            <button class="delete_button" @click.stop="deleteBook">Удалить</button>
        </div>
        <DataBook @update="updateBooksList" @delete="deleteBook" @displayOff="displayOff" ref="databook" :book="bookInList" :status="bookstatus" :bookIndex="this.bookIndex">
        </DataBook>
    </div>
</template>