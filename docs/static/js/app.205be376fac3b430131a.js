webpackJsonp([1],{"1ENH":function(t,r,o){"use strict";var e=function(){var t=this,r=t.$createElement,o=t._self._c||r;return o("div",{attrs:{id:"app"}},[o("div",{attrs:{id:"board"}},t._l(t.board,function(r,e){return o("div",t._l(r,function(r,s){return o("div",{staticClass:"brick",style:{backgroundColor:r.color},on:{click:function(r){t.pop(e,s)}}})}))})),t._v(" "),o("div",{attrs:{id:"options"}},[o("div",[t._v("\n      High Score: "),o("span",[t._v(t._s(t.highScore))])]),t._v(" "),o("div",{attrs:{id:"score"}},[t._v("\n      Score: "),o("span",[t._v(t._s(t.score))])]),t._v(" "),o("div",{attrs:{id:"reset-btn"},on:{click:t.onReset}},[t._v("\n      Reset\n    ")])])])},s=[],i={render:e,staticRenderFns:s};r.a=i},FQIG:function(t,r){},M93x:function(t,r,o){"use strict";function e(t){o("FQIG")}var s=o("xJD8"),i=o("1ENH"),n=o("VU/8"),a=e,h=n(s.a,i.a,!1,a,null,null);r.a=h.exports},NHnr:function(t,r,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var e=o("7+uW"),s=o("M93x");e.a.config.productionTip=!1,new e.a({el:"#app",template:"<App/>",components:{App:s.a}})},xJD8:function(t,r,o){"use strict";var e=o("fZjL"),s=o.n(e),i=o("woOf"),n=o.n(i),a=["#ffffff","#FFCDD2","#C5CAE9","#FFF9C4","#C8E6C9","#D1C4E9"],h={type:0,color:a[0]},c=0;r.a={name:"app",data:function(){return{board:[[],[],[],[],[],[],[],[],[],[]],currentColors:[1,2,3],poppedRange:{},highScore:localStorage.getItem("vbp-high-score")||0,score:0}},created:function(){this.initBoard()},methods:{initBoard:function(){for(var t=0;t<10;t++)for(var r=0;r<10;r++){var o=Math.floor(Math.random()*this.currentColors.length);this.board[t].splice(r,1,{type:this.currentColors[o],color:a[this.currentColors[o]]})}console.log(this.board)},pop:function(t,r){var o=this.board[t-1]?this.board[t-1][r].type:null,e=this.board[t+1]?this.board[t+1][r].type:null,s=this.board[t][r+1]?this.board[t][r+1].type:null,i=this.board[t][r-1]?this.board[t][r-1].type:null,n=this.board[t][r].type;0===n||n!==o&&n!==e&&n!==s&&n!==i||(c=0,this.poppedRange={},this.poppedRange[r]=t,this.traversePop(t,r,n),this.dropBricks(),this.slideBricks(),this.score+=c*c,this.score>this.highScore&&(this.highScore=this.score,localStorage.setItem("vbp-high-score",this.highScore)),this.checkStatus())},traversePop:function(t,r,o){this.board[t].splice(r,1,n()({},h)),c+=1,(this.board[t-1]?this.board[t-1][r].type:null)===o&&this.traversePop(t-1,r,o),(this.board[t+1]?this.board[t+1][r].type:null)===o&&this.traversePop(t+1,r,o),(this.board[t][r+1]?this.board[t][r+1].type:null)===o&&this.traversePop(t,r+1,o),(this.board[t][r-1]?this.board[t][r-1].type:null)===o&&this.traversePop(t,r-1,o),void 0===this.poppedRange[r]?this.poppedRange[r]=t:void 0!==this.poppedRange[r]&&this.poppedRange[r]<t&&(this.poppedRange[r]=t)},dropBricks:function(){var t=this;s()(this.poppedRange).forEach(function(r){for(var o=t.poppedRange[r]-1;o>=0;o--)0!==t.board[o][r].type&&void 0!==t.board[o+1]&&0===t.board[o+1][r].type&&(t.board[o+1].splice(r,1,t.board[o][r]),t.board[o].splice(r,1,n()({},h)),t.dropBricks())})},slideBricks:function(){var t=this;s()(this.poppedRange).reverse().forEach(function(r){var o=parseInt(r,10);if(0===t.board[9][o].type)for(var e=o;e<t.board[9].length-1;e++){for(var s=[],i=0;i<t.board.length;i++)s.push(t.board[i][e+1]);for(var a=0;a<t.board.length;a++)t.board[a].splice(e,1,s[a]),t.board[a].splice(e+1,1,n()({},h))}})},onReset:function(){this.initBoard(),this.score=0},checkStatus:function(){return 0===this.board[9][0].type?(this.currentColors.length<a.length-1&&this.currentColors.push(this.currentColors.length+1),this.initBoard(),!0):(this.checkLoss(9,0)&&this.onReset(),!1)},checkLoss:function(t,r){var o=this.board[t][r].type;if(0===o)return!0;var e=this.board[t-1]?this.board[t-1][r].type:null,s=this.board[t][r+1]?this.board[t][r+1].type:null,i=!0,n=!0;return e!==o&&s!==o&&(null!==e&&(i=this.checkLoss(t-1,r)),!1===i?i:(null!==s&&(n=this.checkLoss(t,r+1)),!1!==n||n))}}}}},["NHnr"]);
//# sourceMappingURL=app.205be376fac3b430131a.js.map