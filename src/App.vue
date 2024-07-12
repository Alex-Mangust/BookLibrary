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
        updateBooksList(bookList) {
            this.bookList = bookList;
            this.sentDataServer(bookList);
            this.$refs.myBooks.setList(bookList);
        },
        addBook(book) {
            this.serverBookList.push(book);
            this.updateBooksList(this.serverBookList);
            this.$refs.searchBooks.search(this.serverBookList);
        },
        deleteBook(title) {
            this.serverBookList = this.serverBookList.filter(book => book.title !== title);
            this.updateBooksList(this.serverBookList);
            this.$refs.searchBooks.search(this.serverBookList);
        },
        findBooksShow(filterBookList, mode) {
            this.$refs.myBooks.setList(filterBookList, mode);
            if (mode === "all") {
                const listFindBook = this.$refs.myBooks.getListsBook();
                let findIndex = 0;
                while (findIndex < listFindBook.length && listFindBook[findIndex].length === 0) {
                    findIndex++;
                }
                this.$refs.myBooks.aloneComponent(this.$refs.myBooks.getElements(), findIndex);
            } else {
                let modeShow = 0;
                if (mode == "wanttoread") {
                    modeShow = 1
                } else if (mode == "finishread") {
                    modeShow = 2;
                }
                this.$refs.myBooks.aloneComponent(this.$refs.myBooks.getElements(), modeShow);
            }
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
