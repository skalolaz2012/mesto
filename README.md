# Проект: MESTO
[Ссылка на проект](https://skalolaz2012.github.io/mesto/)
### Обзор
* Интро
* Figma
* Картинки
* JS
* ООП
* Классы JS
* WebPack
* Методы Fetch, работа с сервером
* Deploy

**Интро**

Мой проект-аналог социальной сети в рамках обучения в Яндекс Практикум.
Проект подвергся глобальным изменениям и рефакторингу - весь функционал написан на классах.

**Figma**

* [Ссылка на макет в Figma](https://www.figma.com/file/PSdQFRHoxXJFs2FH8IXViF/JavaScript-9-sprint?node-id=0%3A1)

**Картинки**

6 карточек на сайт загружены с помощью массива и тега <template>. Помимо этого использовал сервис Unsplash для добавления новых карточек.

Проверка работы на PixelPerfect - обязательная практика.

**JS**

В данной работе используются модули js и в полной мере работает практика трех китов ООП - инкапсуляция, наследование и полиморфизм. 

**ООП**
Весь функционал проекта - прописан по правилам ООП на классах.

**Классы JS**
Все классы в работе работают самостоятельно, их можно переиспользовать. Все связи между классами реализованы мягкими принципами, исключая жёсткие связи.

**WebPack**
Проект собран сборщиком проектов WebPack, в работе используются технологии Babel - код JS подгоняется под возможности старых браузеров. Также настроена минификация CSS и PostCSS обработчкики (вендорные префиксы расставлены автоматически). Подключение файла index.js, который собирает в себя все модули происходит без записи в HTML файле, CSS подключается средствами JS, как и картинки.

**Методы Fetch, работа с сервером**
В ПР9 спринта 10 реализован функционал обработки запросов на сервер. Карточки отрисовываются, получая данные с сервера. Удаление карточек, лайки, редактирование профиля, включая аватар - теперь записывается на сервер и остаётся неизменным после перезагрузки страницы.

**Deploy**
Работа опубликована на портале github, в публикации задействована ветка gh-pages.