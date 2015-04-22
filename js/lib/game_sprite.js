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

 				on: function(action, callback) {
 					switch (action){
 						case 'hit.top':
 							for (var i = 0; i < G.stageScene[G.sceneActive].sprite.length; i++) {
 								var obj = G.stageScene[G.sceneActive].sprite[i];
 								if (obj != this) {
									if (this.Y <= obj.Y + obj.H && obj.X < this.X + this.W && this.X < obj.X + obj.W) {
										callback(obj);
									};
 								};
							};
 							break;
 						case 'hit.bottom':
 							
 							break;
 					}
 				},

 				setting: function(){
 					this.X = setup? setup.X || this.X : this.X;
 					this.Y = setup? setup.Y || this.Y : this.Y;
 					this.W = setup? setup.W || this.W : this.W;
 					this.H = setup? setup.H || this.H : this.H;
 					this.vel = setup? setup.vel || this.vel : this.vel;
 					this.image = setup? G.img[setup.image] || this.image : this.image;

 				}
 			}

 			for (var key in newFunction){
				obj[key] = newFunction[key];
			} 

 			return obj;
		}

	};
};