var config = {
    type: Phaser.AUTO, // Seleccionar Canvas, WebGL o Automatic
    width: 800, // Amplada de la finestra
    height: 600, // Altura de la finestra.
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config)
var imatgeActual;
var vel = 100;               // 10 Pixels x Segon

function preload(){
    this.load.image('cara','assets/poop.png')
    
    cursor = this.input.keyboard.createCursorKeys();
}

function create(){
    for (var i = 0; i < 32; i++){
        var x = Phaser.Math.Between(0,800)
        var y = Phaser.Math.Between(0,600)
        var s = Phaser.Math.FloatBetween(0.5,1.5)
        var r = Phaser.Math.FloatBetween(0,Phaser.Math.PI2)

        // Creem i posicionem la imatge
        var img = this.add.image(x,y,'cara')
        img.setScale(s);
        img.rotation = r;

        // la fem interactiva (per els events)
        img.setInteractive()

    }

    // Event per destruir les imatges
    this.input.on('gameobjectdown',function(pointer,gameobj){
        // Els elimina i allibera de la memoria. ( no es fa invisible)
        //gameobj.destroy();
        imatgeActual = gameobj;
        imatgeActual.tint = 66000000;
      
    })


}

function update(time, delta){
    if (cursor.left.isDown) {
        imatgeActual.x = imatgeActual.x - vel * delta / 1000.0; 
    }
    if (cursor.right.isDown) {
        imatgeActual.x = imatgeActual.x + vel * delta / 1000.0;
    }
    if (cursor.up.isDown) {
        imatgeActual.y = imatgeActual.y - vel * delta / 1000.0;
    }
    if (cursor.down.isDown) {
        imatgeActual.y = imatgeActual.y + vel * delta / 1000.0;
    }   
 
}