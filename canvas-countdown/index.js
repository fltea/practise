let WIDTH
let HEIGHT
let RADIUS = 8
let numbers = []
let BALLS = []
let MARGINT_TOP = 50
let MARGINT_LEFT = 50
const COLORS = ['#FF0000', '#888888','#00FFFF','#008000','#00CED1','#4B0082','#A0522D','	#ADFF2F','#DA70D6','#4169E1','#808000','#00FF00','#191970','#0000FF','#CD5C5C','#AFEEEE','	#9ACD32','#9370DB','#8B008B','#FF4500','#00DDFF', '#37A2FF', '#FF0087', '#FFBF00','#93CE07','#FBDB0F','#FC7D02','#DC143C','#AA069F','#AC3B2A']

function initCanvas() {
  WIDTH = document.body.clientWidth;
  HEIGHT = document.body.clientHeight;

  MARGINT_LEFT = Math.round(WIDTH/10)
  MARGINT_TOP = Math.round(HEIGHT/5)
  RADIUS = Math.round(WIDTH * 4 / 5 / 108) -1

  const canvas = document.querySelector('#app');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const context = canvas.getContext('2d');
  // drawNumber(MARGINT_LEFT, MARGINT_TOP, 1, context)
  // drawNumber(MARGINT_LEFT + 15 * (RADIUS + 1) , MARGINT_TOP, 2, context)
  // drawNumber(MARGINT_LEFT + 30 * (RADIUS + 1) , MARGINT_TOP, 4, context)
  // drawNumber(MARGINT_LEFT + 45 * (RADIUS + 1) , MARGINT_TOP, 8, context)
  // drawNumber(MARGINT_LEFT + 60 * (RADIUS + 1) , MARGINT_TOP, 3, context)
  // drawNumber(MARGINT_LEFT + 75 * (RADIUS + 1) , MARGINT_TOP, 6, context)

  const list = countTimer()
  drawList(list,context)

  setInterval(() => {
    context.clearRect(0,0,WIDTH,HEIGHT);
    const list = countTimer()
    drawList(list,context)
    drawBalls(context)
  }, 50)
}

function getNo(no) {
  let number = +no;
  const noNumber = isNaN(number)
  if(noNumber) {
    return  10
  }
  return number
}

function drawBalls(ctx) {
  // console.log(BALLS.length)
  const newBalls = []
  BALLS.forEach((ball, i) => {
    const {
      color,
      vx,
      vy,
      g,
    } = ball;
    ball.left += vx;
    ball.top += vy;
    ball.vy += g;

    // 邊界判斷
    if(ball.top >= HEIGHT - RADIUS) {
      ball.top = HEIGHT - RADIUS
      ball.vy = - ball.vy * 0.75;
    }

    if(ball.left + RADIUS > 0 && ball.left - RADIUS < WIDTH) {
      drawArc(ball.left, ball.top, ctx, color);
      newBalls.push(ball)
    }
  })

  BALLS = newBalls;
}

function drawList(list,ctx) {
  // const list = ['1','2', ':','4','6', ':','3','9']
  let left = MARGINT_LEFT;
  const top = MARGINT_TOP;

  list.forEach((v,i) => {
    let number = getNo(v);
    drawNumber(left, top, number, ctx)
    // 變化的數字
    const oldNo = numbers.length ? getNo(numbers[i]) : -1;
    if(oldNo > -1 && number !== oldNo) {
      drawNumber(left, top, number, ctx, COLORS)
    }
    left += (number > 9 ? 9 : 15) * (RADIUS + 1)
  })
  numbers = list;
}

function drawNumber(left, top, no, ctx, colors) {
  // console.log('left', left, no)
  const list = digits[no];
  const len = list.length;
  let color
  for (let i = 0; i < len; i++) {
    const inner = list[i];
    const ilen = list.length;
    for (let j = 0; j < ilen; j++) {
      const x = left + j * 2 * (RADIUS + 1) + (RADIUS + 1);
      const y = top + i * 2 * (RADIUS + 1) + (RADIUS + 1);
      if(inner[j]) {
        if(colors) {
          color = colors[Math.floor(Math.random() * colors.length)]
          const vx = Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4;
          const vy = -5;
          const g = 1.5 + Math.random();
          BALLS.push({
            left: x,
            top: y,
            color,
            vx,
            vy,
            g,
          })
        } else {
          drawArc(x, y, ctx)
        }
      }
    }
  }
}

function drawArc(left, top, ctx, style = 'rgb(0, 102, 153)') {
  ctx.fillStyle = style
  ctx.beginPath();
  ctx.arc(left, top, RADIUS, 0, 2 * Math.PI)
  ctx.closePath();
  ctx.fill()
}

function getStr(time){
  return `0${time}`.slice(-2)
}

function countTimer() {
  const curTime = new Date();
  const list = [];
  let tstr = getStr(curTime.getHours());
  list.push(...tstr.split(''), ':')
  tstr = getStr(curTime.getMinutes());
  list.push(...tstr.split(''), ':')
  tstr = getStr(curTime.getSeconds());
  list.push(...tstr.split(''))
  // console.log(list)
  return list;
}

window.onload = function () {
  initCanvas()
}