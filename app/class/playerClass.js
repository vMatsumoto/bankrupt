import random from '~/lib/randomizer';
const behaviors = ['impulsivo', 'exigente', 'cauteloso', 'aleatorio'];

class Player {
	constructor(id) {
		this.name = `Player${id}`;
		this.id = id;
		this.behavior = behaviors[id-1];
		this.budget = 300;
		this.position = 0;
		this.bankrupt = false;
	}

	setBudget(value) {

		this.budget = Number(this.budget) + Number(value);
	}

	subtractBudget(value) {
		this.budget = Number(this.budget) - Number(value);
		if(this.budget < 0) this.bankrupt = true;
	}

	checkBudget(value) {
		if(this.budget >= value) return true;
		return false;
	}

	randomBuyIntent() {
		let randomNumber = 0;
		let i = 0
		for(i; i<=5; i++) {
			randomNumber += random(1, 100);
		}
		if(randomNumber/i >= 50) return true;
		else return false;
	}

	move() {
		let move = random();
		let newPosition = this.position + move;
		if(newPosition > 19) {
			newPosition = newPosition - 20;
		}
		if(this.position <= 19 && newPosition >= 0) {
			this.setBudget(100);
		}
		this.position = newPosition;
	}

	buy(rentValue, saleValue) {
		switch(this.behavior) {
			case 'impulsivo':
				if(this.budget >= saleValue) return true;
				return false;

			case 'exigente':
				if(this.budget >= saleValue && rentValue > 50) return true;
				return false;

			case 'cauteloso':
				if(this.budget >= saleValue && (this.budget - saleValue >= 80)) return true;
				return false;

			case 'aleatorio':
				if(this.budget >= saleValue && this.randomBuyIntent()) return true;
				return false;
		}
	}
}

export default Player;
