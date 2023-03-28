var angles = [],
  pts = [],
  count = 50000,
  dim = 500,
  xdim = dim,
  ydim = dim,
  len = 5,
  textSize = 10

function setup() {
  createCanvas(xdim + 2 * len, ydim + 2 * len + textSize);
  translate(len, len);
  background('white')
  drawLines()
  drawNeedles()
}

function drawLines() {
  stroke('pink')
  for (var i = len; i < ydim; i += 2 * len)
    line(-len, i, xdim + 2 * len, i)
}

function generateNeedle() {
  var angle = random(TWO_PI),
    x0 = random(xdim),
    y0 = random(ydim)

  return {
    x0: x0,
    y0: y0,
    x1: x0 + cos(angle) * len,
    y1: y0 + sin(angle) * len
  }
}

function touchesLine(pt) {
  var ys = pt.y0 > pt.y1 ? [pt.y1, pt.y0] : [pt.y0, pt.y1],
    midpt = (pt.y0 + pt.y1) / 2,
    closestLine = round(midpt / len) * len,
    isOddLine = ((closestLine / len) % 2) == 1
  //console.log(round(ys[0]),' | ', round(ys[1]),' ==> ', closestLine,
  //         ys[0] <= closestLine && ys[1] >= closestLine ? ' HIT': 'miss',
  //isOddLine ? ' LINE' : ' not')

  return isOddLine &&
    ys[0] <= closestLine &&
    ys[1] >= closestLine
}

function withinPi(pt) {
  return (pt.x0 > 2 * xdim / 10 &&
      pt.x0 < 3 * xdim / 10 &&
      pt.y0 > ydim / 10 &&
      pt.y0 < ydim * 9 / 10) ||
    (pt.x0 > 7 * xdim / 10 &&
      pt.x0 < 8 * xdim / 10 &&
      pt.y0 > ydim / 10 &&
      pt.y0 < ydim * 9 / 10) ||
    (pt.x0 > 1 * xdim / 10 &&
      pt.x0 < 9 * xdim / 10 &&
      pt.y0 > 1 * ydim / 10 &&
      pt.y0 < 2 * ydim / 10)
}

function drawNeedles() {
  var lineTouches = 0
  for (var i = 0; i < count; i++) {
    var pt = generateNeedle(),
      touch = touchesLine(pt)
    if (withinPi(pt))
      pt.color = touch ? 'red' : 'black'
    else
      pt.color = touch ? 'lightpink' : 'lightgray'
    pts.push(pt)
    if (touch) lineTouches++
  }

  console.log('PI=', count / lineTouches)

  // draw it
  for (i = 0; i < pts.length; i++) {
    //console.log(sqrt((pts[i].x0 - pts[i].x1)*(pts[i].x0 - pts[i].x1) + 
    //  (pts[i].y0 - pts[i].y1)*(pts[i].y0 - pts[i].y1)))
    stroke(pts[i].color)
    line(pts[i].x0, pts[i].y0, pts[i].x1, pts[i].y1)
  }

  textAlign(CENTER)
  textSize(textSize)
  textLeading(textSize)
  text('π = ' + count / lineTouches, xdim / 2, ydim + 2 * len)
}


function draw() {}