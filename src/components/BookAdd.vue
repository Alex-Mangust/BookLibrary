<script>
import BookAddMenu from "./BookAddMenu.vue";
export default {
    name: "BookAdd",
    data() {
        return {
            iconUrl: ""
        }
    },
    components: {
        BookAddMenu
    },
    methods: {
        addBook() {
            const addBookMenu = this.$refs.bookaddmenu.$el;
            const computedStyle = window.getComputedStyle(addBookMenu);
            if (computedStyle.display == "none") {
                addBookMenu.style.display = "flex";
                this.$el.classList.remove("add_book_active");
            }
        },
        addInBookList(book, mode) {
            this.$emit('add', book, mode);
        },
        getDispayBookAddMenu() {
            const addBookMenu = this.$refs.bookaddmenu.$el;
            const computedStyle = window.getComputedStyle(addBookMenu);
            if (computedStyle.display == "none") {
                return false;
            } else {
                return true;
            }
        }
    },
    async mounted() {
        try {
            this.iconUrl = await window.get.getIcon();
        } catch {
            this.iconUrl = ""
        }
    }
}
</script>

<template>
    <div class="add_book add_book_active" @click="addBook">
        <img :src="iconUrl" alt="Иконка 'Добавить новую книгу'">
        <p>Добавить новую книгу</p>
        <BookAddMenu @add="addInBookList" ref="bookaddmenu"></BookAddMenu>
    </div>
</template>