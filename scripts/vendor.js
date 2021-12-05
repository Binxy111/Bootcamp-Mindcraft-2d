const table = document.querySelector('#newWorld');
const inventory = document.querySelector('#inventory');
const toolBoxBtn = document.querySelector('#tools-container');
const startGame = document.querySelector('.landing-page');

let inventoryFlag = false;
let currentSelectedTool = {};
const inventortStack = [];
const Tools = {
	pickaxe: 'pickaxe-item',
	shoval: 'shoval-item',
	axe: 'axe-item',
};
const Materials = {
	wood: 'oak',
	dirt: 'dirt',
	grass: 'grass',
	cloud: 'cloud',
	leaves: 'leaves',
	stone: 'stone',
	block: 'block',
};
const Colors = {
	black: 'black',
	green: 'green',
	red: 'red',
	yellow: 'yellow',
	white: 'white',
	blue: 'blue',
	lightblue: 'lightblue',
	lightgreen: 'lightgreen',
	lightgrey: 'lightgrey',
};
