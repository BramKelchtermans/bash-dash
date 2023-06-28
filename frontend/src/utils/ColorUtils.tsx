const hexColors = [
	"#FF5733",
	"#42E6A4",
	"#7F8CFF",
	"#E9BC42",
	"#A53D93",
	"#4FF285",
	"#C06A2B",
	"#58D9E0",
	"#FFBE3A",
	"#4C72B9",
	"#D63F7E",
	"#1AE156",
	"#F92C8A",
	"#5FA8D0",
	"#E12E35",
	"#6DCB76",
	"#C92B5F",
	"#53E5A7",
	"#FF4821",
	"#3284D9",
	"#FF903E",
	"#4EEA93",
	"#7E4EAC",
	"#30E874",
	"#DE6B23",
	"#81D9C3",
	"#E64F2C",
	"#6B6FE0",
	"#FBB94D",
	"#4D8EC5",
	"#F64D82",
	"#43D897",
	"#D93559",
	"#59E3A1",
	"#FF622A",
	"#3972C8",
	"#FF8C5C",
	"#42E8A7",
	"#8768B1",
	"#2DEF6F",
	"#E8632E",
	"#7AC1DD",
	"#F54D6F",
	"#3EA2C5",
	"#FF982D",
	"#327ED9",
	"#FF9D59",
	"#45EAAA",
	"#9D76C5",
	"#34EF77",
	"#E87B41",
	"#8FD3EA",
	"#F94D61",
	"#45B7D9",
	"#FFA640",
	"#2B89C4",
	"#FFAD6C",
	"#41EDAB",
	"#A076C2",
	"#2AEE75",
	"#E88C42",
	"#9AD6E9",
	"#FF536A",
	"#3FA5D9"
];
const ColorUtils = {
	hexToRgb: (hex: string) => {
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function (m, r, g, b) {
			return r + r + g + g + b + b;
		});

		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	},

	stringToColor: (str: string): { r: number, g: number, b: number } => {
		if (str.includes("#")) {
			return ColorUtils.hexToRgb(str);
		} else if (str.includes("rgb")) {
			var rgb = str.match(/\d+/g);
			return {
				r: parseInt(rgb[0]),
				g: parseInt(rgb[1]),
				b: parseInt(rgb[2])
			}
		} else {
			try {
				str = str.replace("var(--", "").replace(")", "");
				return ColorUtils.stringToColor(getComputedStyle(document.body).getPropertyValue('--' + str));
			} catch (e) {
				console.error(e);
				return {
					r: 0,
					g: 0,
					b: 0
				};
			}
		}
	},
	randomColor: (index: number | undefined = undefined) => {
		const length = hexColors.length;
		if (index == undefined)
			index = Math.round(Math.random() * length);
		return hexColors[index];
	},

	generateColorVariations: (baseColor: any, amount: number) => {
		var variations = [];

		// Extract RGB values from the base color
		var baseRed = parseInt(baseColor.r, 10);
		var baseGreen = parseInt(baseColor.g, 10);
		var baseBlue = parseInt(baseColor.b, 10);

		// Generate color variations
		for (var i = 1; i <= amount; i++) {
			var red = Math.floor(Math.random() * 256);
			var green = Math.floor(Math.random() * 256);
			var blue = Math.floor(Math.random() * 256);

			// Mix the random RGB values with the base color
			var mixedRed = Math.floor((red + baseRed) / 2);
			var mixedGreen = Math.floor((green + baseGreen) / 2);
			var mixedBlue = Math.floor((blue + baseBlue) / 2);

			// Create the variation color string
			var variationColor = 'rgb(' + mixedRed + ', ' + mixedGreen + ', ' + mixedBlue + ')';

			variations.push(variationColor);
		}

		return variations;
	}

}
export default ColorUtils