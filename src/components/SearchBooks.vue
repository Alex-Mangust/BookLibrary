<script>
export default {
    name: "SearchBook",
    props: ["bookList"],
    data() {
        return {
            searchLine: "",
            filterBookList: [],
            modeFilter: "all",
            mainSearchBookList: this.bookList
        }
    },
    methods: {
        search(bookList = this.bookList) {
            let regSearch;
            this.mainSearchBookList = bookList;
            if (this.searchLine != "") {
                regSearch = new RegExp("^" + this.searchLine + "+?", "i");
            } else {
                regSearch = new RegExp(this.searchLine, "i");
            }
            this.filterBookList = this.mainSearchBookList.filter(book => regSearch.test(book.title));
            this.$emit("findShow", this.filterBookList, this.modeFilter);
        },
        resetSearch() {
            this.searchLine = "";
            this.modeFilter = "all";
            console.log(this.searchLine);
            this.search();
        }
    }
}

</script>

<template>
    <div class="search_books">
        <div>
            <input v-model="searchLine" type="text">
            <button @click="() => search()">Поиск</button>
        </div>
        <div class="search_criteria">
            <select v-model="modeFilter">
                <option value="all">Искать везде</option>
                <option value="reading">Искать в блоке "Читаю"</option>
                <option value="wanttoread">Искать в блоке "Хочу прочитать"</option>
                <option value="finishread">Искать в блоке "Закончил читать"</option>
            </select>
            <button @click="() => resetSearch()">Сбросить поиск</button>
        </div>
    </div>
</template>