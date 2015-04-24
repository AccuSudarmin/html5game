var loop = null;
function Game () {
	var G = {}

	G.setup = function (idcanvas, setting) {

		if (document.getElementById(idcanvas)) {

			G.canvas = document.getElementById(idcanvas);

		} else {

			G.canvas = document.createElement('canvas');
			document.body.appendChild(G.canvas);

		}

		G.canvas.setAttribute('tabindex', '0');
		G.canvas.width = setting.w || 400;
		G.canvas.height = setting.h || 400;
		G.ctx = G.canvas.getContext("2d");
		
		return this;

	} 

	G.module = function (mod) {
		
		var array = mod.split(',');

		for (var i = 0; i < array.length; i++) {
			var mod = array[i];
			if (G._isFunction(mod)){
				G[mod] = new window[mod](G);
			} else {
				console.log('Sorry module \"' + mod + '\" not available');
			}
		};

		return this;
	}

	G._isFunction = function(obj) {
		return typeof window[obj] === 'function';
	}
	
	G.startScene = function (scene) {
		console.log('starting game');
		G.sceneActive = scene;
		G.stageScene[scene].draw();

		G.loop = function(){
			G.stageScene[scene].update();

			G.looping = window.requestAnimationFrame(G.loop);
		};

		G.looping = window.requestAnimationFrame(G.loop);
	};

	G.stopScene = function () {
		window.cancelAnimationFrame(G.looping);
	};

	G.controller = function () {
		var keyName = {
  			32: 'space',
  			37: 'left',
  			38: 'up',
  			39: 'right',
  			40: 'down'
		}

		G.keystate = {};

		G.canvas.addEventListener("keydown", function(e){
			G.keystate[keyName[e.keyCode]] = true;
		})

		G.canvas.addEventListener("keyup", function(e){
			delete G.keystate[keyName[e.keyCode]];
		})

		return this;
	}


	G.draw= function (scene) {
		G.stageScene[scene].draw();
	}

	G.loadTexture = function(imgArray, callback) {
		G.img = {};
		G.img[imgArray[0].imgName] = new Image();
		G.img[imgArray[0].imgName].src = imgArray[0].imgLoc;
		G.img[imgArray[0].imgName].onload = function(){
			callback.call();
		}
	}

	return G;
}