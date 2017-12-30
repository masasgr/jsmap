/* Copyright 2008 CogniTom Academic Design & Tsutomu Kawamura
 * http://jsmap.cognitom.com/
 * office@cognitom.com
 * ------------------------------------------------------------------
 *
 * jsmap
 *
 * - version 0.9.5
 * - release 2008.6.9
 * 
 * ------------------------------------------------------------------
 * 本スクリプトは、Apache License Version 2.0に基づいてライセンスされます。
 * あなたがこのファイルを使用するためには、本ライセンスに従わなければなりません。
 * 本ライセンスのコピーは下記の場所から入手できます。
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * 適用される法律または書面での同意によって命じられない限り、本ライセンスに基づい
 * て頒布されるソフトウェアは、明示黙示を問わず、いかなる保証も条件もなしに「現状
 * のまま」頒布されます。本ライセンスでの権利と制限を規定した文言については、本ラ
 * イセンスを参照して下さい。
 * ------------------------------------------------------------------
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * Region
 */
var mapRegions = [];
var mapRegion = function(d){
	this.initialize = function(d){
		mapRegions.push(this);//グローバル配列に登録
		this.name = d.name;//地方名
		this.line = d.line;//分割線位置
		this.data = d.data;//都道府県マップデータ
		this.order = d.order;//カーソルの移動順
		this.mapC2P = new Array(d.data.length);//カーソル移動順のマップデータ位置
		this.mapP2C = new Array(d.data.length);//mapP2Cの逆マップ
		for (var cur=0; cur<this.order.length; cur++){
			var pos = this.getPosByShortName(this.order[cur]);
			this.mapC2P[cur] = pos;
			this.mapP2C[pos] = cur;
		}
	};
	this.pos2cur = function(pos){ return (0 <= pos && pos < this.order.length) ? this.mapP2C[pos] : -1; };
	this.cur2pos = function(cur){ return (0 <= cur && cur < this.order.length) ? this.mapC2P[cur] : -1; };
	this.getStateByCursor = function(cur){ var pos = this.cur2pos(cur); if (pos<0) return null; else return this.data[pos] };
	this.getPosByShortName = function(shortName){ for (var i=0; i<this.data.length; i++) if (this.data[i][0] == shortName) return i; return -1 };
	this.getPosByLongName = function(longName){ for (var i=0; i<this.data.length; i++) if (this.data[i][1] == longName) return i; return -1 };
	
	this.initialize(d);//コンストラクタ呼び出し
};

/**
 * Field
 */
