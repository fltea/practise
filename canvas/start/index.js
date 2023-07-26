let WIDTH
let HEIGHT
function initCanvas() {
  WIDTH = document.body.clientWidth;
  HEIGHT = document.body.clientHeight;

  const canvas = document.querySelector('#app');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const context = canvas.getContext('2d');

  // context.fillStyle = 'black'
  const fillStyle = context.createLinearGradient(0, 0, 0, HEIGHT)
  fillStyle.addColorStop(0,'black')
  fillStyle.addColorStop(1,'#035')
  context.fillStyle = fillStyle
  context.fillRect(0,0,WIDTH,HEIGHT)

  // drawPath(context)

  for (let i = 0; i < 200; i++) {
    const R = Math.random() * 10 + 4;
    const x = Math.random() * WIDTH
    const y = Math.random() * HEIGHT * 0.7
    const a = Math.random() * 360
    drawPath(context, x, y, R, a)
  }

  fillMoon(context, 2, WIDTH * 0.65, HEIGHT * 0.2, 100, 30)

  drawLand(context)
}
function drawLand(ctx) {
  ctx.save();

  ctx.beginPath()
  ctx.moveTo(0, HEIGHT * 0.8);
  ctx.bezierCurveTo(WIDTH * 0.65, HEIGHT * 0.5, WIDTH * 0.55, HEIGHT, WIDTH, HEIGHT * 0.8);
  ctx.lineTo(WIDTH, HEIGHT)
  ctx.lineTo(0, HEIGHT)
  ctx.closePath();

  const landStyle = ctx.createLinearGradient(0, 800, 0, 0)
  landStyle.addColorStop(0,'#030')
  landStyle.addColorStop(1,'#580')
  ctx.fillStyle = landStyle

  ctx.fill()

  ctx.restore();

}

function drawPath(ctx, x, y, R, ro) {
  // startPath(ctx, 400, 400, 300, 150, 40)
  ctx.save();

  ctx.translate(x, y);
  ctx.rotate(ro / 180 * Math.PI)
  ctx.scale(R,R);
  startPath(ctx)
  ctx.fillStyle = '#fb3'
  ctx.fill();

  ctx.restore();
}

function startPath(ctx) {
  // ctx.beginPath();
  // for (let i = 0; i < 5; i++) {
  //   // 五邊形
  //   ctx.lineTo(Math.cos((18 + i*72 - ro)/180 * Math.PI) * R + x,
  //             -Math.sin((18 + i * 72 - ro)/180 * Math.PI) * R + y)
  //   // 五角星
  //   ctx.lineTo(Math.cos((54 + i*72 - ro)/180 * Math.PI) * R /2 + x,
  //             -Math.sin((54 + i * 72 - ro)/180 * Math.PI) * R /2 + y)
  // }
  // ctx.closePath();
  // ctx.fillStyle = '#fb3'
  // ctx.strokeStyle = '#fd5'
  // ctx.lineWidth = 2
  // ctx.lineJoin = 'round'
  // ctx.fill();
  // ctx.stroke();
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    // 五邊形
    ctx.lineTo(Math.cos((18 + i * 72)/180 * Math.PI),
              -Math.sin((18 + i * 72)/180 * Math.PI))
    // 五角星
    ctx.lineTo(Math.cos((54 + i * 72)/180 * Math.PI) * 0.5,
              -Math.sin((54 + i * 72)/180 * Math.PI) * 0.5)
  }
  ctx.closePath();
}

function fillMoon(ctx, d, x, y, R, ro, fillColor) {
  ctx.save();

  ctx.translate(x, y);
  ctx.rotate(ro / 180 * Math.PI)
  ctx.scale(R,R);
  moonPath(ctx, d)
  ctx.fillStyle = fillColor || '#fb5'
  ctx.fill();

  ctx.restore();

}

function moonPath(ctx, d) {
  ctx.beginPath()
  ctx.arc(0, 0, 1, 0.5*Math.PI, 1.5*Math.PI, true)
  ctx.moveTo(0, -1);
  ctx.arcTo(d, 0, 0, 1, dis(0, -1, d, 0) / d);
  ctx.closePath();
}

function dis(x1,y1,x2,y2){
  return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

window.onload = function () {
  initCanvas()
}