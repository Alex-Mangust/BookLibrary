export default {
    name: "addbook",
    template: `
        <div class="add_book" @click="addBook">
            <img src="../img/addBookImage.png" alt="Иконка 'Добавить новую книгу'">
            <p>Добавить новую книгу</p>
        </div>
    `, 
    methods: {
        addBook() {
            console.log("New book");
        }
    }
}