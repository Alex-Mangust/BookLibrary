<script>
import BookCart from "../BookCart.vue"
export default {
    name: "wanttoread",
    components: {
        BookCart,
    },
    props: ["booklist"],
    data() {
        return {
            componentStyle: {},
            bookStatus: "wanttoread"
        }
    },
    methods: {
        deleteBook(title) {
            const newBookList = this.booklist.filter(book => book.title !== title);
            this.$emit("update", newBookList, 2);
        },
        updateBooksList(book, mode) {
            this.$emit("add", book, mode);
        }
    }
}
</script>

<template>
    <div style="componentStyle" class="want_to_read">
        <h2>Хочу прочитать</h2>
        <div class="books">
            <div v-if="booklist.length === 0" class="book_cart">
                <h3>В данный момент здесь пусто</h3>
            </div>
            <BookCart @update="updateBooksList" @delete="deleteBook" v-for="(book, index) in booklist" :key="index"
                :readbook="book" :bookstatus="bookStatus">
            </BookCart>
        </div>
    </div>
</template>