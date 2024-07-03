import addbookmenu from "./addBookMenu.js";
export default {
    name: "addbook",
    components: {
        addbookmenu
    },
    template: `
        <div class="add_book add_book_active" @click="addBook">
            <img src="./img/addBookImage.png" alt="Иконка 'Добавить новую книгу'">
            <p>Добавить новую книгу</p>
            <addbookmenu></addbookmenu>
        </div>
    `, 
    methods: {
        addBook() {
            const addBookMenu = this.$children[0].$el;
            const computedStyle = window.getComputedStyle(addBookMenu);
            if (computedStyle.display == "none") {
                addBookMenu.style.display = "flex";
                this.$el.classList.remove("add_book_active");
            }
        }
    },
}