// Создание ячеек
let cell = document.querySelector('.cell_container');

for(let i = 0; i < 9; i++) {
    cell.innerHTML += `
    <div class="cell" id="data-set-cell-${i}"></div>
    `
};

let step = '';
let winner = '';
let counter = 0;
let whoSpan = document.querySelector('.who_Span');
let whoWinner = document.querySelector('.who_winner');
let spanWinner = document.querySelector('.span_winner');
let restart = document.querySelector('.restart');
let field = document.querySelector('.field');
let cells = document.querySelectorAll('.cell');

// Массив для проверкт выйгрышных комбинаций
const WIN = 
[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];

// Функция чей ход
let who = () => {
    if(step == 'crosses') {
        step = 'zeroes'
        whoSpan.innerHTML = 'Ноликки'
    } else {
        step = 'crosses'
        whoSpan.innerHTML = 'Крестики'
    }
};
who();

// События по клику на ячейку
cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        if(!cell.classList.contains('crosses') && !cell.classList.contains('zeroes')) {
            cell.classList.add(step)
            if(step == 'crosses') {
                cell.innerHTML = 'X'
            } else {
                cell.innerHTML = 'O'
            }
        }
        counter++
        who()
        zeroesWinning()
        crossesWinning()
        draw()
    })
});

// Функция проверки выйгрыша крестика
let crossesWinning = () => {
    for(let i = 0; i < WIN.length; i++) {
        if(
        cells[WIN[i][0]].classList.contains('crosses') &&
        cells[WIN[i][1]].classList.contains('crosses') &&
        cells[WIN[i][2]].classList.contains('crosses')
        ) {
            cells[WIN[i][0]].classList.add('winner_color')
            cells[WIN[i][1]].classList.add('winner_color')
            cells[WIN[i][2]].classList.add('winner_color')
            winner = ' Крестики'
            endGame(winner)
            return 1
        }
    }
};

// Функция проверки выйгрыша нолика
let zeroesWinning = () => {
    for(let i = 0; i < WIN.length; i++) {
        if(
        cells[WIN[i][0]].classList.contains('zeroes') &&
        cells[WIN[i][1]].classList.contains('zeroes') &&
        cells[WIN[i][2]].classList.contains('zeroes')
        ) {
            cells[WIN[i][0]].classList.add('winner_color')
            cells[WIN[i][1]].classList.add('winner_color')
            cells[WIN[i][2]].classList.add('winner_color')
            winner = ' Нолики'
            endGame(winner)
            return 1
        }
    }
};

// Функция проверки ничьей
let draw = () => {
    if(!zeroesWinning() && ! crossesWinning() && (counter >= 9)) {
        winner = 'Ничья'
        endGame(winner)
    }
};

// Функция конец игры
let endGame = (winner) => {
    field.style.pointerEvents = 'none'
    whoWinner.style.display = 'flex'
    spanWinner.innerHTML = winner
};

// Функция перезапуска
restart.addEventListener('click', () => {
    document.location.reload()
});