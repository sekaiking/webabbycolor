// size

// how many colors
const show = 4;

// colors
const bg = "#fff";

let c = ["#fff", "#fff", "#fff", "#fff", "#fff"];
function preload() {
  const size = floor(min(windowHeight, windowWidth) / 1.6);
  const i = `https://source.unsplash.com/random/${size}x${size}?sig=${floor(
    random(1, 1000)
  )}`;
  ex(i);
  img = loadImage(i);
}
function setup() {
  createCanvas(min(windowHeight, windowWidth), min(windowHeight, windowWidth));
  // noLoop();
  background(bg);
  noStroke();

  const start = width / 2 - width / 1.6 / 2;
  image(img, start, start - 100);
}

function draw() {
  const squareSize = 160;
  const start = width / 2 - (squareSize * show) / 2;
  for (let i = 0; i < show; i++) {
    fill(c[i]);
    rect(
      start + i * squareSize,
      height - squareSize - 50,
      squareSize,
      squareSize
    );
  }
}

function generate_color() {
  r = random(255);
  g = random(100, 200);
  b = random(100);
  a = random(200, 255);
  return color(r, g, b, a);
}

const ex = (source) => {
  const colorThief = new ColorThief();
  const img = new Image();

  img.crossOrigin = "Anonymous";
  img.src = source;

  img.addEventListener("load", function () {
    console.log(colorThief.getPalette(img));
    c = colorThief.getPalette(img);
  });
};
