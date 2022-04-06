//ilość fpsów
let fps = 30

class Player {
    //przyspiesznie gracza
    pAccel = 100
    //opór/tarcie gracza (utrata prędkości)
    pFrict = 0.75
    //wektor (kierunek) poruszania sie gracza
    yVector = 0
    xVector = 0
    //prędkość poruszania sie gracza
    yVel = 0
    xVel = 0

    constructor(y=0,x=0, h=10,w=10, htmlId='p'){
        //pozycja gracza
        this.y = y
        this.x = x
        //rozmiar gracza
        this.h = h
        this.w = w
        //gracz
        this.tag = document.getElementById(htmlId)
    }

    input(){
        this.yVector = keys.s - keys.w
        this.xVector = keys.d - keys.a

        let vV = normalize(this.yVector, this.xVector)
        this.yVector = vV.yV
        this.xVector = vV.xV
    }

    move(){
        //dzielenie przez stałą fps aby zemulować działanie delty
        //obojętnie ile fpsów, prędkość poruszania powinna być taka sama
        this.yVel += (this.pAccel * this.yVector)/fps
        this.xVel += (this.pAccel * this.xVector)/fps
        this.yVel = this.yVel * this.pFrict
        this.xVel = this.xVel * this.pFrict
        //gdzieś tutaj będzie wykrywanie kolizji,
        //prawdopodobnie zastąpić te dwie operacje funkcją move()
        //która wykrywałaby kolizje
        this.y = this.y + this.yVel
        this.x = this.x + this.xVel
    }

    draw(yD=this.y, xD=this.x, hD=this.h, wD=this.w/*, rot*/){
        this.tag.style.transform = "translate("+xD+"px, "+yD+"px)";
    }

}
//tablica zawierająca graczy
let p = []

//urwany kawałek kodu od kolizji
/*pRect = {p[0].
 i f (pRect.x < (tBRect.x+tBRect.width) &&    *
 (pRect.x+pRect.width) > tBRect.x &&
 pRect.y < (tBRect.y+tBRect.height) &&
 (pRect.y+pRect.height) > tBRect.y)
 testBox.style.backgroundColor = 'lime';
 else
     testBox.style.backgroundColor = 'red';*/
//więcej kodu od kolizji
/*let testBox = document.getElementById('testBox')
tBRect = testBox.getBoundingClientRect();
console.log(tBRect)
pRect = player.getBoundingClientRect();*/


//inicjalizacja używanych klawiszy, zapobiega działaniom na NaN
let keys = {
    w: false,
    a: false,
    s: false,
    d: false,
};


normalize = function(yV, xV){
    //normalizacja yVector i xVector,
    let m = Math.sqrt(xV*xV+yV*yV)
    if(m>1){
        yV=yV/m
        xV=xV/m
    }
    return {yV: yV,xV: xV}
}

let handleInputs = function(){
    p[0].input()
}

let update = function(){
    p[0].move()
}

let render = function(){
    p[0].draw()
}

let gameLoop = function(){
    handleInputs()
    update()
    render()
}


let initInput = function() {
    window.addEventListener('keydown', (e) => {
        keys[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });
}
let init = function(){
    //inicjalizacja obsługi klawiatury
    initInput();
    p.push(new Player(200, 200))

    //game loop, główna funkcja która powtarzana jest [fps] razy na sekunde
    //osobiście chciałbym to troche inaczej zrobić ale o tym można pomyśleć kiedyindziej
    setInterval(gameLoop,1000/fps)
}

window.addEventListener('load',init)
