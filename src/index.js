const readline = require("readline");

const { getColor } = require('./apiMock');

const minimist = require('minimist');

class ColorClass {
	constructor() {
		this.supportedColors = ['green', 'blue', 'red', 'white', 'black']

		const args = minimist(process.argv.slice(2))
		this.colorsInOrder = args['colors'] && args['colors'].split ? args['colors'].split(',') : ['green', 'red', 'blue']
		this.outputHex = args['output'] != 'RGB'
		this.syncOn = args['sync'] ?? false;
		this.colors = this.getColorPromises();
		this.generator = this.colorGenerator()

		this[this.syncOn ? 'synchronouslyFetch' : 'asynchronouslyFetch']()
	}

	async synchronouslyFetch() {
		this.rl = this.rl ?? readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		this.rl.question("Press ENTER to fetch the next color ", this.fetchColor.bind(this));
	}

	async asynchronouslyFetch() {

		const colors = await Promise.all(this.colors)
		const output = []
		colors.forEach(color => color ? output.push(color[this.outputHex ? 'HEX' : 'RGB']) : null)
		console.log(output);
	}

	async fetchColor(e) {
		const color = await Promise.resolve(this.generator.next().value)
		if (!color) {
			console.log('No more colors :,(\nGoodbye');
			this.rl.close()
			return;
		}
		console.log(color[this.outputHex ? 'HEX' : 'RGB']);
		this.synchronouslyFetch();
	}

	getColorPromises() {
		const colors = [];
		this.colorsInOrder.forEach(color => {
			if (this.supportedColors.indexOf(color) != -1) {
				colors.push(getColor(color));
			} else {
				console.log('------------------------------')
				console.log(`!!! The color ${color} is not supported !!!`)
				console.log('------------------------------')				
			}
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
