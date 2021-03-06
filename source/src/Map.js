
TimesOfLores.Map = function (state) {

    Phaser.Group.call(this, state.game);

    this.walker = state.walker;
    this.character = state.character;
    this.sound = state.sound;

    //  bg
    this.wall0 = this.create(0, 0, 'wall0');

    //  far
    this.wall1 = this.create(0, 0, 'wall1');
    this.wall2 = this.create(0, 0, 'wall2');
    this.wall3 = this.create(0, 0, 'wall3');

    this.itemsFarLeft = this.create(-11, 0, 'itemsFar', 0);
    this.itemsFarRight = this.create(11, 0, 'itemsFar', 0);
    this.itemsFar = this.create(0, 0, 'itemsFar', 0);

    //  mid
    this.wall4 = this.create(0, 0, 'wall4');
    this.wall5 = this.create(0, 0, 'wall5');
    this.wall6 = this.create(0, 0, 'wall6');

    this.itemsMidLeft = this.create(-17, 0, 'itemsMid', 0);
    this.itemsMidRight = this.create(17, 0, 'itemsMid', 0);
    this.itemsMid = this.create(0, 0, 'itemsMid', 0);

    //  near
    this.wall7 = this.create(0, 0, 'wall7');
    this.wall8 = this.create(0, 0, 'wall8');

    this.itemsNearLeft = this.create(-16, 0, 'itemsNear', 0);
    this.itemsNearRight = this.create(16, 0, 'itemsNear', 0);
    this.itemsNear = this.create(0, 0, 'itemsNear', 0);

    //  Map
    this.walls = [
        [ this.wall1, this.wall3, this.wall2 ],
        [ this.wall4, this.wall6, this.wall5 ],
        [ this.wall7, this.wall0, this.wall8 ]
    ];

    return this;

}

TimesOfLores.Map.prototype = Object.create(Phaser.Group.prototype);
TimesOfLores.Map.prototype.constructor = TimesOfLores.Map;

/**
 * Show a single wall piece
 *
 * @method showWall
 * @param {Phaser.Image} wall - Wall piece
  */
TimesOfLores.Map.prototype.showWall = function (wall) {

    wall.visible = true;

    //  Provides wall-bob effect
    if (wall.key !== 'wall3' && wall.key !== 'wall6')
    {
        if (wall.frame === 0)
        {
            wall.frame = 1;
        }
        else
        {
            wall.frame = 0;
        }
    }

};

TimesOfLores.Map.prototype.canPass = function (direction) {

    var index = 0;

    if (direction === 0)
    {
        index = this.walker.getTileAhead().index;
    }
    else if (direction === 1)
    {
        index = this.walker.getTileLeft().index;
    }
    else if (direction === 2)
    {
        index = this.walker.getTileBehind().index;
    }
    else if (direction === 3)
    {
        index = this.walker.getTileRight().index;
    }

    if (index === 3 || index === 14)
    {
        //  Tile is a locked door or exit, you need to face it AND have enough keys
        if (direction === 0 && (this.character.keys > 0 || TimesOfLores.cheatKeys))
        {
            this.sound.play('door');

            this.character.keys--;

            if (this.character.keys < 0)
            {
                this.character.keys = 0;
            }

            return true;
        }
    }
    else
    {
        //  Not a locked door? Let them pass anyway then!
        return true;
    }
    
    //  You shall not pass!
    return false;

};

TimesOfLores.Map.prototype.getStart = function () {

    var data = this.walker.getMiniMap(16, 16); // reference missing?

};

TimesOfLores.Map.prototype.refresh = function () {

    this.setAll('visible', false);

    this.showWall(this.wall0);

    var tiles = this.walker.getTiles(3, 3);
    var i = 0;

    for (y = 0; y < 3; y++)
    {
        for (x = 0; x < 3; x++)
        {
            i = tiles[y][x];

            if (i === 2)
            {
                this.showWall(this.walls[y][x]);
            }
            else if (i === 3)
            {
                //  Locked wall door thingy
                if (x === 1 && y === 0)
                {
                    this.itemsFar.visible = true;
                    this.itemsFar.frame = 0;
                }
                else if (x === 1 && y === 1)
                {
                    this.itemsMid.visible = true;
                    this.itemsMid.frame = 0;
                }
                else
                {
                    this.showWall(this.walls[y][x]);
                }
            }
            else if (i === 6)
            {
                //  Locked wall door thingy
                if (x === 1 && y === 0)
                {
                    this.itemsFar.visible = true;
                    this.itemsFar.frame = 3;
                }
                else if (x === 1 && y === 1)
                {
                    this.itemsMid.visible = true;
                    this.itemsMid.frame = 3;
                }
                else
                {
                    this.showWall(this.walls[y][x]);
                }
            }
            //  tile ids, 1 = nothing, 2 = wall, 3 = locked door, 4 = key, 5 = potion,, 6 = empty, 7 = frog, 8 = duck, 9 = red, 10 = bat, 11 = snake, 12 = cat, 13 = start, 14 = exit
            else if (i > 3 && i !== 6)
            {
                //  sprite sheet index
                //  0 - lock, 1 = key, 2 = potion, 3 = exit, 4 = frog, 5 = duck, 6 = red, 7 = bat, 8 = snake, 9 = cat

                //  LEFT
                if (x === 0 && y === 0)
                {
                    this.itemsFarLeft.visible = true;
                    this.itemsFarLeft.frame = i - 3;
                }
                else if (x === 0 && y === 1)
                {
                    this.itemsMidLeft.visible = true;
                    this.itemsMidLeft.frame = i - 3;
                }
                else if (x === 0 && y === 2)
                {
                    // this.itemsNearLeft.visible = true;
                    // this.itemsNearLeft.frame = i - 3;
                }

                //  MID
                if (x === 1 && y === 0)
                {
                    this.itemsFar.visible = true;
                    this.itemsFar.frame = i - 3;
                }
                else if (x === 1 && y === 1)
                {
                    this.itemsMid.visible = true;
                    this.itemsMid.frame = i - 3;
                }
                else if (x === 1 && y === 2)
                {
                    this.itemsNear.visible = true;
                    this.itemsNear.frame = i - 3;
                }

                //  RIGHT
                if (x === 2 && y === 0)
                {
                    this.itemsFarRight.visible = true;
                    this.itemsFarRight.frame = i - 3;
                }
                else if (x === 2 && y === 1)
                {
                    this.itemsMidRight.visible = true;
                    this.itemsMidRight.frame = i - 3;
                }
                else if (x === 2 && y === 2)
                {
                    // this.itemsNearRight.visible = true;
                    // this.itemsNearRight.frame = i - 3;
                }
            }
        }
    }

}