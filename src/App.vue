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
            serverReadingList: [],
            serverWantToReadList: [],
            serverFinishReadList: [],
            readingList: [],
            wantToReadList: [],
            finishReadList: []
        }
    },
    methods: {
        updateBooksList(booksList, mode) {
            switch (mode) {
                case 1:
                    this.readingList = booksList;
                    this.sentDataServer("reading", booksList);
                    break;
                case 2:
                    this.wantToReadList = booksList;
                    this.sentDataServer("wanttoread", booksList);
                    break;
                case 3: {
                    this.finishReadList = booksList;
                    this.sentDataServer("finishread", booksList);
                    break;
                }
            }
            this.$refs.myBooks.setList(booksList, mode);
        },
        addBook(book, mode) {
            switch (mode) {
                case 1:
                    this.serverReadingList.push(book);
                    this.updateBooksList(this.serverReadingList, 1);
                    break;
                case 2:
                    this.serverWantToReadList.push(book);
                    this.updateBooksList(this.serverWantToReadList, 2);
                    break;
                case 3: {
                    this.serverFinishReadList.push(book);
                    this.updateBooksList(this.serverFinishReadList, 3);
                    break;
                }
            }
            this.$refs.searchBooks.search();
        },
        findBooksShow(filterReadingList, filterWantToReadList, filterFinishReadList, mode) {
            if (mode == "reading") {
                filterWantToReadList = [];
                filterFinishReadList = [];
            } else if (mode == "wanttoread") {
                filterReadingList = [];
                filterFinishReadList = [];
            } else if (mode == "finishread") {
                filterReadingList = [];
                filterWantToReadList = [];
            }
            this.readingList = filterReadingList;
            this.wantToReadList = filterWantToReadList;
            this.finishReadList = filterFinishReadList;
            this.$refs.myBooks.setList(this.readingList, 1);
            this.$refs.myBooks.setList(this.wantToReadList, 2);
            this.$refs.myBooks.setList(this.finishReadList, 3);
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
        sentDataServer(mode, newBookList) {
            const dataBookList = JSON.parse(JSON.stringify(newBookList));
            if (mode === "reading") {
                window.send.reading(dataBookList);
            } else if (mode === "wanttoread") {
                window.send.wantToRead(dataBookList);
            } else if (mode === "finishread") {
                window.send.finishRead(dataBookList);
            }
        }
    },
    async mounted() {
        const app = this;
        window.addEventListener("keydown", (event) => {
            if (event.key == "ArrowRight") {
                app.$refs.myBooks.nextBookCart();
            }
            if (event.key == "ArrowLeft") {
                app.$refs.myBooks.backBookCart();
            }
            if (event.key == "Enter") {
                app.$refs.searchBooks.search();
            }
        });
        this.serverReadingList = await this.getDataServer("reading");
        this.readingList = this.serverReadingList;
        this.updateBooksList(this.readingList, 1);
        this.serverWantToReadList = await this.getDataServer("want_to_read");
        this.wantToReadList = this.serverWantToReadList;
        this.updateBooksList(this.wantToReadList, 2);
        this.serverFinishReadList = await this.getDataServer("finish_read");
        this.finishReadList = this.serverFinishReadList;
        this.updateBooksList(this.finishReadList, 3);
    }
}
</script>

<template>
    <SearchBooks ref="searchBooks" @findShow="findBooksShow" :readingList="serverReadingList"
        :wantToReadList="serverWantToReadList" :finishReadList="serverFinishReadList"></SearchBooks>
    <h1>{{ title }}</h1>
    <MyBooks @update="updateBooksList" ref="myBooks"></MyBooks>
    <BookAdd @add="addBook"></BookAdd>
</template>
