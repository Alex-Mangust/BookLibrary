import mybooks from "./components/myBooks.js";
import addbook from "./components/addBook.js";
new Vue({
    el: "#app",
    components: {
        mybooks,
        addbook,
    },
    data: {
        title: "Личная библиотека",
        readingList: [
            {images: "./img/booksImages/идеальныйМирДляЛекаря.jpg" , title: "Идеальный мир для лекаря", alt: "Иконка книги 'Идеальный мир для лекаря'", description: "Всю свою жизнь я посвятил изучению целительского мастерства, стал лучшим, самым сильным лекарем в своем мире... Но брат почему-то решил, что я буду претендовать на его трон и привел свое войско. Впрочем, неважно, всё равно уже давно собирался провести этот ритуал, и теперь... Я в другом мире? В теле какого-то юнца? И что значит лекарь здесь - это самый убогий дар? Вы просто не умеете обращаться с силой. Но я покажу, как надо..."},
            {images: "./img/booksImages/впнт.jpg" , title: "Вы призвали не того", alt: "Иконка книги 'Вы призвали не того'", description: "Меня призвали. Мир этот населен разной фэнтезийной хренью, чаще всего очень опасной для людей. Вот король этих самых людишек от меня и требует этих тварей по-быстрому вырезать. Кому понравиться устраивать геноцид по приказу старого хмыря в короне, которому ты нихрена не должен? Может какой узкоглазый педофил-импотент и согласится, но меня с такой работки увольте. Ну, или я сам уволюсь. Вот щас прокачаюсь и дам от этого короля по съе..."},
        ],
        wantToReadList: [
            {images: "./img/booksImages/сыныАида.jpg" , title: "Сыны Аида", alt: "Иконка книги 'Сыны Аида'", description: "Представьте мир, где боги реальны. Современный мир. Зевс, молнии, кабельное ТВ и покер с однорогим минотавром… Ну как, представили? Так вот. Я тут живу. Раньше медиум, убийца и просто хороший парень из Петербурга, теперь — Наследник Благородного Дома. Адриан Лекс, приятно познакомиться. Тело шестнадцатилетнего дохляка, Глава Дома мечтает удавить меня в постели, а первый же одноклассник так и норовит с размаха зарядить в челюсть. Ну или если коротко — типичный вторник. Ну а кто сказал, что у бастарда Аида должна быть легкая жизнь?"},
            {images: "./img/booksImages/МирНеОправдавшийМоихОжиданий.jpg" , title: "Мир, не оправдавший моих ожиданий", alt: "Иконка книги 'Мир, не оправдавший моих ожиданий'", description: "Добро пожаловать в сказку, которая стала безумным и беспощадным кошмаром; мир, где короли выглядят как последние уголовники, а кондитерские изделия могут тебя сожрать. Добро пожаловать на охоту, где главной добычей будешь ты, где твоей смерти желают герои, авантюристы и даже целое королевство. Не пытайся понять этот мир, у него своя атмосфера и свои правила. Лишь беги, прячься или сражайся всеми доступными методами, пытаясь сохранить рассудок. Но… Как далеко ты готов зайти, чтобы выжить в мире, где тебе не рады?"},
        ],
        finishReadList: [
            {images: "./img/booksImages/этоМыНеПроходили.jpg" , title: "Это мы не проходили...", alt: "Иконка книги 'Это мы не проходили...'", description: "Упал, очнулся, попал. Всё как всегда. Молодой парень в магическом мире. Но не в теле эльфийского дворянина, а в страшном уёжище в разгаре кровавого побоища. Пошаманив со своими силами, он понимает, что может переселяться в других. Но не все же так просто, правда? «Попаданство» с эльфийками без радуги в кишках. Cоединяем атмосферу, где главному герою хочется сопереживать, с юмором и трэшом. Беременным(,) детям и тонким натурам читать противопоказано. Акцент сюжета не на постельных сценах и гендерных сомнениях."},
            {images: "./img/booksImages/брд.jpg" , title: "Бастард рода демонов", alt: "Иконка книги 'Бастард рода демонов'", description: "Меч, дракон и возможность путешествовать по мирам — что еще нужно, чтобы сбежать от явившихся за моей головой магов? Тем почему-то не понравилось, что мой биологический отец оказался демоном. Пожалуй, ещё не помешает умение правильно выбирать дорогу... В путь!"},
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
        const app = this;
        window.addEventListener("keydown", (event) => {
            if (event.key == "ArrowRight") {
                app.$refs.myBooks.nextBookCart();
            }
            if (event.key == "ArrowLeft") {
                app.$refs.myBooks.backBookCart();
            }
        });
    }
});