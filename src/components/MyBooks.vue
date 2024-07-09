<script>
import ReadingBlock from "./reading/ReadingBlock.vue";
import WantToRead from "./wantToRead/WantToRead.vue";
import FinishRead from "./finishRead/FinishRead.vue";

export default {
    name: "MyBooks",
    data() {
        return {
            readingList: [],
            wantToReadList: [],
            finishReadList: [],
            index: 0,
        }
    },
    components: {
        ReadingBlock,
        WantToRead,
        FinishRead
    },
    methods: {
        getElements() {
            return [
                this.$refs.readingblock,
                this.$refs.wanttoread,
                this.$refs.finishread
            ];
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
        updateBooksList(bookList, mode) {
            switch (mode) {
                case 1:
                    this.readingList = bookList;
                    this.$emit("update", this.readingList, mode);
                    break;
                case 2:
                    this.wantToReadList = bookList;
                    this.$emit("update", this.wantToReadList, mode);
                    break;
                case 3: {
                    this.finishReadList = bookList;
                    this.$emit("update", this.finishReadList, mode);
                    break;
                }
            }
            this.aloneComponent(this.getElements(), this.index);
        },
        addNewBook(book, mode) {
            switch (mode) {
                case 1:
                    this.readingList.push(book);
                    this.updateBooksList(this.readingList, 1);
                    break;
                case 2:
                    this.wantToReadList.push(book);
                    this.updateBooksList(this.wantToReadList, 2);
                    break;
                case 3:
                    this.finishReadList.push(book);
                    this.updateBooksList(this.finishReadList, 3);
                    break;
            }
        },
        setList(booklist, mode) {
            switch (mode) {
                case 1:
                    this.readingList = booklist;
                    break;
                case 2:
                    this.wantToReadList = booklist;
                    break;
                case 3:
                    this.finishReadList = booklist;
                    break;
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
            <ReadingBlock @update="updateBooksList" @add="addNewBook" ref="readingblock" :booklist="readingList"></ReadingBlock>
            <WantToRead @update="updateBooksList" @add="addNewBook" ref="wanttoread" :booklist="wantToReadList"></WantToRead>
            <FinishRead @update="updateBooksList" @add="addNewBook" ref="finishread" :booklist="finishReadList"></FinishRead>
        </div>
        <div class="arrows">
            <i @click="backBookCart" class="fa-solid fa-arrow-left"></i>
            <i @click="nextBookCart" class="fa-solid fa-arrow-right"></i>
        </div>
    </div>
</template>