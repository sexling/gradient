const css = document.querySelector('h3');
const color1 = document.querySelector('.color1');
const color2 = document.querySelector('.color2');
const body = document.querySelector('body');
const button = document.querySelector('button');

const state = {
	color1: null,
	color2: null
};

const generateRGBHex = () => {
	const hexArr = [ null, null, null ];

	return hexArr
		.map((el) => {
			const random = Math.floor(Math.random() * 256);
			let hexNum = random.toString(16);

			if (random < 16) {
				hexNum = '0' + hexNum;
			}
			return hexNum;
		})
		.join('');
};

const refreshColorInputValues = () => {
	// hacky solution
	// with how jscolor works, after editing the value, the text input will change but will not change the color
	// until you click the input and then click outside of it and that's what these three lines replicate
	color1.focus();
	color2.focus();
	color1.focus();
};

const randomMizeGradient = () => {
	color1.value = '#' + generateRGBHex();
	color2.value = '#' + generateRGBHex();

	state.color1 = color1.value;
	state.color2 = color2.value;

	refreshColorInputValues();

	console.log(state);
	const gradientString = `linear-gradient(to right, ${state.color1}, ${state.color2})`;
	body.style.background = gradientString;
	css.textContent = body.style.background + ';';
};

randomMizeGradient();

const displayGradientString = () => {
	const gradientString = body.style.background;
	css.textContent = gradientString + ';';
};

button.addEventListener('click', randomMizeGradient);
window.addEventListener('mousemove', displayGradientString);
window.addEventListener('click', displayGradientString);
// because I am using Windows OS, their color input doesn't fire continueosly like Mac
// I had to resort to using jscolor library
// no need to initialize, I only have to declare the functions, which the names are based from class names in html(???)
const updateColorWindowListener1 = (jscolor) => {
	const rgbString = jscolor.toRGBString();
	console.log('input1');
	state.color1 = rgbString;
	body.style.background = `linear-gradient(to right, ${rgbString}, ${state.color2})`;
};
const updateColorWindowListener2 = (jscolor) => {
	const rgbString = jscolor.toRGBString();
	console.log('input2');
	state.color2 = rgbString;
	body.style.background = `linear-gradient(to right, ${state.color1}, ${rgbString})`;
};
