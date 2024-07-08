<script>
// import { app, vm } from "../main.js"
export default {
    name: "DateBook",
    props: ["book", "status"],
    data() {
        return {
            bookStatus: this.status
        }
    },
    methods: {
        closeBookDate() {
            this.$el.style.display = "none";
        },
        changeBookStatus() {
            this.$emit("delete");
            switch (this.bookStatus) {
                case "reading":
                    this.$emit("update", this.book, 1);
                    break;
                case "wanttoread":
                    this.$emit("update", this.book, 2);
                    break;
                case "finishread":
                    this.$emit("update", this.book, 3);
                    break;
            }
        }
    }
}
</script>

<template>
    <div class="date_book">
        <div class="inside_date_book">
            <h1>{{ book.title }}</h1>
            <img :src="book.images" :alt="book.alt">
            <p>{{ book.description }}</p>
            <select v-model="bookStatus" @change="changeBookStatus">
                <option value="reading">Читаю</option>
                <option value="wanttoread">Хочу прочитать</option>
                <option value="finishread">Закончил читать</option>
            </select>
            <button @click="closeBookDate" class="close_book_date">X</button>
        </div>
    </div>
</template>