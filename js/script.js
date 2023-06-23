// Obtém o elemento canvas do HTML
const canvas = document.getElementById("boardGame");
const context = canvas.getContext("2d");
//let box = 32;

const recorde_input = document.querySelector("#recorde_input");
const div_instrucoes = document.querySelector("#div_instrucoes");
const div_game = document.querySelector("#div_game");

let recorde = 0;

function mudar_valor(){
    recorde++;
    recorde_input.value = recorde;
}

function abrir_instrucoes(){
    div_game.style.display="none";
    div_instrucoes.style.display = "block";
}

function fechar_instrucoes(){
    div_game.style.display="block";
    div_instrucoes.style.display = "none";
}

// Variáveis do jogo
const gridSize = 20;
const gridSizeInPixels = canvas.width / gridSize;
let snake = [
    { x: gridSizeInPixels * 2, y: gridSizeInPixels },
    { x: gridSizeInPixels, y: gridSizeInPixels },
];
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * gridSizeInPixels,
    y: Math.floor(Math.random() * 15 + 1) * gridSizeInPixels
}

// Função para desenhar a cobra e a comida
function drawSnake() {
    context.fillStyle = "green";
    snake.forEach(segment => {
        context.fillRect(segment.x, segment.y, gridSizeInPixels, gridSizeInPixels);
    });
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, gridSizeInPixels, gridSizeInPixels);
}

// Função para atualizar o estado do jogo
function update() {
    // Lógica para mover a cobra

    // Lógica para verificar colisões

    // Lógica para comer a comida

    // Lógica para desenhar a cobra e a comida

    // Chamada recursiva para atualizar o estado do jogo
    setTimeout(update, 100);
}

// Função para lidar com eventos de teclado
function handleKeyPress(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

// Event listener para capturar eventos de teclado
document.addEventListener("keydown", handleKeyPress);

// Inicialização do jogo
update();

function moveSnake() {
    var head = {x: snake[0].x, y: snake[0].y};
    
    if (direction == "left") {
        head.x -= 1;
    } else if (direction == "up") {
        head.y -= 1;
    } else if (direction == "right") {
        head.x += 1;
    } else if (direction == "down") {
        head.y += 1;
    }
    
    snake.unshift(head); // Adiciona a nova cabeça no início da cobra
    snake.pop(); // Remove a cauda da cobra
    
    drawSnake(); // Redesenha a cobra na nova posição
    }

function start(){
    drawSnake();
    drawFood();
    //setInterval(moveSnake,5);
}