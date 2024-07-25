<script>
export default {
    name: "BookEditMenu",
    props: ["book"],
    data() {
        return {
            colorOpenButton: "",
            backgroundOpenButton: ""
        }
    },
    methods: {
        save() {
            this.$el.style.display = "none";
            this.$emit("show");
            this.$emit("update");
        },
        async downoloadImage() {
            const filePaths = await window.api.openFileDialog();
            this.book.images = filePaths[0];
        }
    },
    mounted() {
        switch (this.book.status) {
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
        <input :style="{ color: colorOpenButton, fontSize: `2em`, textAlign: `center` }" v-model="this.book.title"
            type="text" required>
        <div class="edit_img">
            <img :src="this.book.images" :alt="this.book.alt">
            <div>
                <input v-model="this.book.images" type="text">
                <button @click="downoloadImage">Или загрузите изображение</button>
            </div>
        </div>
        <div class="description_data_book">
            <textarea v-model="this.book.description" :style="{ width: '70%', height: '90%', color: colorOpenButton }"
                placeholder="Введите описание книги...">
            </textarea>
        </div>
        <div class="source">
            <label :style="{color: colorOpenButton}">Источник:</label>
            <input v-model="this.book.link" type="text">
        </div>
        <select class="select_status_book" v-model="this.book.status">
            <option value="reading">Читаю</option>
            <option value="wanttoread">Хочу прочитать</option>
            <option value="finishread">Закончил читать</option>
        </select>
        <button @click.stop="save" class="add_book_button">Сохранить</button>
    </div>
</template>