var G = new Game()
				.setup('canvas', {
					w: 400 ,
					h: 400
				})
				.module('Sprite,Scene')
				.controller();

G.Sprite.extend('player', {
	init: function(){
		if (G.keystate[39]) this.X += this.vel.X;
		if (G.keystate[37]) this.X += -this.vel.X;

		if (G.keystate[38]) {
			this.jump = true;
			this.Y -= 2;
		} else if (this.jump){
			if (this.Y === 340) this.jump = false;
			else this.Y += 2;
		}

		this.on('hit.top', function(obj){
			obj.vel.Y = -obj.vel.Y;
		});
	}
});

G.Sprite.extend('enemy', {
	init: function(){
		this.Y += this.vel.Y;

		if (this.Y + this.H > G.canvas.height || this.Y < 0) {
			var offset = this.vel.Y < 0 ? 0 - this.Y : G.canvas.height - (this.Y+this.H);
			this.Y += 2*offset;
			this.vel.Y *= -1;
		} 

	}
});

G.Scene('level1', function(stage){
	stage.add(new G.player({
		Y: 340,
		W: 100,
		H: 60,
		image: 'motor'
	}));

	stage.add(new G.enemy({ 
		X: 50,
		W: 100, 
		H: 50, 
		vel: { Y: 3, X: 3 }
	}));
})

G.loadTexture([{imgName: 'motor', imgLoc: 'img/motor.png'}], function(){
	G.startScene('level1');
})