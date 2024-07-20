<script>
export default {
    name: "BookEditMenu",
    props: ["book"],
    methods: {
        save() {
            this.$el.style.display = "none";
            this.$emit("show");
            this.$emit("update");
        },
    }
}
</script>

<template>
    <div class="inside_edit_book_menu">
        <div class="inputs">
            <div class="form-group">
                <label>Введите название книги:</label>
                <input v-model="this.book.title" type="text" required>
            </div>
            <div class="form-group">
                <label>Введите описание книги:</label>
                <input v-model="this.book.description" type="text">
            </div>
            <div class="form-group">
                <label>Вставьте ссылку на источник книги:</label>
                <input v-model="this.book.link" type="text">
            </div>
            <div class="form-group">
                <label>Вставьте ссылку на обложку книги:</label>
                <div>
                    <input v-model="this.book.images" type="text">
                    <button @click="downoloadImage">Или загрузите изображение</button>
                </div>
            </div>
        </div>
        <select class="select_status_book" v-model="this.book.status">
            <option value="none">Выберите статус</option>
            <option value="reading">Читаю</option>
            <option value="wanttoread">Хочу прочитать</option>
            <option value="finishread">Закончил читать</option>
        </select>
        <button @click.stop="save" class="add_book_button">Сохранить</button>
    </div>
</template>