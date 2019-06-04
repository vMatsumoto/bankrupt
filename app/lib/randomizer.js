let Randomizer = function(min = 1, max = 6) {

	return Number(Math.floor(Math.random() * (max - min + 1)) + 1);
}

export default Randomizer;
