// import readingblock from "./components/reading/readingBlock.js";
// import wanttoread from "./components/wantToRead/wantToRead.js";
// import finishread from "./components/finishRead/finishRead.js";
import mybooks from "./components/myBooks.js";
import addbook from "./components/addBook.js";
new Vue({
    el: "#app",
    components: {
        // readingblock,
        // wanttoread,
        // finishread,
        mybooks,
        addbook
    },
    data: {
        title: "Личная библиотека",
        readingList: [
            {images: "./img/booksImages/идеальныйМирДляЛекаря.jpg" , title: "Идеальный мир для лекаря", alt: "Иконка книги 'Идеальный мир для лекаря'"},
            {images: "./img/booksImages/впнт.jpg" , title: "Вы призвали не того", alt: "Иконка книги 'Вы призвали не того'"},
        ],
        wantToReadList: [
            {images: "./img/booksImages/сыныАида.jpg" , title: "Сыны Аида", alt: "Иконка книги 'Сыны Аида'"},
            {images: "./img/booksImages/МирНеОправдавшийМоихОжиданий.jpg" , title: "Мир, не оправдавший моих ожиданий", alt: "Иконка книги 'Мир, не оправдавший моих ожиданий'"},
        ],
        finishReadList: [
            {images: "./img/booksImages/этоМыНеПроходили.jpg" , title: "Это мы не проходили...", alt: "Иконка книги 'Это мы не проходили...'"},
            {images: "./img/booksImages/брд.jpg" , title: "Бастард рода демонов", alt: "Иконка книги 'Бастард рода демонов'"},
        ]
    },
    methods: {
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
        },
        getReadingList() {
            return this.readingList;
        },
        getWantToReadList() {
            return this.wantToReadList;
        },
        getFinishReadList() {
            return this.finishReadList;
        },
    },
    mounted() {
        // document.querySelectorAll(".book_cart").forEach(boodCart => {
        //     boodCart.addEventListener("mouseover", () => {
        //         boodCart.querySelector(".book_cart_buttons").style.visibility = "visible";
        //     });
        //     boodCart.addEventListener("mouseout", () => {
        //         boodCart.querySelector(".book_cart_buttons").style.visibility = "hidden";
        //     });
        // });
    }
});