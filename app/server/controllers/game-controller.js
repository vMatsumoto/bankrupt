import Board from '~/class/boardClass';
import Player from '~/class/playerClass';

const gameController = {
	match() {
		try {
			// console.log("Start of match");
			let board = new Board();
			var players = gameController.generatePlayers();
			var bankrupted = 0;

			for(var turns=0; turns<1000; turns++) {
				let j = 0;
				if(bankrupted == players.length-1) break;
				for(j; j<=3; j++) {
					if(players[j].bankrupt) continue;
					players[j].move();
					let position = players[j].position;
					// console.log(`Player${players[j].id} moved to tile ${position}`);
					if(!board.tile[position].owner) {
						if(players[j].buy(board.tile[position].rentValue, board.tile[position].saleValue)) {
							// console.log(`Player${players[j].id} bought tile ${position}`)
							players[j].subtractBudget(board.tile[position].saleValue);
							board.tile[position].owner = players[j].id;
						}
					} else {
						let owner = Number(board.tile[position].owner);
						players[j].subtractBudget(board.tile[position].rentValue);
						players[owner-1].setBudget(board.tile[position].rentValue);
						// console.log(`Player${players[j].id} paid rent to Player${owner}`);
					}
					if(players[j].bankrupt) {
						// console.log(`Player${players[j].id} went bankrupt`);
						gameController.resetOwner(players[j].id, board.tile);
						bankrupted++;
					}
				}
			}
			//console.log(turns);
			let winner = gameController.getWinner(players);
			let winCondition = 'bankrupt';
			if(turns == 1000) winCondition = 'time';
			let results = {
				winner: players[winner-1].behavior,
				turns: turns,
				winCondition: winCondition
			}
			return results;
		} catch (err) {
			return false;
		}
	},

	generatePlayers() {
		let players = [];
		let i = 1;
		while(i <= 4) {
			players.push(new Player(i));
			i++;
		}
		return players;
	},

	resetOwner(ownerId, tiles) {
		tiles.forEach((tile) => {
			if(tile.owner == ownerId) {
				tile.owner = null;
			}
		})
	},

	getWinner(players) {
		let winner = null;
		let budget = 0;
		let player = 0;
		for(player; player <= 3; player++){
			if(players[player].budget > budget) {
				winner = players[player].id;
				budget = players[player].budget;
			}
		};
		return winner;
	},

	runMultipleMatches(req, res) {
		try {
			let results = {
				impulsivo: {
					wins: 0,
				},
				exigente: {
					wins: 0,
				},
				cauteloso: {
					wins: 0,
				},
				aleatorio: {
					wins: 0,
				},
				turns: 0,
				timeout: 0
			};
			let i = 1;
			for(i; i<301; i++) {
				let result = gameController.match();
				switch(result.winner) {
					case 'impulsivo':
						results.impulsivo.wins++;
						break;
					case 'exigente':
						results.exigente.wins++;
						break;
					case 'cauteloso':
						results.cauteloso.wins++;
						break;
					case 'aleatorio':
						results.aleatorio.wins++;
						break;
				}
				results.turns += result.turns;
				if(result.winCondition == 'time') results.timeout++;
			}
			results.turns = (Number(results.turns)/300);
			results.impulsivo.winsPercentage = (results.impulsivo.wins*100)/300;
			results.exigente.winsPercentage = (results.exigente.wins*100)/300;
			results.cauteloso.winsPercentage = (results.cauteloso.wins*100)/300;
			results.aleatorio.winsPercentage = (results.aleatorio.wins*100)/300;
			return res.send(200, results);
		} catch(err) {
			return res.send(500, err.message);
		}
	}
}

export default gameController;