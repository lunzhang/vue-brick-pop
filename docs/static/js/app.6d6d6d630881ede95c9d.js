webpackJsonp([1],{"1ENH":function(r,o,t){"use strict";var e=function(){var r=this,o=r.$createElement,t=r._self._c||o;return t("div",{attrs:{id:"app"}},r._l(r.board,function(o,e){return t("div",r._l(o,function(o,a){return t("div",{staticClass:"brick",style:{backgroundColor:o.color},on:{click:function(o){r.pop(e,a)}}})}))}))},a=[],i={render:e,staticRenderFns:a};o.a=i},FQIG:function(r,o){},M93x:function(r,o,t){"use strict";function e(r){t("FQIG")}var a=t("xJD8"),i=t("1ENH"),n=t("VU/8"),s=e,p=n(a.a,i.a,!1,s,null,null);o.a=p.exports},NHnr:function(r,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var e=t("7+uW"),a=t("M93x");e.a.config.productionTip=!1,new e.a({el:"#app",template:"<App/>",components:{App:a.a}})},xJD8:function(r,o,t){"use strict";var e=t("fZjL"),a=t.n(e),i=t("woOf"),n=t.n(i),s=["#ffffff","#FFCDD2","#C5CAE9","#FFF9C4","#C8E6C9","#D1C4E9","#F5F5F5"],p={type:0,color:s[0]},d=0;o.a={name:"app",data:function(){return{board:[[],[],[],[],[],[],[],[],[],[]],score:0,currentColors:[1,2,3],poppedRange:{}}},created:function(){this.initBoard()},methods:{initBoard:function(){for(var r=0;r<10;r++)for(var o=0;o<10;o++){var t=Math.floor(Math.random()*this.currentColors.length);this.board[r][o]={type:this.currentColors[t],color:s[this.currentColors[t]]}}console.log(this.board)},pop:function(r,o){if(0!==this.board[r][o].type){var t=this.board[r][o].type;d=0,this.poppedRange={},this.poppedRange[o]=r,this.traversePop(r,o,t),this.dropBricks(),this.slideBricks(),this.score+=d}},traversePop:function(r,o,t){this.board[r].splice(o,1,n()({},p)),d+=1,(this.board[r-1]?this.board[r-1][o].type:null)===t&&this.traversePop(r-1,o,t),(this.board[r+1]?this.board[r+1][o].type:null)===t&&this.traversePop(r+1,o,t),(this.board[r][o+1]?this.board[r][o+1].type:null)===t&&this.traversePop(r,o+1,t),(this.board[r][o-1]?this.board[r][o-1].type:null)===t&&this.traversePop(r,o-1,t),void 0===this.poppedRange[o]?this.poppedRange[o]=r:void 0!==this.poppedRange[o]&&this.poppedRange[o]<r&&(this.poppedRange[o]=r)},dropBricks:function(){var r=this;a()(this.poppedRange).forEach(function(o){for(var t=r.poppedRange[o]-1;t>=0;t--)0!==r.board[t][o].type&&void 0!==r.board[t+1]&&0===r.board[t+1][o].type&&(r.board[t+1].splice(o,1,r.board[t][o]),r.board[t].splice(o,1,n()({},p)),r.dropBricks())})},slideBricks:function(){var r=this;a()(this.poppedRange).reverse().forEach(function(o){var t=parseInt(o,10);if(0===r.board[9][t].type)for(var e=t;e<r.board[9].length-1;e++){for(var a=[],i=0;i<r.board.length;i++)a.push(r.board[i][e+1]);for(var s=0;s<r.board.length;s++)r.board[s].splice(e,1,a[s]),r.board[s].splice(e+1,1,n()({},p))}})}}}}},["NHnr"]);
//# sourceMappingURL=app.6d6d6d630881ede95c9d.js.map