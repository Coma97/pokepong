class PongGame extends Phaser.Scene {
    constructor() {
        super({
            key: 'PongGame', active: true, physics: {
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
        )
        self.cursor;
        self.poke;
        self.bar_left;
        self.bar_right;
        self.bar_left_figure;
        self.bar_right_figure;
        self.lletraA;
        self.lletraZ;
        self.limitDret;
        self.limitEsq;
        self.bar_limitLeft;
        self.bar_limitRight;
        self.novapuntuacioDret = 0;
        self.novapuntuacioEsq = 0;
        self.guanyador;
        self.squirtle;
        self.charmander;
        self.bulbasaur;
        self.obstacle1 = false;
        self.obstacle2 = false;
        self.obstacle3 = false;
    }

    preload() {
        console.log("Preload");
        this.load.image('pokeball', 'assets/pokeball.png');

        this.load.image('squirtle', 'assets/squirtle.png');
        this.load.image('bulbasaur', 'assets/bulbasaur.png');
        this.load.image('charmander', 'assets/charmander.png');

        self.cursor = this.input.keyboard.createCursorKeys();
    }

    create() {
        
        // P U N T U A C I O
        this.scene.add("Puntuacio", Puntuacio);

        // P L A Y  &  P A U S E
        this.scene.add("PauseScene", PauseScene);

        // L I M I T S (parets invisibles)
        this.matter.world.setBounds(); // (0,0,800,600)  El mateix agafa els limits de pantalla amb els parentesis buits.

        // C O M P O N E N T S
        self.poke = this.matter.add.image(200, 200, 'pokeball');

        // C R E A R   F I G U R E Sa
        self.bar_left_figure = this.add.rectangle(20, 280, 18, 108, 0xfd746c);
        self.bar_right_figure = this.add.rectangle(1520, 400, 18, 108, 0xffff);

        // A F E G I R  P H Y S I C S
        self.bar_left = this.matter.add.gameObject(self.bar_left_figure);
        self.bar_right = this.matter.add.gameObject(self.bar_right_figure);


        // C R E A R   L I M I T S    
        self.limitEsq = this.add.rectangle(6, 376, 4, config.height, 0xffff);
        self.limitDret = this.add.rectangle(1535, 376, 4, config.height, 0xfd746c);

        // A F E G I R  P H Y S I C S   L I M I T S
        self.bar_limitLeft = this.matter.add.gameObject(self.limitEsq);
        self.bar_limitRight = this.matter.add.gameObject(self.limitDret);

        // K E Y B O A R D  (A i Z)  E S Q.
        self.lletraA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        self.lletraZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

        // P O K E  -  C O N F I G
        self.poke.setCircle();

        self.poke.setScale(0.5);

        self.poke.setOrigin(0.5);

        self.poke.setBounce(1); // Com rebota (0 -> pilota de ciment, 1-> pilota de goma)

        self.poke.setFriction(0); // No tens fricció amb altres elements.

        self.poke.setFrictionAir(0);  //No tens fricció amb l'aire

        self.poke.setVelocity(10, 5);


        // P L A Y E R S  -  C O N F I G
        self.bar_left.body.isStatic = true;
        self.bar_right.body.isStatic = true;

        bar_left.setOrigin(0.5);
        bar_right.setOrigin(0.5);

        self.bar_left.setBounce(1);
        self.bar_right.setBounce(1);

        // L I M I T S   S C O R E
        self.bar_limitLeft.body.isStatic = true;
        self.bar_limitRight.body.isStatic = true;

        // D E T E C T A R    C O L I S I O N S   I N C R E M E N T A R   M A R C A D O R S
        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            //creem  2 objectes per assignar  pilota i  porteria
            var objecte1;
            var objecte2;

            //assignem l'objecte 1 a la pilota, tant si era el body A o el B
            if (bodyA.gameObject === self.poke) {
                objecte1 = self.poke;
            } else if (bodyB.gameObject === self.poke) {
                objecte1 = self.poke;
            }
            //assignem l'objecte 2 a la porteria que falta
            if (bodyA.gameObject === self.bar_limitRight) {
                objecte2 = self.bar_limitRight;
            } else if (bodyA.gameObject === self.bar_limitLeft) {
                objecte2 = self.bar_limitLeft;
            } else if (bodyB.gameObject === self.bar_limitRight) {
                objecte2 = self.bar_limitRight;
            } else if (bodyB.gameObject === self.bar_limitLeft) {
                objecte2 = self.bar_limitLeft;
            }

            var puntuacioCanviat = false;
            
            //si existeixen els dos objectes, mirem quina porteria ha marcat i sumem els punts
            if (objecte1 != undefined && objecte2 != undefined) {
                if (objecte2 === self.bar_limitRight) {
                    novapuntuacioDret++;
                    console.log('dreta' + novapuntuacioDret)
                    this.scene.get('Puntuacio').incrementaDreta(novapuntuacioDret);
                    puntuacioCanviat = true;
                } else if (objecte2 === self.bar_limitLeft) {
                    novapuntuacioEsq++;
                    console.log('esq' + novapuntuacioEsq)
                    this.scene.get('Puntuacio').incrementaEsquerra(novapuntuacioEsq);
                    puntuacioCanviat=true;
                } 
            }
            
            // O B S T A C L E S 
            if (puntuacioCanviat &&  !self.obstacle1 && (novapuntuacioDret == 3 || novapuntuacioEsq == 3)) {
                //generar squirtle
                self.squirtle = this.matter.add.image(500, 450, 'squirtle');               
                self.squirtle.setCircle();   
                self.squirtle.body.isStatic = true;         
                self.squirtle.setScale(0.5);                     
                
                self.obstacle1 = true;
            }
    
            else if (puntuacioCanviat && !self.obstacle2 && (novapuntuacioDret == 6 || novapuntuacioEsq == 6)) {
                //generar charmander
                self.charmander = this.matter.add.image(1100,450, 'charmander');            
                self.charmander.setCircle();
                self.charmander.body.isStatic = true; 
                self.charmander.setScale(0.5);    
                
                self.obstacle2 = true;
            } 
    
            else if (puntuacioCanviat && !self.obstacle3 && (novapuntuacioDret == 9 || novapuntuacioEsq == 9)) {
                //generar bulbasaur
                self.bulbasaur = this.matter.add.image(800,200, 'bulbasaur');            
                self.bulbasaur.setCircle();
                self.bulbasaur.body.isStatic = true; 
                self.bulbasaur.setScale(0.5);    
     
                self.obstacle3 = true;
            }
    
            else if (puntuacioCanviat && (novapuntuacioDret == 10 || novapuntuacioEsq == 10)) {
                //self.guanyador = this.add.text(690, 16, ' Guanyador ', { font: "55px Pokemon_Hollow", fill: "red" });
                this.scene.remove("PongGame");
                this.scene.remove("Puntuacio");
                this.scene.remove("PauseScene");

                var guanyador = new Guanyador();
                this.scene.add("Guanyador", guanyador);
            }
 
        }, this)


    }

    update(time, delta) {
        // console.log(foo);
        var velPlataforma = 300;
        var velCara = 10;
        var bar_height = self.bar_left.displayHeight / 2;

        if (self.cursor.up.isDown && self.bar_right.y >= 0 + bar_height) {
            self.bar_right.y = self.bar_right.y - velPlataforma * delta / 1000.0;
        }

        if (self.cursor.down.isDown && self.bar_right.y <= config.height - bar_height) {
            self.bar_right.y = self.bar_right.y + velPlataforma * delta / 1000.0;
        }

        if (self.lletraA.isDown && self.bar_left.y >= 0 + bar_height) {
            self.bar_left.y = self.bar_left.y - velPlataforma * delta / 1000.0;
        }

        if (self.lletraZ.isDown && self.bar_left.y <= config.height - bar_height) {
            self.bar_left.y = self.bar_left.y + velPlataforma * delta / 1000.0;
        }



        //  N O   P E R D R E  F O R Ç A
        var v = new Phaser.Math.Vector2(self.poke.body.velocity);

        // V E L O C I T A T   M A S S A    P E  T I T A
        // la pilota es quedava enganxada al colisionar amb les barres de jugador.
        var velX = Math.abs(v.x);
        if (velX < 1) {
            if (self.poke.x > config.width / 2) {
                v.x = -6;
            } else {
                v.x = 6;
            }
        }

        // N O   E S   Q U E D A    R E C T A
        if (v.x >= 0 && v.x < 0.5) {
            v.x = 60;
        }
        else if (v.x < 0 && v.x > -0.5) {
            v.x = -60;

        }
        if (v.x === 0 && v.y === 0) {
            self.poke.setVelocity(0, velCara);
        }
        else {
            var nova_velocitat = v.normalize();
            nova_velocitat.scale(velCara);
            self.poke.setVelocity(nova_velocitat.x, nova_velocitat.y);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Guanyador extends Phaser.Scene {
    constructor() {
        super({ key: 'Guanyador', active: true })
    }

    preload() { }

    create() {
        var guanyador = this.add.text(690, 216, ' Guanyador ', { font: "55px Pokemon_Hollow", fill: "white" }); 
        const welcomeBack = this.add.text(290, 606, ' Tornar Menu Principal ↩ ', { font: "55px Pokemon_Hollow", fill: "#eeeeee" })

        welcomeBack.setInteractive();
        welcomeBack.on('pointerdown', () => {
            this.scene.remove("Guanyador");
            var menu = new Menu();
            this.scene.add("Menu", menu);
        })

    }

    update(time, delta) {
        // console.log(foo);

    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


class Puntuacio extends Phaser.Scene {

    constructor() {
        super({
            key: 'Puntuacio', active: true
        })

        self.titolPuntsEsquerra;
        self.titolPuntsDreta;
        self.puntsDreta;
        self.puntsEsquerra;
        self.nameEsquerra;
        self.nameDreta;
        self.titol;
        self.guanyador;
        self.squirtle;
        self.charmander;
        self.bulbasaur;
        self.obstacle1;
        self.obstacle2;
        self.obstacle3;
    }

    preload() { 
    }

    create() {
        self.titol = this.add.text(690, 16, ' PokéPong ', { font: "55px Pokemon_Hollow", fill: "red" });
        self.titolPuntsDreta = this.add.text(26, 16, 'score pl:', { fontSize: '22px', fill: '#fff' });
        self.titolPuntsEsquerra = this.add.text(1316, 16, 'score p2:', { fontSize: '22px', fill: '#fff' });
        self.puntsDreta = this.add.text(150, 16, '0', { fontSize: '22px', fill: '#fff' });
        self.puntsEsquerra = this.add.text(1450, 16, '0', { fontSize: '22px', fill: '#fff' });
    }

    incrementaDreta(novapuntuacioDret) { 
        self.puntsDreta.setText(novapuntuacioDret);
    }

    incrementaEsquerra(novapuntuacioEsq) { 
        self.puntsEsquerra.setText(novapuntuacioEsq);
    }
 
    update(time, delta) {
        // console.log(foo);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Previa extends Phaser.Scene {
    constructor() {
        super({
            key: 'Previa', active: true, physics: {
                default: 'matter',
                matter: {
                    debug: false,
                    gravity: {
                        x: 0,
                        y: 0
                    }
                }
            }
        }
        );
        self.logo;
        self.face;
    }

    preload() {
        this.load.image('logo', 'assets/poképong.png');
        this.load.image('ball', 'assets/poke.gif')
    }

    create() {

        var h = game.config.height / 2;
        var w = game.config.width / 2;
        self.logo = this.add.image(w, h, 'logo');

        self.logo.setInteractive();

        var textprova = this.add.text(690, 16, ' . ', { font: "1px Pokemon_Hollow", fill: "black" });
        var textprova = this.add.text(690, 17, ' . ', { font: "1px Pokemon_Solid", fill: "black" });
        var textprova = this.add.text(690, 18, ' . ', { font: "1px Pokemon_GB", fill: "black" });


        self.logo.on('pointerdown', () => {
            this.scene.remove("Previa");                                     // -   E S B O R R A R
            var menu = new Menu();
            this.scene.add("Menu", menu);
        });

        //var jugar = this.add.text(290, 16, ' P O K E P O N G  ', { font: "55px Pokemon_Hollow", fill: "#eeeeee" })

        // L I M I T S (parets invisibles)
        this.matter.world.setBounds(); // (0,0,800,600)  El mateix agafa els limits de pantalla amb els parentesis buits.

        for (var i = 0; i < 10; i++) {
            //get the width and height of the config file
            //game from the config file
            var h = game.config.height;
            var w = game.config.width;

            //create some random coordinates
            var x = Phaser.Math.Between(0, w);
            var y = Phaser.Math.Between(0, h);

            //create a random width
            var width = Phaser.Math.Between(50, 200);
            //make a face sprite and place it
            //at the random place
            self.face = this.matter.add.sprite(x, y, "ball");

            //set the width of the sprite
            face.displayWidth = width;
            //scale evenly
            self.face.scaleY = face.scaleX;

            self.face.setCircle();

            self.face.setOrigin(0.5);

            self.face.setBounce(1); // Com rebota (0 -> pilota de ciment, 1-> pilota de goma)

            self.face.setFriction(0); // No tens fricció amb altres elements.

            self.face.setFrictionAir(0);  //No tens fricció amb l'aire

            self.face.setVelocity(10, 5);
        }

    }

    update(time, delta) {
        var velCara = 10;

        //  N O   P E R D R E  F O R Ç A
        var v = new Phaser.Math.Vector2(self.face.body.velocity);

        // V E L O C I T A T   M A S S A    P E  T I T A
        // la pilota es quedava enganxada al colisionar amb les barres de jugador.
        var velX = Math.abs(v.x);
        if (velX < 1) {
            if (self.face.x > config.width / 2) {
                v.x = -6;
            } else {
                v.x = 6;
            }
        }

        // N O   E S   Q U E D A    R E C T A
        if (v.x >= 0 && v.x < 0.5) {
            v.x = 60;
        }
        else if (v.x < 0 && v.x > -0.5) {
            v.x = -60;

        }
        if (v.x === 0 && v.y === 0) {
            self.face.setVelocity(0, velCara);
        }
        else {
            var nova_velocitat = v.normalize();
            nova_velocitat.scale(velCara);
            self.face.setVelocity(nova_velocitat.x, nova_velocitat.y);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu', active: true })
        self.pongTitol;
    }

    preload() {

    }

    create() {

        self.pongTitol = this.add.text(690, 16, ' PokéPong ', { font: "55px Pokemon_Solid", fill: "yellow" });

        //  Stroke color and thickness
        //self.pongTitol.setStroke ('#0000ff',2) ; 


        const gameText = this.add.text(1290, 16, ' Start Game', { font: '20px Pokemon_GB', fill: '#fff' });
        const creditsText = this.add.text(26, 16, ' Crèdits ', { font: '22px Pokemon_GB', fill: '#fff' });
        

        gameText.setInteractive();
        gameText.on('pointerdown', () => {

            this.scene.remove("Menu");                                     // -   E S B O R R A R
            var pongGame = new PongGame();                                     // -   C R E A R
            this.scene.add("PongGame", pongGame);
        })

        creditsText.setInteractive();
        creditsText.on('pointerdown', () => {
            this.scene.remove("Menu");
            var credits = new Credits();
            this.scene.add("Credits", credits);
        });
    }

    update(time, delta) {
        // console.log(foo);          
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


class Credits extends Phaser.Scene {
    constructor() {
        super({ key: 'Credits', active: true })
    }

    preload() { }

    create() {
        var creditsContorn = this.add.text(690, 16, ' JORDI COMA ', { font: "55px Pokemon_Solid", fill: "blue" });
        var creditsContent = this.add.text(690, 16, ' JORDI COMA ', { font: "54.8px Pokemon_Hollow", fill: "yellow" });
        const welcomeBack = this.add.text(290, 16, ' Tornar ↩ ', { font: "55px Pokemon_Hollow", fill: "#eeeeee" });

        welcomeBack.setInteractive();
        welcomeBack.on('pointerdown', () => {
            this.scene.remove("Credits");
            var menu = new Menu();
            this.scene.add("Menu", menu);
        })

    }

    update(time, delta) {
        // console.log(foo);

    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene', active: true });
        self.play;
        self.pause;
    }

    preload() {
        this.load.image('play', 'assets/play.png');
        this.load.image('pause', 'assets/pause.png');
    }

    create() {
        var jocPausat;
        self.play = this.add.image(450, 50, 'play');     //
        self.pause = this.add.image(350, 50, 'pause');    //  cal revisar mides i funcionalitat

        self.play.setScale(.5);
        self.pause.setScale(.5);


        self.play.setInteractive();

        self.play.on('pointerdown', () => {
            this.scene.resume("PongGame");
            jocPausat.destroy();
        })

        self.pause.setInteractive();

        self.pause.on('pointerdown', () => {
            if (this.scene.isActive("PongGame")) {
                this.scene.pause("PongGame");
                jocPausat = this.add.text(250, 250, ' JOC PAUSAT! PREN UN DESCANS', { font: "55px Pokemon_Hollow", fill: "#eeeeee" });
            }
        })

    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var config = {
    type: Phaser.AUTO,
    width: 1536,
    height: 753,
    scene: [Previa]
}

var game = new Phaser.Game(config);

/**
 * 
 * this.scene.add("SceneJoc", SceneJoc);    -   C R E A R
 * this.scene.remove("SceneMenu");          -   E S B O R R A R
 * this.scene.get(ScenePuntuacio).incrementa(novaPuntuacio)                           -   O B T E N I R / P A S S A R 
 * 
 * pause(key)   -   Parar update, però es dibuixa l'escena.
 * resume(key)  -   Engega update.
 * 
 * sleep(key)   -   Parar update, no es dibuixa.
 * wake(key)    -   
 * 
 * switch(key)  <->   sleep(actual), engegar
 * 
 *  console.log(self);   //Així podem imprimir tota imprimir tota la variable 
 * 
 *   C R E A R   E S C E N A   N O V A
 *   var novaScene = new SceneB();
 *   this.scene.add('SceneB', novaScene, true)
 * 
 */