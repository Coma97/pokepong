var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
var cara;

function preload()
{
    this.load.image('cara', 'assets/poop.png');
    this.load.image('mario', 'assets/mario.png');

    cursor = this.input.keyboard.createCursorKeys();
}

function create() 
{
    console.log(this.matter);
    //Posar límits al mòn (parets invisibles)
    this.matter.world.setBounds() ; // (0,0,800,600)  El mateix agafa els limits de pantalla amb els parentesis buits.
  
    cara = this.matter.add.image(200,200, 'cara');
    cara.setCircle();

    cara.setBounce(1); // Com rebota (0 -> pilota de ciment, 1-> pilota de goma)

    cara.setFriction(0); // No tens fricció amb altres elements.

    cara.setFrictionAir(0);  //No tens fricció amb l'aire

   // cara.setVelocityY(10);

    cara.setVelocity(10,5);


    plataforma = this.matter.add.image(200,500, 'mario');
    plataforma.body.isStatic = true;
    plataforma.setBounce(1);

    /*
    for(var i = 0; i < 1; i++){
        var x = Phaser.Math.Between(0,700);
        var y = Phaser.Math.Between(0,500);

        var obj = this.matter.add.image(x, y, 'cara');
        obj.setBounce(0.5);
    }
    */
}


function update(time, delta)
{
    var velPlataforma  = 100;
    var velCara = 10;

    if(cursor.left.isDown) 
    {
        plataforma.x = plataforma.x - velPlataforma * delta /1000.0;
    }
    else if (cursor.right.isDown)
    {
        plataforma.x = plataforma.x + velPlataforma * delta/1000.0;
    }

    var v = new Phaser.Math.Vector2(cara.body.velocity);
    if(v.x === 0 && v.y === 0){
        cara.setVelocity(0,velCara);
    }
    else {
        var nova_velocitat = v.normalize(); 
        nova_velocitat.scale(velCara);
        cara.setVelocity(nova_velocitat.x, nova_velocitat.y);
    }


}