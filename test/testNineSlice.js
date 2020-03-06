﻿﻿﻿const fs = require('fs');
const Canvas = require('canvas');
const Draw = require('../');

(async function() {
    const canvas = Canvas.createCanvas(500, 500);
    const ctx = canvas.getContext('2d');
    Draw.setContext(ctx);
    
    const image = await Canvas.loadImage("test.png");
    Draw.drawNineSlice(image, 50, 50, canvas.width - 100, canvas.height - 100, 150);
    
    let buffer = canvas.toBuffer();
    fs.writeFileSync("testNineSlice.png", buffer);
})();