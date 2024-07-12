<script>
import BookBlock from "./BookBlock.vue";

export default {
    name: "MyBooks",
    data() {
        return {
            mainBookList: [],
            readingList: [],
            wantToReadList: [],
            finishReadList: [],
            index: 0,
        }
    },
    components: {
        BookBlock,
    },
    methods: {
        getElements() {
            return [
                this.$refs.reading,
                this.$refs.wanttoread,
                this.$refs.finishread
            ];
        },
        getListsBook() {
            return [
                this.readingList,
                this.wantToReadList,
                this.finishReadList
            ]
        },
        aloneComponent(components, index = 0) {
            this.$nextTick(() => {  // Дожидаемся завершения рендеринга
                if (index >= components.length) {
                    index = 0;
                } else if (index < 0) {
                    index = components.length - 1;
                }

                for (let i = 0; i < components.length; i++) {
                    if (index === i) {
                        components[i].$el.style.display = 'flex';
                    } else {
                        components[i].$el.style.display = 'none';
                    }
                }
                this.index = index;
            });
        },
        nextBookCart() {
            setTimeout(() => {
                this.aloneComponent(this.getElements(), ++this.index);
            }, 300);
        },
        backBookCart() {
            setTimeout(() => {
                this.aloneComponent(this.getElements(), --this.index);
            }, 300);
        },
        updateBooksList(bookList) {
            this.$emit("update", bookList);
            this.aloneComponent(this.getElements(), this.index);
        },
        addNewBook(book) {
            this.mainBookList.push(book);
            this.updateBooksList(this.mainBookList);
        },
        deleteBook(title) {
            this.$emit("delete", title);
        },
        setList(booklist, mode = "all") {
            this.mainBookList = booklist;
            this.readingList = [];
            this.wantToReadList = [];
            this.finishReadList = [];
            this.mainBookList.forEach(book => {
                switch (book.status) {
                    case "reading":
                        if (mode === "all" || mode === book.status) {
                            this.readingList.push(book);
                        }
                        break;
                    case "wanttoread":
                        if (mode === "all" || mode === book.status) {
                            this.wantToReadList.push(book);
                        }
                        break;
                    case "finishread":
                        if (mode === "all" || mode === book.status) {
                            this.finishReadList.push(book);
                        }
                        break;
                }
            });
        },
        getDispayDataBook() {
            if (this.index === 0) {
                return this.$refs.reading.getDispayDataBook()
            } else if (this.index === 1) {
                return this.$refs.wanttoread.getDispayDataBook();
            } else {
                return this.$refs.finishread.getDispayDataBook();
            }
        }
    },
    mounted() {
        this.aloneComponent(this.getElements(), this.index);
    }
}
</script>

<template>
    <div class="main">
        <div class="my_books">
            <BookBlock @delete="deleteBook" @add="addNewBook" ref="reading" :booklist="readingList"
                :status="'reading'"></BookBlock>
            <BookBlock @delete="deleteBook" @add="addNewBook" ref="wanttoread" :booklist="wantToReadList"
                :status="'wanttoread'"></BookBlock>
            <BookBlock @delete="deleteBook" @add="addNewBook" ref="finishread" :booklist="finishReadList"
                :status="'finishread'"></BookBlock>
        </div>
        <div class="arrows">
            <i @click="backBookCart" class="fa-solid fa-arrow-left"></i>
            <i @click="nextBookCart" class="fa-solid fa-arrow-right"></i>
        </div>
    </div>
</template>