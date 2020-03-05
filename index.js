const Canvas = require("canvas");

//  CONTEXT

/**
 * @type {CanvasRenderingContext2D}
 */
let ctx;

/**
 * Set Context
 * @param {CanvasRenderingContext2D} context
 */
module.exports.setContext = function(context) {
    ctx = context;
};

//  SHADOW


/**
 * 
 * @param {string} color
 * @param {Number} blur
 * @param {Number} x
 * @param {Number} y
 */
module.exports.setShadow = function(color, blur, x, y) {
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.shadowOffsetX = x;
    ctx.shadowOffsetY = y;
};

//  DRAW


/**
 * Fill current path
 * @param {string} color
 */
module.exports.drawFill = function(color) {
    ctx.fillStyle = color;
    ctx.fill();
};

/**
 * Outline current path
 * @param {string} color
 * @param {Number} stroke
 */
module.exports.drawStroke = function(color, stroke) {
    ctx.strokeStyle = color;
    ctx.strokeWidth = stroke;
    ctx.stroke();
};

//  CIRCLE

/**
 * Create circle path
 * @param {Number} x
 * @param {Number} y
 * @param {Number} radius
 */
module.exports.pathCircle = function(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
};

/**
 * Draw filled circle
 * @param {string} color
 * @param {Number} x
 * @param {Number} y
 * @param {Number} radius
 */
module.exports.drawCircleFill = function(color, x, y, radius) {
    ctx.save();
    module.exports.pathCircle(x, y, radius);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
};

/**
 * Draw circle outline
 * @param {string} color
 * @param {Number} x
 * @param {Number} y
 * @param {Number} radius
 * @param {Number} stroke
 */
module.exports.drawCircleStroke = function(color, x, y, radius, stroke) {
    ctx.save();
    module.exports.pathCircle(x, y, radius);
    ctx.strokeStyle = color;
    ctx.strokeWidth = stroke;
    ctx.stroke();
    ctx.restore();
};

//  RECTANGLE

/**
 * Create rectangle path
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 */
module.exports.pathRect = function(x, y, w, h) {
    w += x;
    h += y;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(w,y);
    ctx.lineTo(w,h);
    ctx.lineTo(x,h);
    ctx.lineTo(x,y);
    ctx.closePath();
};

/**
 * Create rounded rectangle path
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 * @param {Number} indent
 */
module.exports.pathRoundedRect = function(x, y, w, h, indent) {
    w += x;
    h += y;
    const shortest = Math.min(w,h) / 2;
    if (indent < 1) indent *= shortest;
    else indent = Math.min(indent, shortest);
    ctx.beginPath();
    ctx.moveTo(x+indent,y);
    ctx.lineTo(w-indent,y);
    ctx.quadraticCurveTo(w,y,w,y+indent);
    ctx.lineTo(w,h-indent);
    ctx.quadraticCurveTo(w,h,w-indent,h);
    ctx.lineTo(x+indent,h);
    ctx.quadraticCurveTo(x,h,x,h-indent);
    ctx.lineTo(x,y+indent);
    ctx.quadraticCurveTo(x,y,x+indent,y);
    ctx.closePath();
};

/**
 * Draw filled rectangle
 * @param {string} color
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 */
module.exports.drawRectFill = function(color, x, y, w, h) {
    module.exports.pathRect(x, y, w, h);
    module.exports.drawFill(color);
};

/**
 * Draw rectangle outline
 * @param {string} color
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 * @param {Number} stroke
 */
module.exports.drawRectStroke = function(color, x, y, w, h, stroke) {
    module.exports.pathRect(x, y, w, h);
    module.exports.drawStroke(color, stroke);
};

/**
 * Draw filled rounded rectangle
 * @param {string} color
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 * @param {Number} indent
 */
module.exports.drawRoundedRectFill = function(color, x, y, w, h, indent) {
    module.exports.pathRoundedRect(x, y, w, h, indent);
    module.exports.drawFill(color, x, y, w, h);
};

/**
 * Draw rounded rectangle outline
 * @param {string} color
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 * @param {Number} indent
 * @param {Number} stroke
 */
module.exports.drawRoundedRectStroke = function(color, x, y, w, h, indent, stroke) {
    module.exports.pathRoundedRect(x, y, w, h, indent);
    module.exports.drawStroke(color, x, y, w, h, stroke);
};

//  TEXT

/**
 * Draws filled text (auto scales when using w and h controls)
 * @param {string} text
 * @param {string} font
 * @param {Number} size
 * @param {string} color
 * @param {Number} x
 * @param {Number} y
 * @param {string} align
 * @param {string} baseline
 * @param {Number} w
 * @param {Number} h
 */
module.exports.drawTextFill = function(text, font, size, color, x, y, align, baseline, w, h) {
    if (!align) align = "left";
    if (!baseline) baseline = "middle";
    ctx.font = `${size}px ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    if (w && h)
        while (ctx.measureText(text).width >= w || ctx.measureText(text).actualBoundingBoxAscent + ctx.measureText(text).actualBoundingBoxDescent >= h)
            ctx.font = `${size-=1}px ${font}`;
    ctx.fillText(text, x, y);
};

/**
 * Draws text outline (auto scales when using w and h controls)
 * @param {string} text
 * @param {string} font
 * @param {Number} size
 * @param {string} color
 * @param {Number} x
 * @param {Number} y
 * @param {Number} stroke
 * @param {string} align
 * @param {string} baseline
 * @param {Number} w
 * @param {Number} h
 */
module.exports.drawTextStroke = function(text, font, size, color, x, y, stroke, align, baseline, w, h) {
    if (!align) align = "left";
    if (!baseline) baseline = "middle";
    ctx.font = `${size}px ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    if (w && h)
        while (ctx.measureText(text).width >= w || ctx.measureText(text).actualBoundingBoxAscent + ctx.measureText(text).actualBoundingBoxDescent >= h)
            ctx.font = `${size-=1}px ${font}`;
    ctx.strokeWidth = w;
    ctx.strokeText(text, x, y);
};

//  IMAGE

/**
 * Slice an image into 9 parts and scale the center parts
 * @param {Image} image
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 * @param {Number} dx
 * @param {Number} dy
 */
module.exports.drawNineSlice = function(image, x, y, w, h, dx, dy) {
    const iw = image.width;
    const ih = image.height;
    if (!dx) dx = Math.floor(iw / 3);
    if (!dy) dy = Math.floor(ih / 3);
    ctx.drawImage(image, 0, 0, dx, dy, x, y, dx, dy);
    ctx.drawImage(image, dx, 0, iw-dx*2, dy, x+dx, y, w-dx*2, dy);
    ctx.drawImage(image, iw-dx, 0, dx, dy, x+w-dx, y, dx, dy);
    ctx.drawImage(image, 0, dy, dx, ih-dy*2, x, y+dy, dx, h-dy*2);
    ctx.drawImage(image, dx, dy, iw-dx*2, ih-dy*2, x+dx, y+dy, w-dx*2, h-dy*2);
    ctx.drawImage(image, iw-dx, dy, dx, ih-dy*2, x+w-dx, y+dy, dx, h-dy*2);
    ctx.drawImage(image, 0, ih-dy, dx, dy, x, y+h-dx, dx, dy);
    ctx.drawImage(image, dx, ih-dy, iw-dx*2, dy, x+dx, y+h-dx, w-dx*2, dy);
    ctx.drawImage(image, iw-dx, ih-dy, dx, dy, x+w-dx, y+h-dx, dx, dy);
};