import mybooks from "./components/myBooks.js";
import addbook from "./components/addBook.js";
import wantToRead from "./components/wantToRead/wantToRead.js";
const API_URL = 'http://localhost:5000';
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
            const response = await fetch(`${API_URL}/${path}`);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.log("Error connect");
                return []
            }
        },
        async sentDataServer(path, newBookList) {
            await fetch(`${API_URL}/${path}`, { // post - отправлять
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(newBookList)
            });
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
        this.wantToReadList = await this.getDataServer("wanttoread");
        this.$refs.myBooks.updateBooksList(this.wantToReadList, 2);
        this.finishReadList = await this.getDataServer("finishread");
        this.$refs.myBooks.updateBooksList(this.finishReadList, 3);
    }
});