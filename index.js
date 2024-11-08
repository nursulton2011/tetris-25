// Функция для рисования поля для тетриса
function drawTetrisPlayground(x, y, target) {
    if (x <= 0 || y <= 0)
        throw new Error('x and y must be greater than zero');
    for (var rowsCount_1 = 0; rowsCount_1 < y; rowsCount_1++) {
        var row = document.createElement('div');
        row.className = 'row';
        row.dataset['row'] = rowsCount_1.toString();
        for (var cellsCount = 0; cellsCount < x; cellsCount++) {
            var cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset['cell'] = cellsCount.toString();
            row.append(cell);
        }
        target.append(row);
    }
}
// Поиск элемента на странице для игрового поля
var tetrisPlaygroundTarget = document.querySelector('.tetris-playground');
var rowsCount = 20;
var columnsCount = 10;
// Проверка наличия элемента для игрового поля
if (tetrisPlaygroundTarget) {
    try {
        drawTetrisPlayground(columnsCount, rowsCount, tetrisPlaygroundTarget);
    }
    catch (e) {
        console.log(e.message);
    }
}
else {
    console.log("Tetris playground element not found");
}
// Описание фигур
var shapes = {
    S: { shape: [[0, 1, 1], [1, 1, 0]], color: 'yellowgreen' },
    Z: { shape: [[1, 1, 0], [0, 1, 1]], color: 'red' },
    T: { shape: [[1, 1, 1], [0, 1, 0]], color: 'purple' },
    O: { shape: [[1, 1], [1, 1]], color: 'yellow' },
    J: { shape: [[0, 1], [0, 1], [1, 1]], color: 'blue' },
    L: { shape: [[1, 0], [1, 0], [1, 1]], color: 'orange' },
    I: { shape: [[1], [1], [1], [1]], color: 'lightblue' }
};
var currentShape;
var shapePosition = { x: 0, y: 0 };
// Функция для отрисовки фигуры
function renderShape() {
    console.log("Rendering shape at position:", shapePosition);
    console.log("Current shape:", currentShape);
    var rowsToColor = currentShape.shape.length;
    var cellsToColor = currentShape.shape[0].length;
    for (var rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {
        var targetRow = shapePosition.y + rowIndex;
        if (targetRow >= rowsCount)
            continue;
        var row = tetrisPlaygroundTarget.children[targetRow];
        for (var cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {
            var targetCell = shapePosition.x + cellIndex;
            if (targetCell >= columnsCount)
                continue;
            var cell = row.children[targetCell];
            cell.style.backgroundColor = currentShape.shape[rowIndex][cellIndex] ? currentShape.color : '';
            console.log("Cell at row ".concat(targetRow, ", col ").concat(targetCell, " set to color ").concat(cell.style.backgroundColor));
        }
    }
}
// Функция для удаления предыдущей фигуры
function removePreviousShape() {
    for (var _i = 0, _a = tetrisPlaygroundTarget.children; _i < _a.length; _i++) {
        var row = _a[_i];
        for (var _b = 0, _c = row.children; _b < _c.length; _b++) {
            var cell = _c[_b];
            cell.style.backgroundColor = '';
        }
    }
}
// Функция для поворота фигуры
function rotateShape(shape) {
    console.log("Rotating shape:", shape);
    if (shape.length === 2 && shape[0].length === 2)
        return shape;
    var rotatedShape = [];
    for (var rowsCount_2 = 0; rowsCount_2 < shape[0].length; rowsCount_2++) {
        rotatedShape.push([]);
    }
    for (var i = shape.length - 1, k = 0; i >= 0; i--, k++) {
        for (var j = 0; j < shape[0].length; j++) {
            rotatedShape[j][k] = shape[i][j];
        }
    }
    console.log("Rotated shape:", rotatedShape);
    return rotatedShape;
}
// Функция для создания новой фигуры
function spawnNewShape() {
    var shapeKeys = Object.keys(shapes);
    var shapeKeyIndex = Math.floor(Math.random() * shapeKeys.length);
    currentShape = shapes[shapeKeys[shapeKeyIndex]];
    shapePosition = { x: 0, y: 0 }; // Устанавливаем начальную позицию фигуры сверху
    console.log("New shape spawned:", currentShape);
    renderShape();
}
// Инициализация новой фигуры
spawnNewShape();
// Обработчик нажатия клавиш
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        console.log("Space key pressed for rotation");
        currentShape.shape = rotateShape(currentShape.shape);
        removePreviousShape();
        renderShape();
    }
});