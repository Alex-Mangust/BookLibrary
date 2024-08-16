<script>
import isEqual from 'lodash.isequal';
import SavingMenu from './SavingMenu.vue';

export default {
    name: "BookEditMenu",
    props: ["book"],
    data() {
        return {
            colorOpenButton: "",
            backgroundOpenButton: "",
            newBook: Object.assign({}, this.book)
        }
    },
    components: {
        SavingMenu
    },
    methods: {
        save() {
            this.editBook();
            this.$emit("update");
            this.newBook = Object.assign({}, this.book);
            this.$el.style.display = "none";
            this.$emit("show");
        },
        savingChoice(choice) {
            if (choice) {
                this.save();
            } else {
                this.newBook = Object.assign({}, this.book);
                this.$el.style.display = "none";
                this.$emit("show");
            }
            this.$emit("close");
        },
        saveWithClose() {
            if (!isEqual(this.book, this.newBook)) {
                this.$refs.savingMenu.showSavingMenu();
            } else {
                this.$el.style.display = "none";
                this.$emit("show");
                this.$emit("close");
            }
        },
        editBook() {
            if (this.book.title !== this.newBook.title) {
                this.book.title = this.newBook.title;
            }
            if (this.book.images !== this.newBook.images) {
                this.book.images = this.newBook.images;
            }
            if (this.book.description !== this.newBook.description) {
                this.book.description = this.newBook.description;
            }
            if (this.book.link !== this.newBook.link) {
                this.book.link = this.newBook.link;
            }
            if (this.book.status !== this.newBook.status) {
                this.book.status = this.newBook.status;
            }
        },
        async downoloadImage() {
            const filePaths = await window.api.openFileDialog();
            this.newBook.images = filePaths[0];
        }
    },
    mounted() {
        switch (this.newBook.status) {
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
    <div class="inside_edit_book_menu">
        <input :style="{ color: colorOpenButton, fontSize: `2em`, textAlign: `center` }" v-model="this.newBook.title"
            type="text" required>
        <div class="edit_img">
            <img :src="this.newBook.images" :alt="this.newBook.alt">
            <div>
                <input v-model="this.newBook.images" type="text">
                <button @click="downoloadImage">Или загрузите изображение</button>
            </div>
        </div>
        <div class="description_data_book">
            <textarea v-model="this.newBook.description"
                :style="{ width: '70%', height: '90%', color: colorOpenButton }"
                placeholder="Введите описание книги...">
            </textarea>
        </div>
        <div class="source">
            <label :style="{ color: colorOpenButton }">Источник:</label>
            <input v-model="this.newBook.link" type="text">
        </div>
        <select class="select_status_book" v-model="this.newBook.status">
            <option value="reading">Читаю</option>
            <option value="wanttoread">Хочу прочитать</option>
            <option value="finishread">Закончил читать</option>
        </select>
        <button @click.stop="save" class="add_book_button">Сохранить</button>
        <SavingMenu @saving="savingChoice" ref="savingMenu" :backgroundColor="this.colorOpenButton"></SavingMenu>
    </div>
</template>