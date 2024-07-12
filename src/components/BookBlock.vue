<script>
import BookCart from "./BookCart.vue"
export default {
    name: "ReadingBlock",
    components: {
        BookCart,
    },
    props: ["booklist", "status"],
    data() {
        return {
            componentStyle: {},
            blockBoks: [],
            title: null
        }
    },
    methods: {
        deleteBook(book) {
            this.$emit("delete", book.title);
        },
        updateBooksList(book) {
            this.$emit("add", book);
        },
        getDispayDateBook() {
            let displayMode = false;
            if (this.$refs.bookcart) {
                this.$refs.bookcart.forEach(bookcart => {
                    if (bookcart.getDispayDateBook() === "flex") {
                        displayMode = true;
                    }
                });
            }
            return displayMode;
        }
    },
    mounted() {
        if (this.status === "reading") {
            this.title = "Читаю в данный момент";
        } else if (this.status === "wanttoread") {
            this.title = "Хочу прочитать";
        } else {
            this.title = "Закончил читать";
        }
    }
}
</script>

<template>
    <div style="componentStyle" :class="status">
        <h2>{{title}}</h2>
        <div class="books">
            <div v-if="booklist.length === 0" class="book_cart">
                <h3>В данный момент здесь пусто</h3>
            </div>
            <BookCart ref="bookcart" @update="updateBooksList" @delete="deleteBook" v-for="(book, index) in booklist" :key="index" :bookInList="book" :bookstatus="this.status">
            </BookCart>
        </div>
    </div>
</template>
