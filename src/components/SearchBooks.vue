<script>
export default {
    name: "SearchBook",
    props: ["readingList", "wantToReadList", "finishReadList"],
    data() {
        return {
            searchLine: "",
            filterReadingList: [],
            filterWantToReadList: [],
            filterFinishReadList: [],
            modeFilter: "all"
        }
    },
    methods: {
        search() {
            let regSearch;
            if (this.searchLine != "") {
                regSearch = new RegExp("^" + this.searchLine + "+?", "i");
            } else {
                regSearch = new RegExp(this.searchLine, "i");
            }
            if (this.modeFilter === "all" || this.modeFilter === "reading") {
                this.filterReadingList = this.readingList.filter(book => regSearch.test(book.title));
            }
            if (this.modeFilter === "all" || this.modeFilter === "wanttoread") {
                this.filterWantToReadList = this.wantToReadList.filter(book => regSearch.test(book.title));
            }
            if (this.modeFilter === "all" || this.modeFilter === "finishread") {
                this.filterFinishReadList = this.finishReadList.filter(book => regSearch.test(book.title));
            }
            this.$emit("findShow", this.filterReadingList, this.filterWantToReadList, this.filterFinishReadList, this.modeFilter);
        },
        resetSearch() {
            this.searchLine = "";
            this.modeFilter = "all";
            this.search();
        }
    }
}

</script>

<template>
    <div class="search_books">
        <div>
            <input v-model="searchLine" type="text">
            <button @click="search">Поиск</button>
        </div>
        <div class="search_criteria">
            <select v-model="modeFilter">
                <option value="all">Искать везде</option>
                <option value="reading">Искать в блоке "Читаю"</option>
                <option value="wanttoread">Искать в блоке "Хочу прочитать"</option>
                <option value="finishread">Искать в блоке "Закончил читать"</option>
            </select>
            <button @click="resetSearch">Сбросить поиск</button>
        </div>
    </div>
</template>