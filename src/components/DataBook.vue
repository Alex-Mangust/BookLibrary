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
                this.$refs.bookEdit.saveWithClose();
            } else {
                this.$el.style.display = "none";
                this.$emit("displayOff");
            }
        },
        changeBookStatus() {
            this.book.status = this.bookStatus;
            this.updateBook();
        },
        updateBook() {
            this.$emit("delete");
            this.book.alt = `Иконка книги ${this.book.title}`;
            this.$emit("update", this.book);
        },
        openLink() {
            const vereficationUrl = new RegExp("^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$");
            if (vereficationUrl.test(this.book.link)) {
                const checkProtocol = new RegExp("^https?://.+");
                if (checkProtocol.test(this.book.link)) {
                    window.link.openLink(this.book.link);
                } else {
                    window.link.openLink(`http://${this.book.link}`);
                }
            } else {
                if (confirm("Не удалось открыть источник. Хотите произвести поиск книги в интернете?")) {
                    const searchQuery = `Читать книгу "${this.book.title}"`;
                    window.link.openLink(`https://yandex.ru/search/?text=${encodeURIComponent(searchQuery)}`);
                }
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
            <svg :style="{ color: colorOpenButton }" class="edit" @click="editBook" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H9M15 5H17C18.1046 5 19 5.89543 19 7V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M14.902 20.3343L12.7153 20.7716L13.1526 18.585C13.1914 18.3914 13.2865 18.2136 13.4261 18.074L17.5 14L19.5 12L21.4869 13.9869L19.4869 15.9869L15.413 20.0608C15.2734 20.2004 15.0956 20.2956 14.902 20.3343Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
          </svg>
        </div>
        <BookEditMenu @close="closeBookData" @update="updateBook" @show="showDataBook" ref="bookEdit" :book="this.book"></BookEditMenu>
    </div>
</template>