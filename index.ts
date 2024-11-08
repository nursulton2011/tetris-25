// Типы для фигур
interface Shape {
    shape: number[][];  // Массив, представляющий форму (матрица)
    color: string;      // Цвет формы
}

interface Position {
    x: number;  // Координата x
    y: number;  // Координата y
}

// Функция для рисования поля для тетриса
function drawTetrisPlayground(x: number, y: number, target: HTMLElement): void {
    if (x <= 0 || y <= 0) throw new Error('x and y must be greater than zero');

    for (let rowsCount = 0; rowsCount < y; rowsCount++) {
        const row = document.createElement('div');
        row.className = 'row';
        row.dataset['row'] = rowsCount.toString();

        for (let cellsCount = 0; cellsCount < x; cellsCount++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset['cell'] = cellsCount.toString();
            row.append(cell);
        }
        target.append(row);
    }
}

// Поиск элемента на странице для игрового поля
const tetrisPlaygroundTarget = document.querySelector('.tetris-playground') as HTMLElement;
const rowsCount: number = 20;
const columnsCount: number = 10;

// Проверка наличия элемента для игрового поля
if (tetrisPlaygroundTarget) {
    try {
        drawTetrisPlayground(columnsCount, rowsCount, tetrisPlaygroundTarget);
    } catch (e) {
        console.log((e as Error).message);
    }
} else {
    console.log("Tetris playground element not found");
}

// Описание фигур
const shapes: { [key: string]: Shape } = {
    S: { shape: [[0, 1, 1], [1, 1, 0]], color: 'yellowgreen' },
    Z: { shape: [[1, 1, 0], [0, 1, 1]], color: 'red' },
    T: { shape: [[1, 1, 1], [0, 1, 0]], color: 'purple' },
    O: { shape: [[1, 1], [1, 1]], color: 'yellow' },
    J: { shape: [[0, 1], [0, 1], [1, 1]], color: 'blue' },
    L: { shape: [[1, 0], [1, 0], [1, 1]], color: 'orange' },
    I: { shape: [[1], [1], [1], [1]], color: 'lightblue' }
};

let currentShape: Shape;
let shapePosition: Position = { x: 0, y: 0 };

// Функция для отрисовки фигуры
function renderShape(): void {
    console.log("Rendering shape at position:", shapePosition);
    console.log("Current shape:", currentShape);

    const rowsToColor = currentShape.shape.length;
    const cellsToColor = currentShape.shape[0].length;

    for (let rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {
        const targetRow = shapePosition.y + rowIndex;
        if (targetRow >= rowsCount) continue;

        const row = tetrisPlaygroundTarget.children[targetRow] as HTMLElement;
        for (let cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {
            const targetCell = shapePosition.x + cellIndex;
            if (targetCell >= columnsCount) continue;

            const cell = row.children[targetCell] as HTMLElement;
            cell.style.backgroundColor = currentShape.shape[rowIndex][cellIndex] ? currentShape.color : '';
            console.log(`Cell at row ${targetRow}, col ${targetCell} set to color ${cell.style.backgroundColor}`);
        }
    }
}

// Функция для удаления предыдущей фигуры
function removePreviousShape(): void {
    for (let row of tetrisPlaygroundTarget.children) {
        for (let cell of row.children) {
            (cell as HTMLElement).style.backgroundColor = '';
        }
    }
}

// Функция для поворота фигуры
function rotateShape(shape: number[][]): number[][] {
    console.log("Rotating shape:", shape);
    if (shape.length === 2 && shape[0].length === 2) return shape;

    const rotatedShape: number[][] = [];
    for (let rowsCount = 0; rowsCount < shape[0].length; rowsCount++) {
        rotatedShape.push([]);
    }

    for (let i = shape.length - 1, k = 0; i >= 0; i--, k++) {
        for (let j = 0; j < shape[0].length; j++) {
            rotatedShape[j][k] = shape[i][j];
        }
    }

    console.log("Rotated shape:", rotatedShape);
    return rotatedShape;
}

// Функция для создания новой фигуры
function spawnNewShape(): void {
    const shapeKeys = Object.keys(shapes);
    const shapeKeyIndex = Math.floor(Math.random() * shapeKeys.length);
    currentShape = shapes[shapeKeys[shapeKeyIndex]];
    shapePosition = { x: 0, y: 0 }; // Устанавливаем начальную позицию фигуры сверху
    console.log("New shape spawned:", currentShape);
    renderShape();
}

// Инициализация новой фигуры
spawnNewShape();

// Обработчик нажатия клавиш
document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.code === 'Space') {
        console.log("Space key pressed for rotation");
        currentShape.shape = rotateShape(currentShape.shape);
        removePreviousShape();
        renderShape();
    }
});
