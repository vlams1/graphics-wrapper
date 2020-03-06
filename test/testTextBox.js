﻿﻿﻿const fs = require('fs');
const Canvas = require('canvas');
const Draw = require('../');

(async function() {
    const canvas = Canvas.createCanvas(500, 500);
    const ctx = canvas.getContext('2d');
    Draw.setContext(ctx);
    
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at elementum mi. Suspendisse sodales eu justo " +
        "consequat dictum. Maecenas ut efficitur nisi. Aenean pretium varius dolor. Aenean in mauris ut quam rhoncus " +
        "porttitor id a libero. Curabitur sodales mattis neque, efficitur suscipit velit laoreet ac. Sed sollicitudin " +
        "nibh vitae turpis fringilla commodo. Integer ut nisi et quam consequat auctor. Nullam pellentesque sem erat, " +
        "sed aliquam diam porttitor non. Fusce hendrerit lacus metus, et viverra urna egestas vehicula. Mauris nec odio " +
        "dolor. Vivamus non congue elit. Fusce efficitur nibh neque, porttitor vestibulum magna tempus quis. Duis vitae " +
        "lacinia mi.";
    
    Draw.drawRectFill('white', 0, 0, canvas.width, canvas.height);
    Draw.drawTextBoxFill(text, "sans-serif", "", 20, 450, 'black', 25, 30);
    
    let buffer = canvas.toBuffer();
    fs.writeFileSync("testTextBox.png", buffer);
})();