var G = new Game()
				.setup('canvas', {W: 400, H:400})
				.module('Sprite,Scene')
				.controller();

G.Sprite.extend('player', {
	init: function(){
		if (G.keystate.rightArrow) this.X += this.vel.X;
		if (G.keystate.leftArrow) this.X += -this.vel.X;

		if (G.keystate.space) {
			this.jump = true;
			this.Y -= 2;
		} else if (this.jump){
			if (this.Y === 340) this.jump = false;
			else this.Y += 2;
		}

		var self = this;

		this.collision('hit.left,hit.right', function(obj){
			if (obj.name == 'enemy') {
				obj.vel.X *= -1;
			};
		});

		this.collision('hit.top,hit.bottom', function(obj){
			if (obj.name == 'enemy') {
				obj.vel.Y *= -1;
			};
		});
	}
});

G.Sprite.extend('enemy', {
	init: function(){

		if (this.Y > G.canvas.height || 
			this.Y + this.H < 0 || 
			this.X > G.canvas.width || 
			this.X +this.W <0) {
			this.X =100;
			this.Y = 100;
		};

		this.Y += this.vel.Y;
		this.X += this.vel.X;

		if (this.X + this.W > G.canvas.width || this.X < 0) {
			this.vel.X *= -1;
			if (this.X < 0) {
				this.X = 0;
			}
			if (this.X + this.W > G.canvas.width) {
				this.X = G.canvas.width - this.W;
			};
		};

	}
});

G.Scene('level1', function(stage){
	stage.add(new G.player({
		Y: 350,
		W: 50,
		H: 50,
		vel: { Y:8, X:8 }
	}));

	stage.add(new G.player({
		Y: 0,
		W: 50,
		H: 50,
		vel: { Y:8, X:8 }
	}));

	stage.add(new G.enemy({ 
		X: 380,
		Y: 0,
		W: 20, 
		H: 20, 
		vel: { Y: 2, X: -2 }
	}));
});

sheet = [
	{imgName: 'motor', imgLoc: 'img/motor.png'},
	{imgName: 'car', imgLoc: 'img/car.png'}
];

G.loadSheet(sheet, function(){
	G.startScene('level1');
})