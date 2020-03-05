﻿﻿const fs = require('fs');
const Canvas = require('canvas');
const Draw = require('./');

const canvas = Canvas.createCanvas(500, 500);
const ctx = canvas.getContext('2d');

Draw.setContext(ctx);
Draw.drawRectFill('black', 0, 0, canvas.width, canvas.height);
Draw.drawRoundedRectFill('white', 50, 50, canvas.width - 100, canvas.height - 100, 50);

let buffer = canvas.toBuffer();
fs.writeFileSync("test.png", buffer);