export default {
    name: "addbookmenu",
    data() {
        return {
            bookTitle: "",
            bookDescription: "",
            bookImages: "",
            status: "none"
        }
    },
    template: `
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
                        <input v-model="bookImages" type="text">
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
    `,
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
                    this.$root.getReadingList().push(newBook);
                    break;
                case "wanttoread":
                    this.$root.getWantToReadList().push(newBook);
                    break;
                case "finishread":
                    this.$root.getFinishReadList().push(newBook);
                    break;
            }
            // this.$el.querySelector(".close_book_date").click();
            this.$refs.closeButton.click();
            this.clearData();
        },
        clearData() {
            this.bookTitle = '';
            this.bookDescription = '';
            this.bookImages = '';
            this.status = 'none';
        },
        closeAddBookMenu(event) {
            // if (event || event.stopPropagation) {
            //     event.stopPropagation();
            // }
            const element = this.$el;
            element.style.display = "none";
            this.clearData();
        }
    }
}