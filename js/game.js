(function (){
  'use strict';

  function Game() {
    this.player = null;
    this.Balls = null;
    this.bWhite = null;
    this.bBlue = null;
    this.bRed = null;
    this.bCircle = null;
    this.leftButton = null;
    this.rightButton = null;
    this.enemies = null;
    this.enemyRed = null;
    this.enemyBlue = null;
    this.speedRotation = 8;
    this.distanceCiercles = 100;
    this.enemyVelocity = 600;
    this.enemyTime = null;
    this.enemyGeneratingSpeed = 1000;
    this.score = 0;
    this.scoreString = '';
    this.maxScore = 0;
    this.maxScoreString = '';
    this.velocityLateralMove = 200; //poner a cero si no quieres que se mueva
    this.x = 0;
    this.y = 0;
    this.explosionBlue = null;
    this.explosionRed = null;
    this.explosionSpeed = 800;
    this.tailBlue = null;
    this.tailRed = null,
    this.tailEnemyBlue = null;
    this.tailEnemyRed = null;
    this.tailSpeed = 200;
    window['minijuego-1'].Global.maxscore=0;
    window['minijuego-1'].Global2.typegame;
  }

  Game.prototype = {

    create: function () {
      this.x = this.game.width / 2;
      this.y = this.game.height -150;
    
      this.music = this.game.add.audio('musicLoop', 1, true);
      this.music.play('', 0, 1, true);

      this.bCircle = this.game.add.sprite(this.x, this.y, 'bCircle');
      this.bWhite = this.game.add.sprite(this.x, this.y, 'bWhite');
      if(window['minijuego-1'].Global2.typegame===false)
      {
        this.bWhite.body.velocity.x = this.velocityLateralMove;
      }
      this.bWhite.name = 'bWhite'
      this.bBlue = this.game.add.sprite(this.x, this.y, 'bBlue');
      this.bBlue.name = 'bBlue';
      this.bRed = this.game.add.sprite(this.x, this.y, 'bRed');
      this.bRed.name = 'bRed';

      this.enemies = this.game.add.group();

      this.enemyBlue= this.game.add.group();
      this.enemyRed= this.game.add.group();

      this.enemies.add(this.enemyBlue._container);
      this.enemies.add(this.enemyRed._container);


      this.Balls = this.game.add.group();

      this.Balls.add(this.bRed);
      this.Balls.add(this.bRed);

      this.bCircle.anchor.setTo(0.5,0.5);
      this.bWhite.anchor.setTo(0.5,0.5);
      this.bBlue.anchor.setTo(0.5,0.5);
      this.bRed.anchor.setTo(0.5,0.5);
      this.bBlue.pivot.y = this.distanceCiercles;
      this.bRed.pivot.y = -this.distanceCiercles;

      //creacion del emisor de particulas azul//
      this.explosionBlue = this.game.add.emitter(0, 0, 200);
      this.explosionBlue.makeParticles('particleBlue');
      this.explosionBlue.minParticleScale = 0.1;
      this.explosionBlue.minParticleSpeed.setTo(-this.explosionSpeed, -this.explosionSpeed);
      this.explosionBlue.maxParticleSpeed.setTo(this.explosionSpeed, this.explosionSpeed);
      this.explosionBlue.gravity = 100;

      //creacion del emisor de particulas Roja//
      this.explosionRed = this.game.add.emitter(0, 0, 200);
      this.explosionRed.makeParticles('particleRed');
      this.explosionRed.minParticleScale = 0.1;
      this.explosionRed.minParticleSpeed.setTo(-this.explosionSpeed, -this.explosionSpeed);
      this.explosionRed.maxParticleSpeed.setTo(this.explosionSpeed, this.explosionSpeed);
      this.explosionRed.gravity = 100;
      
      /*//creacion del cola de particulas enemigo azul//
      this.tailEnemyBlue = this.game.add.emitter(0, 0, 200);
      //this.tailEnemyBlue.pivot.y = this.distanceCiercles;
      this.tailEnemyBlue.makeParticles('tailEnemyBlue');
      this.tailEnemyBlue.minParticleSpeed.setTo(0, this.tailSpeed);
      this.tailEnemyBlue.maxParticleSpeed.setTo(0, this.tailSpeed);
      this.tailEnemyBlue.gravity = 100;

      //creacion del cola de particulas enemigo Red//
      this.tailEnemyRed = this.game.add.emitter(0, 0, 200);
      //this.tailEnemyRed.pivot.y = this.distanceCiercles;
      this.tailEnemyRed.makeParticles('tailEnemyRed');
      this.tailEnemyRed.minParticleSpeed.setTo(0, this.tailSpeed);
      this.tailEnemyRed.maxParticleSpeed.setTo(0, this.tailSpeed);
      this.tailEnemyRed.gravity = 100;*/

      /*//creacion del cola de particulas azul//
      this.tailBlue = this.game.add.emitter(this.x, this.y, 200);
      this.tailBlue.pivot.y = this.distanceCiercles;
      this.tailBlue.makeParticles('tailBlue');
      this.tailBlue.minParticleSpeed.setTo(0, this.tailSpeed);
      this.tailBlue.maxParticleSpeed.setTo(0, this.tailSpeed);
      this.tailBlue.gravity = 100;
      this.tailBlue.start(false, 5000, 20);

      //creacion del cola de particulas Red//
      this.tailRed = this.game.add.emitter(this.x, this.y, 200);
      this.tailRed.pivot.y = -this.distanceCiercles;
      this.tailRed.makeParticles('tailRed');
      this.tailRed.minParticleSpeed.setTo(0, this.tailSpeed);
      this.tailRed.maxParticleSpeed.setTo(0, this.tailSpeed);
      this.tailRed.gravity = 100;
      this.tailRed.start(false, 5000, 20);*/

    this.leftButton = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightButton = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    
    this.scoreString = 'Score : ';
    this.scoreText = this.game.add.text(10, 10, this.scoreString + this.score, { fontSize: '34px', fill: '#fff' });

    this.maxScoreString = 'MaxScore : ';
    this.maxScoreText = this.game.add.text(this.game.width-200, 10, this.maxScoreString + window['minijuego-1'].Global.maxscore, { fontSize: '34px', fill: '#fff' });
    },

    createEnemies: function () {

        var baddie;

        // Of course, the baddies created will belong to their respective groups
        if (Math.random() > 0.5)
        {                
            baddie = this.enemyBlue.create(Math.random() * this.game.width, -100, 'enemyBlue');
            baddie.name='eBlue';
            baddie.body.velocity.y = this.enemyVelocity+10;

            //this.tailEnemyBlue.start(false, 5000, 20); 
            //this.tailEnemyBlue.body.velocity.y = this.enemyVelocity+10;
            /*this.tailEnemyBlue.x = baddie.x;
            this.tailEnemyBlue.y = baddie.y;
            this.tailEnemyBlue.y += this.enemyVelocity;*/
        }
        else
        {
            baddie = this.enemyRed.create(Math.random() * this.game.width, -100, 'enemyRed');
            baddie.name='eRed';
            baddie.body.velocity.y = this.enemyVelocity;

            //this.tailEnemyRed.start(false, 5000, 20); 
            //this.tailEnemyRed.body.velocity.y = this.enemyVelocity+10;
            /*this.tailEnemyRed.x = baddie.x;
            this.tailEnemyRed.y = baddie.y;
            this.tailEnemyRed.y += this.enemyVelocity;*/
        }        
    },

    update: function () {

      if (this.game.time.now > this.enemyTime)
      {
          for (var i = 0; i < 3; i++)
          {
              this.createEnemies();
          }
          this.enemyTime = this.game.time.now + this.enemyGeneratingSpeed;
      }

      /*x = this.input.position.x;
      y = this.input.position.y;
      cx = this.world.centerX;
      cy = this.world.centerY;

      angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
      this.player.angle = angle;

      /*dx = x - cx;
      dy = y - cy;
      scale = Math.sqrt(dx * dx + dy * dy) / 100;

      this.player.scale.x = scale * 0.6;
      this.player.scale.y = scale * 0.6;*/

      if( this.leftButton.isDown)
      {
        //this.bRed.x -= this.speedRotation;
        //this.bBlue.x -= this.speedRotation;
        this.bBlue.angle -= this.speedRotation;
        this.bRed.angle -= this.speedRotation;
        //this.tailBlue.angle -= this.speedRotation;
      }
      if(this.rightButton.isDown)
      {
        //this.bRed.x += this.speedRotation;
        this.bBlue.angle += this.speedRotation;
        this.bRed.angle += this.speedRotation;
        //this.tailBlue.angle += this.speedRotation;
      }

      if (this.game.input.pointer1.isDown){

        if ( (this.game.input.x <= (this.game.width/2)) && this.game.input.x >= 0 ){
      //  Move to the left
        this.bBlue.angle -= this.speedRotation;
        this.bRed.angle -= this.speedRotation;
    }

    if ( (this.game.input.x <= this.game.width) && this.game.input.x >= (this.game.width/2) ) {
      //  Move to the right
        this.bBlue.angle += this.speedRotation;
        this.bRed.angle += this.speedRotation;
    }

  }
  //MOVIMIENTO LATERAL// //comentar si no quieres el movimiento lateral
  if (!window['minijuego-1'].Global2.typegame) {
        this.bBlue.x = this.bWhite.x;
        this.bRed.x = this.bWhite.x;
        this.bCircle.x = this.bWhite.x;

        if (this.bWhite.x >= this.game.width-this.distanceCiercles){
          this.bWhite.body.velocity.x = -this.velocityLateralMove;
        }

        if (this.bWhite.x <= this.distanceCiercles){
          this.bWhite.body.velocity.x = this.velocityLateralMove;
        }
      }



      this.scoreText.content = this.scoreString + this.score;
      this.maxScoreText.content = this.maxScoreString + window['minijuego-1'].Global.maxscore;
      //Bola blanca con enemigos
      this.game.physics.overlap(this.bWhite, this.enemies, function (ball, enemmy) {
        this.score=0;
          if(this.score>window['minijuego-1'].Global.maxscore)
          {
             window['minijuego-1'].Global.maxscore=this.score;
          }
        this.game.stage.backgroundColor = '#000';
        this.game.state.start('menu');
        this.music.pause();
      } , null, this);

      //Bola roja con rojo
      this.game.physics.overlap(this.bRed, this.enemies, function (ball, enemmy) {

        if(enemmy.name==='eRed')
        {
          this.score+=1;
          this.explosionRed.start(true, 5000, null, 20);
          this.explosionRed.x = enemmy.x+25;
          this.explosionRed.y = enemmy.y+25;
          enemmy.kill();
          this.game.stage.backgroundColor = '#000';
        }
        else {
          if(this.score>window['minijuego-1'].Global.maxscore)
          {
             window['minijuego-1'].Global.maxscore=this.score;
          }
          this.score=0;
          this.game.state.start('menu');
          this.music.pause();
        }
      } , null, this);
      
      //Bola azul con rojo
      this.game.physics.overlap(this.bBlue, this.enemies, function (ball, enemmy) {
        if(enemmy.name==='eBlue')
        {
          this.score+=1;
          this.score+=1;
          this.explosionBlue.start(true, 5000, null, 20);
          this.explosionBlue.x = enemmy.x+25;
          this.explosionBlue.y = enemmy.y+25;
          enemmy.kill();
          this.game.stage.backgroundColor = '#000';
        }
        else {
          if(this.score>window['minijuego-1'].Global.maxscore)
          {
             window['minijuego-1'].Global.maxscore=this.score;
          }
          this.score=0;
          this.game.state.start('menu');
          this.music.pause();
        }
      } , null, this);

      this.game.physics.overlap(this.enemies, this.enemies, function (enemmy1, enemmy2) {
        enemmy1.kill();
        enemmy2.kill();
      } , null, this);
    },

    onInputDown: function () {
    }

  };


  window['minijuego-1'] = window['minijuego-1'] || {};
  window['minijuego-1'].Game = Game;

}());
	
bWhite