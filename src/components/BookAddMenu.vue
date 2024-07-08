<script>
export default {
    name: "BookAddMenu",
    data() {
        return {
            bookTitle: "",
            bookDescription: "",
            bookImages: "",
            status: "none"
        }
    },
    methods: {
        addBook() {
            if (!this.bookTitle || this.status === 'none') {
                alert('Пожалуйста, заполните все поля.');
                return;
            }
            const newBook = {};
            newBook.title = this.bookTitle;
            newBook.alt = `Иконка книги ${this.bookTitle}`;
            if (this.bookDescription) {
                newBook.description = this.bookDescription;
            }
            if (this.bookImages) {
                newBook.images = this.bookImages;
            }
            switch (this.status) {
                case "reading":
                    this.$emit('add', newBook, 1);
                    break;
                case "wanttoread":
                    this.$emit('add', newBook, 2);
                    break;
                case "finishread":
                    this.$emit('add', newBook, 3);
                    break;
            }
            this.$refs.closeButton.click();
            this.clearData();
        },
        clearData() {
            this.bookTitle = '';
            this.bookDescription = '';
            this.bookImages = '';
            this.status = 'none';
        },
        closeAddBookMenu() {
            this.$parent.$el.classList.add("add_book_active");
            const element = this.$el;
            element.style.display = "none";
            this.clearData();
        },
        async downoloadImage() {
            const filePaths = await window.api.openFileDialog();
            this.bookImages = filePaths[0];
        }
    }
}
</script>

<template>
    <div class="add_book_menu">
        <div class="inside_add_book_menu">
            <div class="inputs">
                <div class="form-group">
                    <label>Введите название книги:</label>
                    <input v-model="bookTitle" type="text" required>
                </div>
                <div class="form-group">
                    <label>Введите описание книги:</label>
                    <input v-model="bookDescription" type="text">
                </div>
                <div class="form-group">
                    <label>Вставьте ссылку на обложку книги:</label>
                    <div>
                        <input v-model="bookImages" type="text">
                        <button @click="downoloadImage">Или загрузите изображение</button>
                    </div>
                </div>
            </div>
            <select class="select_status_book" v-model="status">
                <option value="none">Выберите статус</option>
                <option value="reading">Читаю</option>
                <option value="wanttoread">Хочу прочитать</option>
                <option value="finishread">Закончил читать</option>
            </select>
            <button @click.stop="addBook" class="add_book_button">Добавить</button>
            <button ref="closeButton" @click.stop="closeAddBookMenu" class="close_book_date">X</button>
        </div>
    </div>
</template>