var mapFields = {};
var mapField = function(id){
	this.initialize = function(id){
		mapFields[id] = this;//グローバル配列に登録
		this.id = id;//input要素のid
		this.regionNum = 1;//表示中の地方番号(日本の場合は0〜3)
		this.cur = -1;//フォーカス位置(カーソル移動順の何番目か)
		this.hiding = true;
		this.refocusing = false;
		this.supressClickTimer = false;
		
		var elm = document.getElementById(id);
		eval("var f1 = function(e){ mapFields['"+this.id+"'].evFocus(e); };"); elm.onfocus = f1;
		eval("var f2 = function(e){ mapFields['"+this.id+"'].evBlur(e); };"); elm.onblur = f2;
		eval("var f3 = function(e){ mapFields['"+this.id+"'].evMouseDown(e); };"); elm.onmousedown = f3;
		
		var prt = elm.parentNode;
		var div = document.createElement('div');
		div.id = 'map_'+id; div.className = 'jsmap';
		prt.insertBefore(div,elm);
		
		this.changeRegion(this.regionNum);
	};
	this.evFocus = function(e){ this.show(); this.supressClick(); };
	this.evBlur = function(e){ this.hide(); this.clearKeyDown(); };
	this.evMouseDown = function(e){ if (this.supressClickTimer) return; if (this.hiding) this.show(); else this.hide(); };
	this.supressClick = function(){ if (!this.supressClickTimer) this.supressClickTimer = setTimeout("mapFields['"+this.id+"'].supressClickTimer = false;", 100); };
	this.changeRegion = function(num){
		this.regionNum = num;
		this.region = mapRegions[this.regionNum];
		var html = '';
		//ボディー
		html += '<ul class="body">';
		for (var pos=0; pos<this.region.data.length; pos++){
			var arr = this.region.data[pos];
			var s = (arr[7]) ? arr[0].substr(0,1)+'<br />'+arr[0].substr(1,1) : arr[0];
			var l = (arr[7]) ? '14' : (arr[6] ? arr[3]+arr[6] : arr[3]);
			if (isIE){ var w = arr[2]+4; var h = arr[3]+4; var x = arr[4]-2; var y = arr[5]-2; }
				else { var w = arr[2]; var h = arr[3]; var x = arr[4]; var y = arr[5]; }
			var cur = this.region.pos2cur(pos);
			html += '<li id="'+this.id+'_li_'+cur+'" onmousedown="mapFields[\''+this.id+'\'].setAndHide()" onmouseover="mapFields[\''+this.id+'\'].focus('+cur+')" style="width:'+w+'px;height:'+h+'px;line-height:'+l+'px;left:'+x+'px;top:'+y+'px;">'+s+'</li>';
		}
		if (this.region.line){
			var x = this.region.line[0]; var y = this.region.line[1]; var l = this.region.line[2]; 
			html += '<span style="left:'+x+'px;top:'+y+'px;height:'+l+'px;"></span>';
		}
		html += '</ul>';
		//ヘッダ
		html += '<ul class="header">';
		var n;
		n = (this.regionNum > 0) ? this.regionNum-1 : mapRegions.length-1;
		html += '<li class="right" onmouseover="mapTheme.header.highlight(this)" onmouseout="mapTheme.header.dehighlight(this)" onmousedown="mapFields[\''+this.id+'\'].goPrevRegion(); return false;"><span>'+mapRegions[n].name+'</span></li>';
		n = (this.regionNum < mapRegions.length-1) ? this.regionNum+1 : 0;
		html += '<li class="left" onmouseover="mapTheme.header.highlight(this)" onmouseout="mapTheme.header.dehighlight(this)" onmousedown="mapFields[\''+this.id+'\'].goNextRegion(); return false;"><span>'+mapRegions[n].name+'</span></li>';
		html += '</ul>';
		document.getElementById('map_'+this.id).innerHTML = html;
	};
	this.nextRegion = function(focusFlag){
		var n = (this.regionNum+1 < mapRegions.length) ? this.regionNum+1 : 0;
		this.changeRegion(n);
		if (!focusFlag) this.cur = -1;
			else this.focus(0);
	};
	this.prevRegion = function(focusFlag){
		var n = (this.regionNum > 0) ? this.regionNum-1 : mapRegions.length-1;
		this.changeRegion(n);
		if (!focusFlag) this.cur = this.region.order.length; 
			else this.focus(this.region.order.length-1);
	};
	this.goNextRegion = function(){ this.nextRegion(); this.refocusing = true; document.getElementById(this.id).focus(); };
	this.goPrevRegion = function(){ this.prevRegion(); this.refocusing = true; document.getElementById(this.id).focus(); };
	this.show = function(){
		document.getElementById('map_'+this.id).style.display = 'block';
		this.setKeyDown();
		if (this.refocusing) this.refocusing = false;
			else this.focusByInput();
		this.hiding = false;
	};
	this.focus = function(cur){
		if (this.cur >= 0 && (li = document.getElementById(id+'_li_'+this.cur))) mapTheme.state.dehighlight(li);
		this.cur = cur;
		if (li = document.getElementById(id+'_li_'+this.cur)) mapTheme.state.highlight(li);
	};
	this.focusNext = function(){ var cur = this.cur+1; if (cur >= this.region.order.length) this.nextRegion(true); else this.focus(cur); };
	this.focusPrev = function(){ var cur = this.cur-1; if (cur < 0) this.prevRegion(true); else this.focus(cur); };
	this.focusByInput = function(){
		var longName = document.getElementById(this.id).value;
		var pos = this.region.getPosByLongName(longName);
		if (pos >= 0){
			this.focus(this.region.pos2cur(pos));
		} else {
			for (var i=0; i<mapRegions.length; i++)
				if (this.regionNum != i){
					pos = mapRegions[i].getPosByLongName(longName);
					if (pos >= 0){
						this.changeRegion(i);
						this.focus(mapRegions[i].pos2cur(pos));
					}
				}
		}
	};
	this.setAndHide = function(){ this.set(); this.hide(); };
	this.set = function(){ if ((state = this.region.getStateByCursor(this.cur)) && (elm = document.getElementById(id))) elm.value = state[1]; };
	this.hide = function(){ document.getElementById('map_'+this.id).style.display = 'none'; this.hiding = true; };
	this.keydown = function(e){
		if (!e)
			e = event;
		if (elm = document.getElementById(this.id)){
			var c = (e.keyCode) ? e.keyCode : e.charCode;
			switch (c){
				case 63232: case 63276: case 33: case 38: if (this.hiding){ this.show(); } else { this.focusPrev(); this.set(); } return false;//[↑]キー
				case 63233: case 63277: case 34: case 40: if (this.hiding){ this.show(); } else { this.focusNext(); this.set(); } return false;//[↓]キー
				case 63234: case 39: this.prevRegion(); return false;//[→]キー
				case 63235: case 37: this.nextRegion(); return false;//[←]キー
				case 13: case 27: this.hide(); return false;//[esc]キー or [enter]キー
				case 9: return true;//[tab]キー
				//default: elm.value=c;return false;
			}
		}
	};
	this.setKeyDown = function(){ 
		eval("var keydown = function(e){ return mapFields['"+this.id+"'].keydown(e); };");//thisをバインドするため
		if (isIE) document.getElementById(this.id).onkeydown = keydown; else document.onkeydown = keydown;
	};
	this.clearKeyDown = function(){ if (isIE) document.getElementById(this.id).onkeydown = null; else document.onkeydown = null; };
	
	this.initialize(id);//コンストラクタ呼び出し
};

