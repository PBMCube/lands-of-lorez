
TimesOfLores.UI = function (state) {

    Phaser.Group.call(this, state.game);

    this.state = state;
    this.walker = state.walker;
    this.character = state.character;

    this.keyFx = this.create(0, 0, 'itemsPickUp', 1);
    this.potionFx = this.create(0, 0, 'itemsPickUp', 2);

    this.healthBG = this.create(1, 1, 'healthBG');
    this.healthFill = this.create(1, 1, 'health');

    this.nsew = this.create(14, 0, 'nsew', 0);

    this.levelFont = game.add.retroFont('digits', 4, 6, 'L0123456789-+');
    this.levelFont.text = 'L1';
    this.levelImage = this.create(24, 0, this.levelFont);

    this.panel = this.create(0, 25, 'panel');

    this.keysFont = game.add.retroFont('digits', 4, 6, 'L0123456789-+');
    this.keysFont.text = '0';
    this.keysImage = this.create(20, 26, this.keysFont);

    this.goldFont = game.add.retroFont('digits', 4, 6, 'L0123456789-+');
    this.goldFont.text = '0';
    this.goldImage = this.create(5, 26, this.goldFont);

    this.keyFx.visible = false;
    this.potionFx.visible = false;

    return this;

};

TimesOfLores.UI.prototype = Object.create(Phaser.Group.prototype);
TimesOfLores.UI.prototype.constructor = TimesOfLores.UI;

TimesOfLores.UI.prototype.update = function () {

    this.nsew.frame = this.walker.facing;

    this.keysFont.text = this.character.keys.toString();
    this.goldFont.text = this.character.gold.toString();

    if (this.healthFill.width !== this.character.health)
    {
        this.healthFill.width = this.character.health;
    }

};

TimesOfLores.UI.prototype.show = function () {

    this.setAll('visible', true);

    this.keyFx.visible = false;
    this.potionFx.visible = false;

};

TimesOfLores.UI.prototype.hide = function () {

    //  Hide everything other than your health bar
    this.setAll('visible', false);

    this.healthBG.visible = true;
    this.healthFill.visible = true;

};

TimesOfLores.UI.prototype.pickUpKey = function () {

    this.keyFx.x = 0;
    this.keyFx.y = 0;
    this.keyFx.visible = true;

    this.walker.putTile(-1);
    this.state.map.refresh();

    //  play sound

    var tween = this.game.add.tween(this.keyFx).to( { y: -32 }, 700, Phaser.Easing.Quartic.In, true);
    tween.onComplete.add(this.gotKey, this);

};

TimesOfLores.UI.prototype.gotKey = function () {

    this.character.keys++;
    this.keyFx.visible = false;

};

TimesOfLores.UI.prototype.pickUpPotion = function () {

    this.potionFx.x = 0;
    this.potionFx.y = 0;
    this.potionFx.visible = true;

    this.walker.putTile(-1);
    this.state.map.refresh();

    //  play sound

    this.game.add.tween(this.healthFill).to( { width: 10 }, 700, Phaser.Easing.Quartic.In, true);

    var tween = this.game.add.tween(this.potionFx).to( { y: -32 }, 700, Phaser.Easing.Quartic.In, true);
    tween.onComplete.add(this.gotPotion, this);

};

TimesOfLores.UI.prototype.gotPotion = function () {

    this.character.setFullHealth();
    this.potionFx.visible = false;

};