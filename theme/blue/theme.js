/* Copyright 2008 CogniTom Academic Design & Tsutomu Kawamura
 * http://jsmap.cognitom.com/
 * office@cognitom.com
 *
 * jsmap 0.9.5
 *
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

// ** Theme
var mapTheme = {
	'state':{
		'highlight':function(elm){
			elm.style.backgroundColor = '#5c8cad';
			elm.style.color = '#ffffff';
		},
		'dehighlight':function(elm){
			elm.style.backgroundColor = '';
			elm.style.color = '';
		}
	},
	'header':{
		'highlight':function(elm){
			elm.style.color = '#9db8d7';
			switch (elm.className){
				case 'left': elm.style.backgroundImage = 'url('+mapPath+'theme/blue/header-left-over.png)'; break;
				case 'right': elm.style.backgroundImage = 'url('+mapPath+'theme/blue/header-right-over.png)'; break;
			}
		},
		'dehighlight':function(elm){
			elm.style.color='';
			elm.style.backgroundImage = '';
		}
	}
};