/**
 * Globals
 */
var mapPath;
if (isIE=='undefined') var isIE = (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent));

/**
 * Setups
 */
function setupJsmap(){
	var script;
	var scripts = document.getElementsByTagName("script");
	for (var i=0; i<scripts.length; i++){
		if (scripts[i].src && scripts[i].src.match(/jsmap\/map\.js(\?.*)?$/)){
			script = scripts[i];
		}
	}
	var locale = (tmp = script.src.match(/\?.*locale=([a-z0-9_]*)/)) ? tmp[1] : 'ja';//デフォルトで日本に設定
	var theme = (tmp = script.src.match(/\?.*theme=([a-z0-9_]*)/)) ? tmp[1] : 'simple';//デフォルトでsimpleに設定
	var path = script.src.replace(/map\.js(\?.*)?$/,'');
	document.write('<sc'+'ript type="text/javascript" src="'+path+'locale/'+locale+'/data.js"></script>');//ロケールデータ
	document.write('<sc'+'ript type="text/javascript" src="'+path+'theme/'+theme+'/theme.js"></script>');//テーマデータ
	document.write('<link rel="stylesheet" type="text/css" href="'+path+'theme/'+theme+'/layout.css" />');//テーマのCSSファイル
	
	if (window.attachEvent) window.attachEvent('onload', setupJsmapOnLoad);//IE
		else if (window.addEventListener) window.addEventListener('load', setupJsmapOnLoad, true);//W3C
			else window.onload = setupJsmapOnLoad;
	
	mapPath = path;
}
function setupJsmapOnLoad(){
	for (var i=0; i<mapData.length; i++) new mapRegion(mapData[i]);
	
	var inputs = document.getElementsByTagName("input");
	for (var i=0; i<inputs.length; i++){
		if (inputs[i].className && inputs[i].className == 'jsmap'){
			new mapField(inputs[i].id);
			inputs[i].style.backgroundImage = 'url('+mapPath+'locale/'+mapDataLocale+'/icon.gif)';
		}
	}
}
setupJsmap();
