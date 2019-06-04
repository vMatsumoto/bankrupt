import Tile from '~/class/tileClass';
import fs from 'file-system';

class Board {
	constructor() {
		this.tile = this.generateTiles();
	}

	generateTiles() {
		let tiles = [];
		let i = 0;
		let file = fs.readFileSync(__dirname+'/config/gameConfig.txt', 'utf8');
		file = file.split('\n');
		for(let line of file) {
			line = line.split(/ +/g);
			let tile = new Tile(line[0], line[1]);
			tiles.push(tile);
		};
		return tiles;
	}
}

export default Board;
