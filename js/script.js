let area = document.getElementById('boardGame');
let div_game = document.getElementById('div_game');
let div_instrucoes = document.getElementById('div_instrucoes');
let recorde_input = document.getElementById('recorde_input');
let div_game_over = document.getElementById('game_over');
let best_recordes = document.getElementById('best_recordes');
let new_game = document.getElementById('new_game');
let button_start = document.getElementById('start');
let div_dica = document.getElementById('dica');

let recorde = 0;

mordida = new Audio("../style/sounds/mordida.mp3");
game_over = new Audio("../style/sounds/game_over.mp3");

function start(){
    button_start.disabled = true;
    div_dica.style.display = "block";
    let ctx = area.getContext("2d");

    document.addEventListener("keydown", changeDirection);

    //Quantidade de casas que a cobra irá andar em cada atualização de quadro
    const vel = 1;

    //Velocidade inicial
    let vx = 0;
    let vy = 0; 
    
    //ponto inicial
    let px = 10;
    let py = 15;
    
    // Variável que representa um quadrado/pixel do gráfico
    const pixel = Math.floor(Math.sqrt(area.width));
    const qtdPixels =  Math.floor(Math.sqrt(area.width));
    
    // Eixo inicial da Maçã
    let applex = 15;
    let appley = 15;

    let trail = [];
    let tail = 0; // cauda da cobra
    
    function game(){
        px += vx; 
        py += vy;
      
      //controle da cobra dentro do quadro para repetição nas bordas
        if (px < 0) {
            px = qtdPixels-1;
        }
        if (px > qtdPixels-1) {
            px = 0;
        }
        if (py < 0) {
            py = qtdPixels-1;
        }
        if (py > qtdPixels-1) {
            py = 0;
        }

        // area total que cobra e maçã terão 
        ctx.fillStyle = "#CCFF99";
        ctx.fillRect(0,0, area.width, area.height);

    // desenhando a maçã
        ctx.fillStyle = "#EA2B1F";
        ctx.fillRect(applex*pixel, appley*pixel, pixel,pixel,2,2);

    //desenhando a cobra
        for (let i = 0; i < trail.length; i++) {
            ctx.fillStyle = "#1e7908";
            ctx.strokeStyle = "#09BC8A";
            ctx.fillRect(trail[i].x*pixel, trail[i].y*pixel, pixel,pixel);
            ctx.strokeRect(trail[i].x*pixel, trail[i].y*pixel, pixel,pixel);
            if (trail[i].x == px && trail[i].y == py){
                vx = vy = 0;
                tail = 2;
                gameOver(); //chama função de final de jogo
            }
        }

        trail.push({x:px,y:py});
      
        while (trail.length > tail) {
            trail.shift();
        }
      
        // quando a cobra come a maçã
        if (applex==px && appley==py){
            tail++; // aumenta a cauda
            mordida.play();
            applex = Math.floor(Math.random()*qtdPixels);
            appley = Math.floor(Math.random()*qtdPixels);
            recorde++;
            recorde_input.value = recorde;
        }
    }

    let lastKeyPressed = "";

    function changeDirection(e){
        div_dica.style.display = "none";
        switch (e.keyCode) {
            case 37: // Equerda
                if(lastKeyPressed != "right"){ 
                    vx = -vel;
                    vy = 0;
                    lastKeyPressed = "left";
                }

            break;
            case 38: // cima
                if(lastKeyPressed != "down"){ 
                    vx = 0;
                    vy = -vel;
                    lastKeyPressed = "up";
                }
            break;
            case 39: // direita
                if(lastKeyPressed != "left"){ 
                    vx = vel;
                    vy = 0;
                    lastKeyPressed = "right";
                }
            break;
            case 40: // baixo
                if(lastKeyPressed != "up"){
                    vx = 0;
                    vy = vel;
                    lastKeyPressed = "down";
                }
            break;
        }
    }
    intervalo = setInterval(game, 70);
}

function gameOver(){
    let best = localStorage.getItem("best_record");
    let isTheBest = false;
    if(best < recorde){
        localStorage.clear();
        //salva a nova maior pontuação
        localStorage.setItem("best_record", recorde);
        isTheBest = true;
    }
    game_over.play();
    clearInterval(intervalo);
    div_game.style.display = "none";
    div_game_over.style.display = "block";
    div_instrucoes.style.display = "none";
    button_start.disabled = false;
    if(isTheBest){
        best_recordes.innerHTML += "<h2 id='best'>Novo recorde: "+recorde+"</h2><br>"; 
    }
    best_recordes.innerHTML += "<h2>Score: "+recorde+"</h2>";

}

function abrir_instrucoes(){
    div_game.style.display = "none";
    div_game_over.style.display = "none";
    div_instrucoes.style.display = "block";

}

function fechar_instrucoes(){
    div_game.style.display = "block";
    div_game_over.style.display = "none";
    div_instrucoes.style.display = "none";
}

function newGame(){
    div_game.style.display = "block";
    div_game_over.style.display = "none";
    div_instrucoes.style.display = "none";
    window.location.href = "../pages/index.html";
}

