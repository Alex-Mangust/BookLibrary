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
        addInReadingList(book) {
            this.$emit('reading', book);
        },
        addInWantToReadList(book) {
            this.$emit('wanttoread', book);
        },
        addInFinishReadList(book) {
            this.$emit('finishread', book);
        },
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
        <BookAddMenu @reading="addInReadingList" @wanttoread="addInWantToReadList" @finishread="addInFinishReadList" ref="bookaddmenu"></BookAddMenu>
    </div>
</template>