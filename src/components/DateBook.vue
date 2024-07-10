<script>
export default {
    name: "DateBook",
    props: ["book", "status", "displayMode"],
    data() {
        return {
            bookStatus: this.status,
            colorOpenButton: "",
            backgroundOpenButton: ""
        }
    },
    methods: {
        closeBookDate() {
            this.$el.style.display = "none";
            this.$emit("displayOff");
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
        },
        openLink() {
            window.link.openLink(this.book.link);
        }
    },
    mounted() {
        switch (this.bookStatus) {
            case "reading":
                this.backgroundOpenButton = "rgb(127, 255, 212)";
                this.colorOpenButton = "#008500";
                break;
            case "wanttoread":
                this.backgroundOpenButton = "rgb(139, 0, 0)";
                this.colorOpenButton = "#FF4040	";
                break;
            case "finishread":
                this.backgroundOpenButton = "rgb(222, 184, 135)";
                this.colorOpenButton = "#BF7A30";
                break;
            default:
                this.backgroundOpenButton = "white";
                this.colorOpenButton = "black";
                break;
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
            <button class="open_link_button" @click="openLink" :style="{backgroundColor: backgroundOpenButton, color: colorOpenButton}">Открыть источник</button>
            <button @click="closeBookDate" class="close_book_date">X</button>
        </div>
    </div>
</template>