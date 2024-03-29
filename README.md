# [![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=30&pause=1000&random=false&width=500&lines=React-Chess)](https://git.io/typing-svg)

![react-chess](https://github.com/ShnaiderDanila/react-ts-chess/assets/116545792/d29a0ab8-55af-48c7-8a73-5da58210306c)

## Описание проекта
**React-Chess** - это приложение для игры в шахматы, рассчитанное на 2-х игроков. Приложение написано на **React**, с использованием **TypeScript** и применением методологии **ООП**.

**Ссылка на проект:**
https://shnaiderdanila.github.io/react-ts-chess/

## Функциональность
Разработанные шахматы имеют классические правила. На странице расположена 64-клеточная доска, с шахматными фигурами, таймер для каждого из игроков, статистика побежденных фигур и кнопка перезапуска для начала новой игры.

Игра поддерживает следующие приёмы и варианты развития событий:
- Шах (Ситуация, когда король находится под боем, то есть под угрозой взятия на следующем ходу)
- Мат (Ситуация, когда король находится под шахом, и игрок не может сделать ни одного хода, чтобы его избежать)
- Проигрыш по истечению времени (Игрок, первый израсходовавший всё своё время, признаётся проигравшим независимо от положения в партии)
- Шахматы исключают возможность самостоятельно подставить короля под шах.
- Побежденные фигуры каждого игрока отображаются в специальной статистике.
- В случае завершения игры, игроки будут уведомлены о статусе игры всплывающим окном, появляющимся в центре экрана.

## Используемые технологии:
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) 
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## 🚀 Запуск проекта:

#### Клонировать репозиторий:
```
git clone https://github.com/ShnaiderDanila/react-ts-chess.git
```
#### Установить зависимости:
```
npm install
```
#### Запустить приложение:
```
npm run start
```

## Планы по доработке проекта:
Добавление новых шахматных приёмов и вариантов развития событий:
- Пат (Положение в игре, когда один из игроков не может сделать хода, не подставив под удар своего короля)
- Рокировка (Одновременный ход королём и ладьёй, при котором ладья придвигается к королю, а король ставится рядом по другую её сторону)
- Взятие на проходе (Специальный ход пешки, при котором она берёт пешку противника, перемещённую с начальной позиции сразу на два поля)

Исправление уже существуюших вариантов развития событий:
- Улучшение шаха (В случае шаха, для передвижения будут доступны только те фигуры, которые могут предотвратить опасность для своего короля)
- Улучшение мата (Добавить возможность предотвращения мата, с помощью союзной фигуры) 
- Исключение возможности самостоятельной подстановки короля под шах, передвижением союзной фигуры

## Автор

**Данила Шнайдер**

- E-mail: [d.shnder@gmail.com](mailto:d.shnder@gmail.com)
- Telegram: [@shnaider_danila](https://t.me/shnaider_danila)

