<script>
import BookEditMenu from './BookEditMenu.vue';
export default {
    name: "DataBook",
    props: ["book", "status", "displayMode", "bookIndex"],
    data() {
        return {
            bookStatus: this.status,
            colorOpenButton: "",
            backgroundOpenButton: ""
        }
    },
    components: {
        BookEditMenu
    },
    methods: {
        closeBookData() {
            if (getComputedStyle(this.$refs.bookEdit.$el).display === "flex") {
                this.$refs.bookEdit.save();
            }
            this.$el.style.display = "none";
            this.$emit("displayOff");
        },
        changeBookStatus() {
            this.$emit("delete");
            this.book.status = this.bookStatus;
            this.updateBook();
        },
        updateBook() {
            this.$emit("update", this.book);
        },
        openLink() {
            const vereficationUrl = new RegExp("^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$");
            if (vereficationUrl.test(this.book.link)) {
                window.link.openLink(this.book.link);
            } else {
                alert("У книги отсутсвует источник или же вы предоставили неверный адрес.");
            }
        },
        editBook() {
            this.$el.querySelector(".inside_data_book").style.display = "none";
            this.$refs.bookEdit.$el.style.display = "flex";
        }, 
        showDataBook() {
            this.$el.querySelector(".inside_data_book").style.display = "flex";
            this.bookStatus = this.book.status;
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
    <div class="data_book">
        <button @click.stop="closeBookData" class="close_book_data">X</button>
        <div class="inside_data_book">
            <h1>{{ book.title }}</h1>
            <img :src="book.images" :alt="book.alt">
            <div class="description_data_book">
                <p>{{ book.description }}</p>
            </div>
            <button class="open_link_button" @click="openLink"
                :style="{ backgroundColor: backgroundOpenButton, color: colorOpenButton }">Открыть источник</button>
            <select v-model="bookStatus" @change="changeBookStatus">
                <option value="reading">Читаю</option>
                <option value="wanttoread">Хочу прочитать</option>
                <option value="finishread">Закончил читать</option>
            </select>
            <button @click="editBook" class="edit">Редактировать</button>
        </div>
        <BookEditMenu @update="updateBook" @show="showDataBook" ref="bookEdit" :book="this.book"></BookEditMenu>
    </div>
</template>