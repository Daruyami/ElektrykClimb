//game html node
let game
//array containing keys
let keys = []
//array containing players
let p = []

let delta = 0
let prevTimestamp

class Player {
    //player acceleration
    pAccel = 100
    //player friction
    pFrict = 0.75
    //player movement vector
    yVector = 0
    xVector = 0
    //player movement speed
    yVel = 0
    xVel = 0

    createPlayerNode(){
        let node = document.createElement('div')
        node.textContent = p.length
        game.appendChild(node)
        return node
    }
    initInput(kUp,kDown,kLeft,kRight){
        this.kUp = kUp
        keys[kUp] = false
        this.kDown = kDown
        keys[kDown] = false
        this.kLeft = kLeft
        keys[kLeft] = false
        this.kRight = kRight
        keys[kRight] = false
    }
    constructor(y=0,x=0, h=10,w=10, kUp='w', kDown='s', kLeft='a', kRight='d'){
        //player
        this.tag = this.createPlayerNode()
        //player position
        this.y = y
        this.x = x
        //player size
        this.h = h
        this.w = w
        //controls
        initInput()
    }
    checkInput(){
        this.xVector = keys[this.kRight] - keys[this.kLeft]
        this.yVector = keys[this.kDown] - keys[this.kUp]

        let vV = normalize(this.yVector, this.xVector)
        this.xVector = vV.xV
        this.yVector = vV.yV
    }

    move(){
        //thanks to delta movement speed shouldnt depend on fps
        this.xVel += (this.pAccel * this.xVector)*delta
        this.yVel += (this.pAccel * this.yVector)*delta
        this.xVel = this.xVel * this.pFrict
        this.yVel = this.yVel * this.pFrict
        //gdzieś tutaj będzie wykrywanie kolizji,
        //prawdopodobnie zastąpić te dwie operacje funkcją move()
        //która wykrywałaby kolizje
        this.x = this.x + this.xVel
        this.y = this.y + this.yVel
    }

    draw(/*xD=this.x, yD=this.y, hD=this.h, wD=this.w, rot*/){
        this.tag.style.transform = "translate("+this.x+"px, "+this.y+"px)";
    }

}

normalize = function(xV, yV){
    //normalizacja yVector i xVector,
    let m = Math.sqrt(xV*xV+yV*yV)
    if(m>1){
        xV=xV/m
        yV=yV/m
    }
    return {xV: xV,yV: yV}
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

let gameLoop = function(timestamp=performance.now()){
    delta = (timestamp - prevTimestamp)/1000
    handleInputs()
    update()
    render()
    prevTimestamp = timestamp
    window.requestAnimationFrame(gameLoop)
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
    initInput();
    p.push(new Player(200, 200))

    prevTimestamp = performance.now()
    //main game loop
    gameLoop()
}

window.addEventListener('load',init)
