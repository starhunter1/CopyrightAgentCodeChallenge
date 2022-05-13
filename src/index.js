const readline = require("readline");

const { getColor } = require('./apiMock');

class ColorClass {
	constructor() {
		this.colorOrderJson = process.argv[2]
		this.syncOn = process.argv[3] == 'true';
		this.colors = this.getColorPromises();
		this.generator = this.colorGenerator()

		this[this.syncOn ? 'synchronouslyFetch' : 'asynchronouslyFetch']()
	}

	async synchronouslyFetch() {
		this.rl = this.rl ?? readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		this.rl.question("Press enter to fetch the next color ", this.fetchColor.bind(this));
	}

	async asynchronouslyFetch() {

		const colors = await Promise.all(this.colors)
		const hexColors = []
		colors.forEach(color => color ? hexColors.push(color.HEX) : null)
		console.log(hexColors);
	}

	async fetchColor(e) {
		const color = await Promise.resolve(this.generator.next().value)
		if (!color) {
			console.log('No more colors :,(\nGoodbye');
			this.rl.close()
			return;
		}
		console.log(color.HEX);
		this.synchronouslyFetch();
	}

	getColorPromises() {
		const colors = [];
		const order = JSON.parse(this.colorOrderJson)
		order.forEach(color => {
			colors.push(getColor(color));
		});
		return colors;
	}

	colorGenerator = function* () {
		let index = 0;
		while (index <= this.colors.length) {
			yield this.colors[index];
			index++;
		}
	}
}

const colorClass = new ColorClass()

/*
To run application:
node ~/code-challenge/src/index.js true false true '["green","blue", "red"]'
*/
