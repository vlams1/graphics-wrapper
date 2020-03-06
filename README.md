
# graphics-wrapper

A wrapper for node-canvas

## LICENSE

[MIT](https://choosealicense.com/licenses/mit/ "MIT")

## USAGE

```js
const Canvas = require('canvas');
const Draw = require('graphics-wrapper');

const canvas = Canvas.createCanvas(500, 500);
const ctx = canvas.getContext('2d');

Draw.setContext(ctx);
```