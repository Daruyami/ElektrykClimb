//ilość fpsów
let fps = 30
//przyspiesznie gracza
let pAccel = 100
//opór/tarcie gracza (utrata prędkości)
let pFrict = 0.75

//gracz
let player =  document.getElementById('p')
//pozycja gracza
let y = 0
let x = 0
//wektor (kierunek) poruszania sie gracza
let yVector = 0
let xVector = 0
//prędkość poruszania sie gracza
let yVel = 0
let xVel = 0
/*
    Co do gracza przypuszczam że w późniejszej rozbudowie najlepiej będzie zrobić dla niego klase
    (co również teoretycznie pozwoliłoby na wielu graczy przy jednym komputerze), dzięki czemu
    łatwiejsze będzie zarządzanie stanami gracza jak np resetowanie danych zmiennych
    po śmierci czy rozpoczęciu nowej gry.

*/
let up = false;
let down = false;
let left = false;
let right = false;


let gameLoop = function(){
    handleInputs()
    update()
    render()

}

//funkcja od renderingu
//Sposób renderowania (html+css czy canvas czy co) powinien przebywać
//w tej funkcji i powiązanych, dzięki czemu czegokolwiek chcemy użyć wystarczy zmienić
//tylko tą część i nic więcej.
//osobiście uznałem że styl transform: translate z css był najlepszą i najprostrzą opcją
//...która również pozwala na łatwą rozbudowe później zamieniając translate na matrix
let render = function(){
    player.style.transform = "translate("+x+"px, "+y+"px)";
}


let update = function(){
    yVel += (pAccel*yVector)/fps
    xVel += (pAccel*xVector)/fps

    //gdzieś tutaj będzie wykrywanie kolizji,
    //prawdopodobnie zastąpić te dwie operacje funkcją move()
    //która wykrywałaby kolizje
    y = (y+yVel)*pFrict
    x = (x+xVel)*pFrict
}

let handleInputs = function(){
    yVector = down-up
    xVector = right-left

    //normalizacja yVector i xVector,
    //prawdopodobnie później zostanie odrębną funkcją
    let m = Math.sqrt(xVector*xVector+yVector*yVector)
    if(m>1){
        yVector=yVector/m
        xVector=xVector/m
    }
}

let inputDown = function(e){
    if(e.key=='w'){
        up = true
    }
    if(e.key=='s'){
        down = true
    }
    if(e.key=='a'){
        left = true
    }
    if(e.key=='d'){
        right = true
    }

}
let inputUp = function(e){
    if(e.key=='w'){
        up = false
    }
    if(e.key=='s'){
        down = false
    }
    if(e.key=='a'){
        left = false
    }
    if(e.key=='d'){
        right = false
    }
}

let init = function(){
    window.addEventListener('keydown', inputDown)
    window.addEventListener('keyup', inputUp)

    //game loop, główna funkcja która powtarzana jest [fps] razy na sekunde
    //osobiście chciałbym to troche inaczej zrobić ale o tym można pomyśleć kiedyindziej
    setInterval(gameLoop,1000/fps)
}

window.addEventListener('load',init)
