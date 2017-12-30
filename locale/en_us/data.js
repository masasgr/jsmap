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

// ** I18N United States
var mapDataLocale = 'en_us';
var mapData = [
	{
		'name':'NORTHEAST',
		'line':false,
		'data':[
			['ME','Maine',30,51,131,7],
			['NH','New Hampshire',16,34,113,24],
			['NY','New York',73,48,33,41,-15],
			['VT','Vermont',16,34,95,24],
			['MA','Massachusetts',38,21,95,60,-8],
			['RI','Rhode Island',13,9,113,72],
			['CT','Connecticut',16,9,95,72],
			['NJ','New Jersey',16,32,75,85],
			['PA','Pennsylvania',56,36,17,69]
		],
		'order':['ME','NH','VT','MA','RI','CT','NY','NJ','PA']
	},
	{
		'name':'SOUTH',
		'line':false,
		'data':[
			['MD','Maryland',31,26,146,6,12],
			['DE','Delaware',16,12,161,6],
			['WV','West Virginia',33,20,111,12,-8],
			['DC','Washington, D.C.',16,12,136,20],
			['VA','Virginia',33,12,132,34],
			['NC','North Carolina',33,12,132,48],
			['SC','South Carolina',20,15,145,62],
			['GA','Georgia',19,27,124,62,-4],
			['KY','Kentucky',37,20,93,26],
			['TN','Tennessee',37,12,93,48],
			['AL','Alabama',19,27,103,62,-4],
			['FL','Florida',18,31,114,86],
			['AR','Arkansas',33,26,58,48,-8],
			['LA','Louisiana',33,26,58,76,8],
			['MS','Mississippi',19,27,82,62,-4],
			['OK','Oklahoma',34,26,22,48],
			['TX','Texas',51,37,5,76]
		],
		'order':['DE','MD','DC','VA','NC','SC','GA','WV','KY','TN','AL','FL','MS','AR','LA','OK','TX']
	},
	{
		'name':'MIDWEST',
		'line':false,
		'data':[
			['OH','Ohio',23,25,147,63],
			['MI','Michigan',30,41,120,20],
			['IN','Indiana',17,31,128,63],
			['NE','Nebraska',56,23,17,61],
			['IA','Iowa',38,23,67,53],
			['WI','Wisconsin',27,34,99,27],
			['IL','Illinois',19,37,107,63],
			['MN','Minnesota',30,40,67,11],
			['MO','Missouri',30,32,75,78],
			['ND','North Dakota',48,23,17,11],
			['SD','South Dakota',48,23,17,36],
			['KS','Kansas',44,19,29,86]
		],
		'order':['OH','MI','IN','WI','IL','MN','IA','MO','ND','SD','NE','KS']
	},
	{
		'name':'WEST',
		'line':[63,9,107],
		'data':[
			['ID','Idaho',26,37,103,12,23],
			['MT','Montana',49,21,115,12],
			['WY','Wyoming',33,21,131,35],
			['CO','Colorado',34,21,140,58],
			['NM','New Mexico',28,25,140,81],
			['UT','Utah',23,28,115,51,8],
			['AZ','Arizona',23,29,115,81],
			['WA','Washington',28,16,73,12],
			['OR','Oregon',28,19,73,30],
			['CA','California',40,48,73,51,30],
			['NV','Nevada',23,31,90,51],
			['AK','Alaska',28,16,23,12],
			['HI','Hawaii',16,12,9,97]
		],
		'order':['MT','WY','CO','NM','ID','UT','AZ','WA','OR','NV','CA','AK','HI']
	}
];