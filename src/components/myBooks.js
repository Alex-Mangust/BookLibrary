import readingblock from "./reading/readingBlock.js";
import wanttoread from "./wantToRead/wantToRead.js";
import finishread from "./finishRead/finishRead.js";

export default {
    name: "mybooks",
    data() {
        return {
            readingList: [],
            wantToReadList: [],
            finishReadList: [],
            index: 0
        }
    },
    components: {
        readingblock,
        wanttoread,
        finishread
    },
    template: `
        <div class="main">
            <div class="my_books">
                <readingblock :booklist="readingList"></readingblock>
                <wanttoread :booklist="wantToReadList"></wanttoread>
                <finishread :booklist="finishReadList"></finishread>
            </div>
            <div class="arrows">
                <i @click="backBookCart" class="fa-solid fa-arrow-left"></i>
                <i @click="nexBookCart" class="fa-solid fa-arrow-right"></i>
            </div>
        </div>
    `,
    methods: {
        getElements() {
            const components = this.$children;
            return components;
        },
        aloneComponent(components, index = 0) {
            this.$nextTick(() => {  // Дожидаемся завершения рендеринга
                if (index >= components.length) {
                    index = 0;
                } else if (index < 0) {
                    index = components.length - 1;
                }
                
                for (let i = 0; i < components.length; i++) {
                    if (index === i) {
                        components[i].$el.style.display = 'flex';
                    } else {
                        components[i].$el.style.display = 'none';
                    }
                }
                this.index = index;
            });
        },
        nexBookCart() {
            this.aloneComponent(this.getElements(), ++this.index);
        },
        backBookCart() {
            this.aloneComponent(this.getElements(), --this.index);
        },
        updateBooksList(booksList, mode) {
            switch (mode) {
                case 1:
                    this.readingList = booksList;
                    break;
                case 2:
                    this.wantToReadList = booksList;
                    break;
                case 3: {
                    this.finishReadList = booksList;
                    break;
                }
            }
            this.$root.updateBooksList(booksList, mode);
        },
    },
    mounted() {
        this.readingList = this.$root.getReadingList();
        this.wantToReadList = this.$root.getWantToReadList();
        this.finishReadList = this.$root.getFinishReadList();
        this.aloneComponent(this.getElements(), this.index);
        // document.addEventListener("keyDown", () => {
        //     console.log("saas"); // Написать код, чтобы переключать вкладки с книгами с помощью нажатия стрелок на клавиатуре, а не только по клику мышкой на стрелки
        // });
    }
}