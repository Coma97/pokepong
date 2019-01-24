var config = {
    type: Phaser.AUTO,      // Seleccionar Canvas, WebGL o Automatic
    width: 800,             // Amplada de la finestra
    height: 600,            // Altura de la finestra
    scene: {
        preload : preload,
        create : create,
        update : update
    }
};

var game = new Phaser.Game(config);
var ninot;
var cursor;
var vel = 100;               // 10 Pixels x Segon
var lletraB;
var lletraV;
var color;

var vermell;
var textButo;
var contenidor;

function preload ()
{
    console.log("preload"); 

    cursor = this.input.keyboard.createCursorKeys();
    
    this.load.image('ninot', 'assets/mario.png');

    
}

function create ()
{
    console.log("create");

    ninot = this.add.image(400,300, 'ninot');    

    //T I N T A R
    color = Phaser.Display.Color.GetColor(127, 0 , 0);
   // ninot.setTint(color);

    
   vermell = Phaser.Display.Color.GetColor(255, 0, 0);

    // K E Y B O A R D  (B)
    lletraB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    lletraV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);


    // C A L L B A C K S
    
    this.input.keyboard.on('keydown_A', function(event) {
        console.log("A");
        this.input.keyboard.stopListeners()
    }, this);
    

    // C R E A R E M    E L   B O T O
    textButo = this.add.text(100, 100, 'Rotate!',{fill:'#0f0'});
    // Li direm que emeti events
    textButo.setInteractive();
    // Event passar per sobre amb el ratoli
    textButo.on('pointerover', function(event){
        console.log("Mouse per sobre")
    });
    //Event de quan es pitxa
    textButo.on('pointerdown', function(event){
    textButo = this.add.text(100, 200, 'Boto Pitxat!',{fill:'#0ff'});    
    }, this );

    // Graus * (PI/180)
    textButo.rotation = 45.0 * (3.14159/180.0);

    console.log(typeof contenidor); //SABER EL TIPUS, N'HI HA DE PRIMITIUS(Boolean,Number,String).

    //C O N T A I N E R
    /*
    contenidor = this.add.container(100,100);
    var ninot1 = this.add.image(100,100, 'ninot');
    var ninot2 = this.add.image(200,200, 'ninot');
    var ninot3 = this.add.image(300,300, 'ninot');
    */

    contenidorFotos = this.add.container(0,0);

   
/*
    this.input.on('pointerdown', function(pointer){
      var foto = this.add.image(pointer.x - contenidorFotos.x,pointer.y - contenidorFotos.y, 'ninot');
      contenidorFotos.add(foto);

    }, this);*/


    this.input.on('pointermove', function(pointer){
        ninot.x = pointer.x;
        ninot.y = pointer.y; 
        ninot.setScale(0.5); 
      }, this);
    
    
    
      /*
    contenidor.add([ninot1,ninot2,ninot3]);

    //Event mouse pitxat. Posició?
    this.input.on('pointerdown', function(pointer){
        console.log(pointer.x);
        console.log(pointer.y);

    });
    */

}

function update (time, delta) 
{
    //console.log("update :" + String(time));

    ninot.setScale(0.5);

    if(cursor.left.isDown) {
        //ninot.x = ninot.x - vel * delta / 1000.0;
        //contenidor.x = contenidor.x + vel * delta / 1000.0;
        contenidorFotos.x = contenidorFotos.x - vel * delta / 1000.0;
    }
    if(cursor.right.isDown){
        //ninot.x = ninot.x + vel * delta / 1000.0;
        //contenidor.x = contenidor.x - vel * delta / 1000.0;
        contenidorFotos.x = contenidorFotos.x + vel * delta / 1000.0;
       

    }
    if(cursor.up.isDown) {
       //ninot.y = ninot.y - vel * delta / 1000.0;
       //contenidor..y = contenidor.y + vel * delta / 1000.0;
       contenidorFotos.y = contenidorFotos.y - vel * delta / 1000.0;


     }
     if(cursor.down.isDown){
        //ninot.y = ninot.y + vel * delta / 1000.0;
        //contenidor.y = contenidor.y - vel * delta / 1000.0;
        contenidorFotos.y = contenidorFotos.y + vel * delta / 1000.0;


     }
     if(lletraB.isDown){
         vermell += vel * delta/1000.0;
         var color2 = Phaser.Display.Color.GetColor(vermell,0,0);
        ninot.setTint(color2);   
        console.log('zi');     
    }
    
    if(lletraV.isDown){
        vermell -= vel * delta/1000.0;
         var color2 = Phaser.Display.Color.GetColor(vermell,0,0);
        ninot.setTint(color2);    
        console.log('no');     

       }
}