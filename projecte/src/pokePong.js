var config = {
    type: Phaser.AUTO,
    width: 1550,
    height: 750,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    }
}

var game = new Phaser.Game(config);
var poke;
var bar_left;
var bar_right;
var bar_left_figure;
var bar_right_figure;
var gradient;

function preload()
{
    this.load.image('pokeball', 'assets/pokeball.png');

    cursor = this.input.keyboard.createCursorKeys();
}

function create() 
{
    console.log(this.matter);
    // L I M I T S (parets invisibles)
    this.matter.world.setBounds() ; // (0,0,800,600)  El mateix agafa els limits de pantalla amb els parentesis buits.
    
    // C O M P O N E N T S
    poke = this.matter.add.image(200,200, 'pokeball');

    // C R E A R   F I G U R E S
    bar_left_figure = this.add.rectangle(10, 200, 18, 108, 0xfd746c);
    bar_right_figure = this.add.rectangle(1525, 400, 18, 108, 0xffff);

    // A F E G I R  P H Y S I C S
    bar_left =  this.matter.add.gameObject(bar_left_figure);
    bar_right =  this.matter.add.gameObject(bar_right_figure);

    // K E Y B O A R D  (A i Z)  E S Q.
    lletraA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    lletraZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

    // P O K E  -  C O N F I G
    poke.setCircle();

    poke.setScale(0.5);

    poke.setOrigin(0.5); 

    poke.setBounce(1); // Com rebota (0 -> pilota de ciment, 1-> pilota de goma)

    poke.setFriction(0); // No tens fricció amb altres elements.

    poke.setFrictionAir(0);  //No tens fricció amb l'aire

    poke.setVelocity(10,5);  
   


    bar_left.body.isStatic = true;
    bar_right.body.isStatic = true;

    bar_left.setOrigin(0.5);
    bar_right.setOrigin(0.5);


    bar_left.setBounce(1);
    bar_right.setBounce(1);

}


function update(time, delta)
{
    var velPlataforma  = 300;
    var velCara = 10;
    var bar_height = bar_left.displayHeight / 2;
  
    if(cursor.up.isDown && bar_right.y >= 0 + bar_height ) {
        bar_right.y = bar_right.y - velPlataforma * delta / 1000.0; 
    }
    if(cursor.down.isDown && bar_right.y <= config.height - bar_height){ 
        bar_right.y = bar_right.y + velPlataforma * delta / 1000.0; 
    }

    if(lletraA.isDown && bar_left.y >= 0 + bar_height){
        bar_left.y = bar_left.y - velPlataforma * delta /1000.0;
    } 
    if (lletraZ.isDown && bar_left.y <= config.height - bar_height){
       bar_left.y =  bar_left.y + velPlataforma * delta /1000.0;
    }

    var v = new Phaser.Math.Vector2(poke.body.velocity);
    if(v.x === 0 && v.y === 0){
        poke.setVelocity(0,velCara);
    }
    else {
        var nova_velocitat = v.normalize(); 
        nova_velocitat.scale(velCara);
        poke.setVelocity(nova_velocitat.x, nova_velocitat.y);
    }
}