const Canvas = require("canvas");

//Context

let ctx;
module.exports.setContext = function(context) {
    ctx = context;
};

//Shadow

module.exports.setShadow = function(color, blur, x, y) {
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.shadowOffsetX = x;
    ctx.shadowOffsetY = y;
};

//Draw

module.exports.drawFill = function(color) {
    ctx.fillStyle = color;
    ctx.fill();
};

module.exports.drawStroke = function(color, strokeWidth) {
    ctx.strokeStyle = color;
    ctx.strokeWidth = strokeWidth;
    ctx.stroke();
};

//Circle

module.exports.pathCircle = function(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
};

module.exports.drawCircleFill = function(color, x, y, radius) {
    ctx.save();
    module.exports.pathCircle(x, y, radius);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
};

module.exports.drawCircleStroke = function(color, x, y, radius, strokeWidth) {
    ctx.save();
    module.exports.pathCircle(x, y, radius);
    ctx.strokeStyle = color;
    ctx.strokeWidth = strokeWidth;
    ctx.stroke();
    ctx.restore();
};

//Rectangle

module.exports.pathRect = function(x, y, width, height) {
    width += x;
    height += y;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(width,y);
    ctx.lineTo(width,height);
    ctx.lineTo(x,height);
    ctx.lineTo(x,y);
    ctx.closePath();
};

module.exports.pathRoundedRect = function(x, y, width, height, indent) {
    width += x;
    height += y;
    const shortest = Math.min(width,height) / 2;
    if (indent < 1) indent *= shortest;
    else indent = Math.min(indent, shortest);
    ctx.beginPath();
    ctx.moveTo(x+indent,y);
    ctx.lineTo(width-indent,y);
    ctx.quadraticCurveTo(width,y,width,y+indent);
    ctx.lineTo(width,height-indent);
    ctx.quadraticCurveTo(width,height,width-indent,height);
    ctx.lineTo(x+indent,height);
    ctx.quadraticCurveTo(x,height,x,height-indent);
    ctx.lineTo(x,y+indent);
    ctx.quadraticCurveTo(x,y,x+indent,y);
    ctx.closePath();
};

module.exports.drawRectFill = function(color, x, y, width, height) {
    module.exports.pathRect(x, y, width, height);
    module.exports.drawFill(color);
};

module.exports.drawRectStroke = function(color, x, y, width, height, strokeWidth) {
    module.exports.pathRect(x, y, width, height);
    module.exports.drawStroke(color, strokeWidth);
};

module.exports.drawRoundedRectFill = function(color, x, y, width, height, indent) {
    module.exports.pathRoundedRect(x, y, width, height, indent);
    module.exports.drawFill(color, x, y, width, height);
};

module.exports.drawRoundedRectStroke = function(color, x, y, width, height, indent, strokeWidth) {
    module.exports.pathRoundedRect(x, y, width, height, indent);
    module.exports.drawStroke(color, x, y, width, height, strokeWidth);
};

//Text

module.exports.drawTextFill = function(text, font, size, color, x, y, align, baseline, width, height) {
    if (!align) align = "left";
    if (!baseline) baseline = "middle";
    ctx.font = `${size}px ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    if (width && height)
        while (ctx.measureText(text).width >= width || ctx.measureText(text).actualBoundingBoxAscent + ctx.measureText(text).actualBoundingBoxDescent >= height)
            ctx.font = `${size-=1}px ${font}`;
    ctx.fillText(text, x, y);
};

module.exports.drawTextStroke = function(text, font, size, color, x, y, strokeWidth, align, baseline, maxWidth, maxHeight) {
    if (!align) align = "left";
    if (!baseline) baseline = "middle";
    ctx.font = `${size}px ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    if (width && height)
        while (ctx.measureText(text).width >= maxWidth || ctx.measureText(text).actualBoundingBoxAscent + ctx.measureText(text).actualBoundingBoxDescent >= maxHeight)
            ctx.font = `${size-=1}px ${font}`;
    ctx.strokeWidth = width;
    ctx.strokeText(text, x, y);
};