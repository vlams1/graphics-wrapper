# graphics-wrapper

A wrapper for node-canvas

## INSTALLATION

``npm install graphics-wrapper``

## USAGE

```js
const Canvas = require('canvas');
const Draw = require('./');

const canvas = Canvas.createCanvas(500, 500);
const ctx = canvas.getContext('2d');

Draw.setContext(ctx);
```