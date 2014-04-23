window.onload = function () {
  'use strict';

  var game
    , ns = window['minijuego-1'];

  game = new Phaser.Game(640, 960, Phaser.AUTO, 'minijuego-1-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);

  game.state.start('boot');
};
