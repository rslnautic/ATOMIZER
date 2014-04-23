(function() {
  'use strict';
 
  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
 
  }
 
  Menu.prototype = {
 
    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 3;
 
 
      this.titleTxt = this.add.bitmapText(x, y-150, 'ATOMIZER', {font: '80px minecraftia', align: 'center'});
      this.titleTxt.anchor.setTo(0.5, 0.5);
 
      y = y + this.titleTxt.height + 5;
      this.startTxt = this.add.bitmapText(x, y, 'NORMAL PRESS "1"', {font: '25px minecraftia', align: 'center'});
      this.startTxt.anchor.setTo(0.5, 0.5);
 
      this.startTxt = this.add.bitmapText(x, y+50, 'HARDCORE PRESS "2"', {font: '25px minecraftia', align: 'center'});
      this.startTxt.anchor.setTo(0.5, 0.5);
 
      this.input.onDown.add(this.onDown, this);
    },
 
    update: function () {
     if (this.input.keyboard.isDown(Phaser.Keyboard.ONE))
      {
        window['minijuego-1'].Global2.typegame= true;
        this.game.state.start('game');
      }
      if (this.input.keyboard.isDown(Phaser.Keyboard.TWO))
      {
        window['minijuego-1'].Global2.typegame=false;
        this.game.state.start('game');
      }
    },
 
    onDown: function () {
      this.game.state.start('game');
    }
  };
 
  window['minijuego-1'] = window['minijuego-1'] || {};
  window['minijuego-1'].Menu = Menu;
 
}());