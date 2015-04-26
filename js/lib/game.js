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
		G.canvas.width = setting.W || document.body.clientWidth;
		G.canvas.height = setting.H || document.body.clientHeight;
		G.canvas.style.width = G.canvas.width + "px";
		G.canvas.style.height = G.canvas.height + "px";
		G.canvas.focus();
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
  			37: 'leftArrow',
  			38: 'upArrow',
  			39: 'rightArrow',
  			40: 'downArrow'
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

	G.loadSheet = function(imgArray, callback) {
		var hasLoad = 0;
		G.img = {};
		for (var i = 0; i < imgArray.length; i++) {
			G.img[imgArray[i].imgName] = new Image();
			G.img[imgArray[i].imgName].src = imgArray[i].imgLoc;
			G.img[imgArray[i].imgName].onload = function(){
				hasLoad += 1;
				if (hasLoad == imgArray.length) {
					callback.call();
				};
			}
		};
	}

	return G;
}