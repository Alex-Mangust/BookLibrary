<script>
import MyBooks from "./components/MyBooks.vue";
import BookAdd from "./components/BookAdd.vue";

export default {
    components: {
        MyBooks,
        BookAdd,
    },
    data() {
        return {
            title: "Личная библиотека",
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
                    this.readingList.push(book);
                    this.updateBooksList(this.readingList, 1);
                    break;
                case 2:
                    this.wantToReadList.push(book);
                    this.updateBooksList(this.wantToReadList, 2);
                    break;
                case 3: {
                    this.finishReadList.push(book);
                    this.updateBooksList(this.finishReadList, 3);
                    break;
                }
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
        async sentDataServer(mode, newBookList) {
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
        });
        this.readingList = await this.getDataServer("reading");
        this.updateBooksList(this.readingList, 1);
        this.wantToReadList = await this.getDataServer("want_to_read");
        this.updateBooksList(this.wantToReadList, 2);
        this.finishReadList = await this.getDataServer("finish_read");
        this.updateBooksList(this.finishReadList, 3);
    }
}
</script>

<template>
    <h1>{{ title }}</h1>
    <MyBooks @update="updateBooksList" ref="myBooks"></MyBooks>
    <BookAdd @add="addBook"></BookAdd>
</template>
