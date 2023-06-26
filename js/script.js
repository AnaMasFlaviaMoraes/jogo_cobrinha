// // Obtém o elemento canvas do HTML

function start(){
    //pegar o elemento canvas pelo ID  
    let area = document.getElementById('boardGame');
    
    //capturar o quadro de pontuação
    let recorde_input = document.getElementById('recorde_input');
    let recorde = 0;
    // define o contexto do elemento area para 2d
    let ctx = area.getContext("2d");

    document.addEventListener("keydown", keyPush);

    setInterval(game, 70);


    //Quantidade de casas que a cobra irá andar em cada atualização de quadro
    const vel = 1;

    //Velocidade inicial
    let vx = 0;
    let vy = 0; 
    
    //ponto inicial
    let px = 10;
    let py = 15;
    
    // Tamanho do ponto
    const tp = 20;
    
    // quantidade de pontos
    const qp = 20;
    
    // Eixo inicial da Maçã
    let applex = 15;
    let appley = 15;

    // Array para o rastro da cobra
    let trail = [];
    let tail = 0; // cauda da cobra
    
    function game(){
        px += vx;
        py += vy;
      
      //controle da cobra dentro do quadro para repetição nas bordas
        if (px < 0) {
            px = qp-1;
        }
        if (px > qp-1) {
            px = 0;
        }
        if (py < 0) {
            py = qp-1;
        }
        if (py > qp-1) {
            py = 0;
        }

    //sintaxe JavaScript:	contexto.fillRect ( x, y, largura, altura );
        ctx.fillStyle = "#CCFF99";
        ctx.fillRect(0,0, area.width, area.height);

    // desenhando a maçã
        ctx.fillStyle = "#EA2B1F";
        ctx.fillRect(applex*tp, appley*tp, tp,tp,2,2);

    //desenhando a cobra
      //for ([expressaoInicial]; [condicao]; [incremento]) declaracao
        for (let i = 0; i < trail.length; i++) {
            ctx.fillStyle = "#1e7908";
            ctx.strokeStyle = "#09BC8A";
            ctx.fillRect(trail[i].x*tp, trail[i].y*tp, tp,tp);
            ctx.strokeRect(trail[i].x*tp, trail[i].y*tp, tp,tp);
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
                applex = Math.floor(Math.random()*qp);
                appley = Math.floor(Math.random()*qp);
                recorde++;
                recorde_input.value = recorde;
            }
        }
        // verifica qual tecla foi pressionada
        window.addEventListener("keydown", function(e) {
        // space and arrow keys
            if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
        }, false);

        let lastKeyPressed = "";

        function keyPush(e){
            switch (e.keyCode) {
                case 37: // Equerda
                    if(lastKeyPressed != "right"){ // verifica se tava no sentido oposto
                        vx = -vel;
                        vy = 0;
                        lastKeyPressed = "left";
                    }

                break;
                case 38: // cima
                    if(lastKeyPressed != "down"){ // verifica se tava no sentido oposto
                        vx = 0;
                        vy = -vel;
                        lastKeyPressed = "up";
                    }
                break;
                case 39: // direita
                    if(lastKeyPressed != "left"){ // verifica se tava no sentido oposto
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
    }

    function gameOver(){
        //implemantar função de jogo terminado
    }