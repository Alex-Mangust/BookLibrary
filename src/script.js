import mybooks from "./components/MyBooks.vue";
import addbook from "./components/addBook.Vue";
import wantToRead from "./components/wantToRead/wantToRead.js";
// const API_URL = 'http://localhost:5000';
new Vue({
    el: "#app",
    components: {
        mybooks,
        addbook,
    },
    data: {
        title: "Личная библиотека",
        readingList: [],
        wantToReadList: [],
        finishReadList: []
    },
    watch: {
        readingList(newData) {
            this.sentDataServer("reading", newData);
        },
        wantToReadList(newData) {
            this.sentDataServer("wanttoread", newData);
        },
        finishReadList(newData) {
            this.sentDataServer("finishread", newData);
        }
    },
    methods: {
        updateBooksList(booksList, mode) {
            switch (mode) {
                case 1:
                    this.readingList = booksList;
                    break;
                case 2:
                    this.wantToReadList = booksList;
                    break;
                case 3: {
                    this.finishReadList = booksList;
                    break;
                }
            }
        },
        getReadingList() {
            return this.readingList;
        },
        getWantToReadList() {
            return this.wantToReadList;
        },
        getFinishReadList() {
            return this.finishReadList;
        },
        async getDataServer(path) {
            try {
                const fileName = `${path}.json`; // Имя файла
                const data = await window.get.getDataServer(fileName);
                // console.log('Data received:', data);
                return data;
            } catch (error) {
                console.error('Error fetching data:', error);
                return [];
            }
        },
        async sentDataServer(mode, newBookList) {
            if (mode === "reading") {
                window.send.reading(newBookList);
            } else if (mode === "wanttoread") {
                window.send.wantToRead(newBookList);
            } else if (mode === "finishread") {
                window.send.finishRead(newBookList);
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
        this.$refs.myBooks.updateBooksList(this.readingList, 1);
        this.wantToReadList = await this.getDataServer("want_to_read");
        this.$refs.myBooks.updateBooksList(this.wantToReadList, 2);
        this.finishReadList = await this.getDataServer("finish_read");
        this.$refs.myBooks.updateBooksList(this.finishReadList, 3);
    }
});