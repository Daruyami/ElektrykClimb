//ilość fpsów
let fps = 30
let game
//tablica zawierająca przyciski
let keys = []
//tablica zawierająca graczy
let p = []

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

    createPlayerNode(){
        let node = document.createElement('div')
        node.textContent = p.length
        game.appendChild(node)
        return node
    }
    constructor(y=0,x=0, h=10,w=10, kUp='w', kDown='s', kLeft='a', kRight='d'){
        //gracz
        this.tag = this.createPlayerNode()
        //pozycja gracza
        this.y = y
        this.x = x
        //rozmiar gracza
        this.h = h
        this.w = w
        //kontrolki
        this.kUp = kUp
        keys[kUp] = false
        this.kDown = kDown
        keys[kDown] = false
        this.kLeft = kLeft
        keys[kLeft] = false
        this.kRight = kRight
        keys[kRight] = false

    }

    checkInput(){
        this.yVector = keys[this.kDown] - keys[this.kUp]
        this.xVector = keys[this.kRight] - keys[this.kLeft]

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
    for(let i=0; i<p.length; i++)
        p[i].checkInput()
}

let update = function(){
    for(let i=0; i<p.length; i++)
        p[i].move()
}

let render = function(){
    for(let i=0; i<p.length; i++)
        p[i].draw()
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
    game = document.getElementById('game');
    //inicjalizacja obsługi klawiatury
    initInput();
    p.push(new Player(200, 200))

    //game loop, główna funkcja która powtarzana jest [fps] razy na sekunde
    //osobiście chciałbym to troche inaczej zrobić ale o tym można pomyśleć kiedyindziej
    setInterval(gameLoop,1000/fps)
}

window.addEventListener('load',init)
