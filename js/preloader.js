(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(320, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      this.load.image('bCircle', 'assets/bCircle.png');
      this.load.image('bWhite', 'assets/bWhite.png');
      this.load.image('bBlue', 'assets/bBlue.png');
      this.load.image('bRed', 'assets/bRed.png');
      this.load.image('enemyBlue', 'assets/enemyBlue.png');
      this.load.image('enemyRed', 'assets/enemyRed.png');
      this.load.spritesheet('buttonstart', 'assets/START.png', 285, 95);
      this.load.image('particleBlue', 'assets/particleBlue.PNG');
      this.load.image('particleRed', 'assets/particleRed.PNG');
      this.load.image('tailBlue', 'assets/tailBlue.png');
      this.load.image('tailRed', 'assets/tailRed.png');
      this.load.audio('musicLoop', 'assets/run_450.mp3');

      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['minijuego-1'] = window['minijuego-1'] || {};
  window['minijuego-1'].Preloader = Preloader;

}());
