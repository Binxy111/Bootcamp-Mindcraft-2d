const changeBColor = (toolitem) => {
	if (
		toolitem.id === 'shoval-item' ||
		toolitem.id === 'pickaxe-item' ||
		toolitem.id === 'axe-item'
	) {
		const toolsContainer = document.getElementById('tools-container');
		const arrOfTools = Array.prototype.slice.call(toolsContainer.children);
		arrOfTools.forEach((tool) => {
			if (tool.id !== 'inventory') {
				if (toolitem.className === tool.id) {
					tool.style.backgroundColor = Colors.blue;
					tool.children[1].children[0].style.color = Colors.white;
				} else {
					tool.style.backgroundColor = Colors.black;
					tool.children[1].children[0].style.color = Colors.blue;
				}
			}
		});
	}
};
const hideColor = (tool) => {
	tool.parentElement.style.backgroundColor = Colors.black;
	return;
};
function toolSelection(event) {
	const toolSelected = event.target;
	if (toolSelected.id === 'inventory') {
		hideColor(currentSelectedTool);
		inventoryFlag = true;
		return;
	} else {
		currentSelectedTool = toolSelected;
		inventoryFlag = false;
		changeBColor(toolSelected);
	}
}
const storeInStock = (material) => {
	inventortStack.push(material.className);
	inventory.className = material.className;
	material.className = Materials.block;
};
function action(e) {
	let position = e.target;
	if (
		inventoryFlag &&
		currentSelectedTool &&
		position.className === Materials.block
	) {
		position.className = inventory.className;
		inventory.className = 'inventory';
		inventoryFlag = false;
		currentSelectedTool = {};
	}
	if (currentSelectedTool !== '' && !inventoryFlag) {
		if (
			(currentSelectedTool.id === Tools.shoval &&
				position.className === Materials.dirt) ||
			(currentSelectedTool.id === Tools.shoval &&
				position.className === Materials.grass)
		) {
			storeInStock(position);
		}
		if (
			(currentSelectedTool.id === Tools.axe &&
				position.className === Materials.leaves) ||
			(currentSelectedTool.id === Tools.axe &&
				position.className === Materials.wood)
		) {
			storeInStock(position);
		}
		if (
			currentSelectedTool.id === Tools.pickaxe &&
			position.className === Materials.stone
		) {
			storeInStock(position);
		}
	}
}
const readytoPlay = (event) => {
	const c = event.target;
	table.style.opacity = 1;
	c.style.display = 'none';
	return;
};
toolBoxBtn.addEventListener('click', toolSelection);
startGame.addEventListener('click', readytoPlay);
function drowGrass(xAxis, yAxis) {
	for (let i = 0; i <= yAxis; i++) {
		drawSingleToolItem(xAxis, i, 'grass');
	}
}
function drowStone(xAxis, yAxis) {
	drawSingleToolItem(xAxis, yAxis, 'stone');
	drawSingleToolItem(xAxis, yAxis + 1, 'stone');
	drawSingleToolItem(xAxis, yAxis + 6, 'stone');
}

function drowDirt(xAxis, yAxis) {
	for (let i = yAxis; i >= xAxis; i--) {
		for (let j = 0; j <= yAxis; j++) {
			drawSingleToolItem(i, j, 'dirt');
		}
	}
}
function drowAwk(xAxis, yAxis) {
	for (let i = 0; i <= 4; i++) {
		drawSingleToolItem(xAxis + i, yAxis, 'awk');
	}
}
function drowLeaves(xAxis, yAxis) {
	for (let i = 3; i < 6; i++) {
		drawSingleToolItem(xAxis, i, 'leaves');
	}
	for (let i = 6; i < 9; i++) {
		for (let j = 15; j < 18; j++) {
			drawSingleToolItem(i, j, 'leaves');
		}
	}
	drawSingleToolItem(xAxis - 1, 4, 'leaves');
}
function selectingTools(e) {
	selectedTool = e.target;
}
function getPosition(id) {
	return document.getElementById(id);
}

function buildGame() {
	for (let i = 0; i < 20; i++) {
		const tr = document.createElement('tr');
		table.appendChild(tr);
		for (let j = 0; j < 20; j++) {
			const th = document.createElement('th');
			const div = document.createElement('div');
			div.setAttribute('id', 'x:' + i + '_' + 'y:' + j);
			div.className = Materials.block;
			th.appendChild(div);
			div.addEventListener('click', action);
			tr.appendChild(th);
		}
	}
	drawCloud(3, 4);
	drowGrass(14, 19);
	drowDirt(15, 19);
	drowLeaves(13, 6);
	drowAwk(9, 16);
	drowStone(13, 13);
}
buildGame();
function drawCloud(xAxis, yAxis) {
	drawSingleToolItem(xAxis, yAxis + 3, 'cloud');
	drawSingleToolItem(xAxis + 1, yAxis + 1, 'cloud');
	drawSingleToolItem(xAxis + 1, yAxis + 2, 'cloud');
	drawSingleToolItem(xAxis + 1, yAxis + 3, 'cloud');
	drawSingleToolItem(xAxis + 1, yAxis + 4, 'cloud');
	drawSingleToolItem(xAxis + 1, yAxis + 6, 'cloud');
	drawSingleToolItem(xAxis + 1, yAxis + 7, 'cloud');
	drawSingleToolItem(xAxis + 2, yAxis, 'cloud');
	drawSingleToolItem(xAxis + 2, yAxis + 1, 'cloud');
	drawSingleToolItem(xAxis + 2, yAxis + 2, 'cloud');
	drawSingleToolItem(xAxis + 2, yAxis + 3, 'cloud');
	drawSingleToolItem(xAxis + 2, yAxis + 4, 'cloud');
	drawSingleToolItem(xAxis + 2, yAxis + 5, 'cloud');
	drawSingleToolItem(xAxis + 2, yAxis + 6, 'cloud');
	drawSingleToolItem(xAxis + 2, yAxis + 7, 'cloud');
	drawSingleToolItem(xAxis + 3, yAxis + 4, 'cloud');
	drawSingleToolItem(xAxis + 3, yAxis + 5, 'cloud');
}
function drawSingleToolItem(xAxis, yAxis, toolname) {
	const index = 'x:' + xAxis + '_y:' + yAxis;
	const tool = document.getElementById(index);
	switch (toolname) {
		case (toolname = 'dirt'):
			tool.className = Materials.dirt;
			break;
		case (toolname = 'grass'):
			tool.className = Materials.grass;
			break;
		case (toolname = 'cloud'):
			tool.className = Materials.cloud;
			break;
		case (toolname = 'leaves'):
			tool.className = Materials.leaves;
			break;
		case (toolname = 'awk'):
			tool.className = Materials.wood;
			break;
		default:
			tool.className = Materials.stone;
			break;
	}
}
