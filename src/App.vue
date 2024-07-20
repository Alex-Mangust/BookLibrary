<script>
import MyBooks from "./components/MyBooks.vue";
import BookAdd from "./components/BookAdd.vue";
import SearchBooks from "./components/SearchBooks.vue";
export default {
    components: {
        MyBooks,
        BookAdd,
        SearchBooks
    },
    data() {
        return {
            title: "Личная библиотека",
            serverBookList: [],
            bookList: [],
        }
    },
    methods: {
        async updateBooksList(bookList) {
            this.bookList = bookList;
            this.sentDataServer(bookList);
            this.$refs.myBooks.setList(bookList);
        },
        async addBook(book) {
            this.serverBookList.push(book);
            await this.updateBooksList(this.serverBookList);
            this.$refs.searchBooks.search(this.serverBookList);
        },
        async deleteBook(title) {
            this.serverBookList = this.serverBookList.filter(book => book.title !== title);
            await this.updateBooksList(this.serverBookList);
            this.$refs.searchBooks.search(this.serverBookList);
        },
        findBooksShow(filterBookList, mode) {
            this.$refs.myBooks.setList(filterBookList, mode);
            const listFindBook = this.$refs.myBooks.getListsBook();
            const findIndex = listFindBook.findIndex(bookList => bookList.length > 0);
            this.$refs.myBooks.aloneComponent(this.$refs.myBooks.getElements(), findIndex >= 0 ? findIndex : this.getModeValue(mode));
        },
        getModeValue(mode) {
            const modeMap = {
                "wanttoread": 1,
                "finishread": 2
            };
            return modeMap[mode] || 0;
        },
        async getDataServer(path) {
            try {
                const fileName = `${path}.json`;
                const data = await window.get.getDataServer(fileName);
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
                return [];
            }
        },
        sentDataServer(newBookList) {
            const dataBookList = JSON.parse(JSON.stringify(newBookList));
            window.send.set(dataBookList);
        }
    },
    async mounted() {
        const app = this;
        window.addEventListener("keydown", (event) => {
            if (event.key == "ArrowRight") {
                if (!app.$refs.myBooks.getDispayDataBook() && !app.$refs.bookadd.getDispayBookAddMenu()) {
                    app.$refs.myBooks.nextBookCart();
                }
            }
            if (event.key == "ArrowLeft") {
                if (!app.$refs.myBooks.getDispayDataBook() && !app.$refs.bookadd.getDispayBookAddMenu()) {
                    app.$refs.myBooks.backBookCart();
                }
            }
            if (event.key == "Enter") {
                app.$refs.searchBooks.search(this.serverBookList);
            }
        });
        this.serverBookList = await this.getDataServer("dataBooks");
        this.booksList = this.serverBookList;
        this.updateBooksList(this.serverBookList);
    }
}
</script>

<template>
    <SearchBooks ref="searchBooks" @findShow="findBooksShow" :bookList="serverBookList"></SearchBooks>
    <h1 class="main_title">{{ title }}</h1>
    <MyBooks @delete="deleteBook" @update="updateBooksList" ref="myBooks"></MyBooks>
    <BookAdd ref="bookadd" @add="addBook"></BookAdd>
</template>
