function Scene(G){
	G.stageScene = {};

	var sceneObejct = function(){
		var name = null;
		
		this.sprite = {};

		this.add = function(object) {
			var nama = (Math.floor((Math.random() * 10000) + 1));
			this.sprite[nama] = object;

			this.sprite[nama].sceneIndex = nama;
		};

		this.draw = function(){
			G.ctx.clearRect(0, 0, G.canvas.width, G.canvas.height);
			G.ctx.save();
			G.ctx.fillStyle = '#bebebe';
	
			for (var key in this.sprite){
				this.sprite[key].setting();
			};

			G.ctx.restore();
		}

		this.update = function(){
			G.ctx.clearRect(0, 0, G.canvas.width, G.canvas.height);
			G.ctx.save();
			G.ctx.fillStyle = '#bebebe';
	
			for (var key in this.sprite){
				this.sprite[key].draw();
			};

			G.ctx.restore();
		}
	}

	return function(sceneName, callback){
		G.stageScene[sceneName] = new sceneObejct();

		callback(G.stageScene[sceneName]);
	}
};