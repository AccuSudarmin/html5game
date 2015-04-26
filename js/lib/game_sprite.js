function Sprite(G){
	this.extend = function(objName, newFunction){
		G[objName] = function (setup) {
			var obj = { 
 				X: 0,
 				Y: 0,
 				W: 10,
 				H: 10,
 				prevX: null,
 				prevY: null,
 				vel: {X: 2, Y: 2},
 				init: null,
 				sheet: null,
 				name: obj,
 				scene: null,

 				init: function(){

 				},

 				draw : function(){
 					this.prevY = this.Y;
 					this.prevX = this.X;
 					this.init();
 					if (this.sheet != null) {
 						G.ctx.drawImage(this.sheet, 0, 0, this.sheet.width, this.sheet.height, this.X, this.Y, this.W, this.H);
 					} else {
 						G.ctx.fillRect(this.X, this.Y, this.W, this.H)
 					}
 				},

 				intersect: function(obj) {
 					if (obj.X + obj.W >= this.X &&
 						obj.X <= this.X + this.W &&
 						obj.Y + obj.H >= this.Y  &&
 						obj.Y <= this.Y + this.H) {
 						return true;
 					} else {
 						return false;
 					}
 				},

 				collision: function(action, callback) {

 					var action = action.split(',');

 					for (var key in G.stageScene[G.sceneActive].sprite) {
 						var hit = false;
 						var obj = G.stageScene[G.sceneActive].sprite[key];
 						if (obj != this) {

 							//hit top
							if (action.indexOf('hit.top') >= 0 && this.intersect(obj) &&
								(obj.prevX > this.prevX || obj.prevX + obj.W > this.prevX) && 
								obj.prevY + obj.H < this.prevY) {
								hit = true;
							};

							// hit bottom
							if (action.indexOf('hit.bottom') >= 0 && this.intersect(obj) &&
								(obj.prevX > this.prevX || obj.prevX + obj.W > this.prevX) && 
								obj.prevY > this.prevY) {
								hit = true;
							};

							// hit left
							if (action.indexOf('hit.left') >= 0 && this.intersect(obj) &&
								(obj.prevY > this.prevY || obj.prevY + obj.H > this.prevY) && 
								(obj.prevX + obj.W < this.prevX)) {
								hit = true;
							};

							//hit right
							if (action.indexOf('hit.right') >= 0 && this.intersect(obj) &&
								(obj.prevY > this.prevY || obj.prevY + obj.H > this.prevY) && 
								obj.prevX > this.prevX + this.W) {
								hit = true;
							};

							if (action.indexOf('intersect') >= 0 && this.intersect(obj)) {
								hit = true;
							};

							if (hit){
								callback(obj);
							};
 						};
					};
 				},

 				setting: function(){
 					this.X = setup? setup.X || this.X : this.X;
 					this.Y = setup? setup.Y || this.Y : this.Y;
 					this.W = setup? setup.W || this.W : this.W;
 					this.H = setup? setup.H || this.H : this.H;
 					this.vel = setup? setup.vel || this.vel : this.vel;
 					this.sheet = setup? G.img[setup.sheet] || this.sheet : this.sheet;

 				},

 				destroy: function(){
 					delete G.stageScene[G.sceneActive].sprite[this.sceneIndex];
 				}
 			}

 			for (var key in newFunction){
				obj[key] = newFunction[key];
				obj.name = objName;
			} 

 			return obj;
		}
	};
};