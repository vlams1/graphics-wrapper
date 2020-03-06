﻿﻿﻿const fs = require('fs');
const Canvas = require('canvas');
const Draw = require('../');

(async function() {
	const canvas = Canvas.createCanvas(500, 500);
	const ctx = canvas.getContext('2d');

	Draw.setContext(ctx);
	Draw.drawRectFill('black', 0, 0, canvas.width, canvas.height);
	Draw.drawRoundedRectFill('white', 20, 20, canvas.width - 40, canvas.height - 40, 50);
	Draw.setShadow('black',7,6, 4);
	Draw.drawTextFill("graphics", "sans-serif", 80, 'blue', canvas.width/2, canvas.height/2-100, "center", "middle");
	Draw.drawTextFill("wrapper", "sans-serif", 80, 'blue', canvas.width/2, canvas.height/2, "center", "middle");
	Draw.drawTextFill("test", "sans-serif", 80, 'blue', canvas.width/2, canvas.height/2+100, "center", "middle");

	let buffer = canvas.toBuffer();
	fs.writeFileSync("test.png", buffer);
})();