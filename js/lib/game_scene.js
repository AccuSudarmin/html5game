function Scene(G){
	G.stageScene = {};

	var sceneObejct = function(){
		this.sprite = new Array();

		this.add = function(object) {
			this.sprite.push(object);
		};

		this.draw = function(){
			G.ctx.clearRect(0, 0, G.canvas.width, G.canvas.height);
			G.ctx.save();
			G.ctx.fillStyle = '#bebebe';
	
			for (var i = 0; i < this.sprite.length; i++) {
				this.sprite[i].setting();
			};

			G.ctx.restore();
		}

		this.update = function(){
			G.ctx.clearRect(0, 0, G.canvas.width, G.canvas.height);
			G.ctx.save();
			G.ctx.fillStyle = '#bebebe';
	
			for (var i = 0; i < this.sprite.length; i++) {
				this.sprite[i].draw();
			};

			G.ctx.restore();
		}
	}

	return function(sceneName, callback){
		G.stageScene[sceneName] = new sceneObejct();

		callback(G.stageScene[sceneName]);
	}
};