function Sprite(G){
	this.extend = function(obj, newFunction){
		G[obj] = function (setup) {
			var obj = { 
 				X: 0,
 				Y: 0,
 				W: 10,
 				H: 10,
 				vel: {X: 2, Y: 2},
 				init: null,
 				image: null,
 				name: obj,
 				scene: null,

 				init: function(){

 				},

 				draw : function(){
 					this.init();
 					if (this.image != null) {
 						G.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.X, this.Y, this.W, this.H);
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

 							for (var i = 0; i < G.stageScene[G.sceneActive].sprite.length; i++) {
 								var hit = false;
 								var obj = G.stageScene[G.sceneActive].sprite[i];
 								if (obj != this) {

 									//hit top
									if (action.indexOf('hit.top') >= 0 &&
										this.intersect(obj) &&
										obj.Y < this.Y &&
										obj.vel.Y > 0) {
										hit = true;
									};

									// // hit bottom
									if (action.indexOf('hit.bottom') >= 0 &&
										this.intersect(obj) &&
										this.Y + this.H > obj.Y &&
										obj.vel.Y < 0) {
										hit = true;
									};

									// hit left
									if (action.indexOf('hit.left') >= 0 &&
										this.intersect(obj) &&
										obj.X < this.X && 
										obj.vel.X > 0) {
										hit = true;
									};

									if (action.indexOf('hit.right') >= 0 &&
										this.intersect(obj) &&
										this.X + this.W > obj.X &&
										obj.vel.X < 0){
										hit = true;
									}

									if (hit){
										callback(obj);
									}
 								};
							};
 							
 				},

 				setting: function(){
 					this.X = setup? setup.X || this.X : this.X;
 					this.Y = setup? setup.Y || this.Y : this.Y;
 					this.W = setup? setup.W || this.W : this.W;
 					this.H = setup? setup.H || this.H : this.H;
 					this.vel = setup? setup.vel || this.vel : this.vel;
 					this.image = setup? G.img[setup.image] || this.image : this.image;

 				},

 				destroy: function(){

 				}
 			}

 			for (var key in newFunction){
				obj[key] = newFunction[key];
			} 

 			return obj;
		}

	};
};