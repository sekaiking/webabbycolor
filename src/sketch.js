// size

// how many colors
const show = 4;
const gapX = 8;
const gapY = 10;

// colors
const bg = "#fff";

let c = ["#fff", "#fff", "#fff", "#fff", "#fff"];
function preload() {
  const size = floor(min(windowHeight, windowWidth) / 1.6);
  const i = `https://source.unsplash.com/random/${size}x${windowHeight}?sig=${random()}`;
  console.log(i);
  ex(i);
  img = loadImage(i);
}
function setup() {
  createCanvas(min(windowHeight, windowWidth), min(windowHeight, windowWidth));
  noLoop();
  background(bg);
  noStroke();

  image(img, 0, 0);
}

function draw() {
  const size = min(windowHeight, windowWidth);
  const startX = floor(min(windowHeight, windowWidth) / 1.6) + gapX;
  const sizeX = windowWidth - startX;
  const sizeY = (size - gapY) / show;
  for (let i = 0; i < show; i++) {
    fill(c[i]);
    rect(startX, (sizeY + gapY) * i, sizeX, sizeY);
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
    redraw()
  });
};
