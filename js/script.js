var G = new Game()
				.setup('canvas', {
					w: 400 ,
					h: 400
				})
				.module('Sprite,Scene')
				.controller();

G.Sprite.extend('player', {
	init: function(){
		if (G.keystate.right) this.X += this.vel.X;
		if (G.keystate.left) this.X += -this.vel.X;

		if (G.keystate.space) {
			this.jump = true;
			this.Y -= 2;
		} else if (this.jump){
			if (this.Y === 340) this.jump = false;
			else this.Y += 2;
		}

		this.collision('hit.right,hit.left', function(obj){
			obj.vel.X *= -1;
		});

		this.collision('hit.top', function(obj){
			obj.vel.Y *= -1;
		});
	}
});

G.Sprite.extend('enemy', {
	init: function(){
		this.Y += this.vel.Y;
		this.X += this.vel.X;

		if (this.Y + this.H > G.canvas.height || this.Y < 0) {
			var offset = this.vel.Y < 0 ? 0 - this.Y : G.canvas.height - (this.Y+this.H);
			this.Y += 2*offset;
			this.vel.Y *= -1;
		}

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
		Y: 390,
		W: 50,
		H: 10,
		vel: { Y:8, X:8 }
	}));

	stage.add(new G.enemy({ 
		X: 0,
		W: 10, 
		H: 10, 
		vel: { Y: 4, X: 4 }
	}));
})

G.loadTexture([{imgName: 'motor', imgLoc: 'img/motor.png'}], function(){
	G.startScene('level1');
})