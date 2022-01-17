// Config
const height = 1080;
const width = 1080;
const padding = 0; //1080 / (1.6 * 5);
const colorCount = 5;

// Colors
const bg = "#fff";

// Variables
const imgHeight = height - 2 * padding;
const imgWidth = width * 0.7 - 2 * padding;
const imgUrl = `https://source.unsplash.com/random/${imgWidth}x${imgHeight}`;
let imgNode, imgP5, font;

// Preload image
function preload() {
  imgP5 = loadImage(imgUrl);
  font = loadFont("./lib/Dongle-Regular.ttf");
}

let canva, im, caption;
// Setup
async function setup() {
  // Create Canvas
  canva = createCanvas(width, height);

  noLoop();
  background(bg);
  noStroke();

  image(imgP5, padding, padding, imgWidth, imgHeight);

  await drawColors();
  drawWebabby();
  noStroke();

  im = get();
  console.log(im);
  console.log(canva);
}

async function drawColors() {
  const imgNode = new Image();
  imgNode.crossOrigin = "Anonymous";
  imgNode.src = imgUrl;

  await imgNode.decode();

  const colorThief = new ColorThief();
  const palette = colorThief.getPalette(imgNode);
  console.log(palette);

  const startX = padding + imgWidth;
  const startY = padding;
  const sizeX = width - imgWidth - padding * 2;
  const sizeY = (height - 2 * padding) / colorCount;

  let hex = "";
  for (let i = 0; i < colorCount; i++) {
    fill(palette[i]);
    rect(startX, startY + sizeY * i, sizeX, sizeY);

    // drawing hex value

    fill(textColor(palette[i]));
    textSize(50);
    textAlign(LEFT, CENTER);
    textFont(font);
    const c = color(palette[i]).toString("#rrggbb");
    const c1 = color(palette[i]).toString("rgb");
    text(c, startX + 30, startY + sizeY * i + sizeY / 2 - 30);
    text(c1, startX + 30, startY + sizeY * i + sizeY / 2 + 30);

    hex = hex + (i > 0 ? " • " : "") + c;
  }

  caption = `
What would be a good name for this palette?
⠀⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣
Colors :⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣
${hex}
⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣
Hope this palette inspires you to make something awesome. If you found this valuable, make sure to share the love and save it for later!⁣⁣⁣⁣⁣⁣⁣⁣⁣ ⁣⁣⁣⁣
⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣
🎨 #Webabby
🎨 #Inspiration
🎨 #Colors
⁣⁣⁣⁣⁣⁣
⁣⁣⁣⁣⁣⁣⁣`;
}

function drawWebabby() {
  stroke(color(floor(random(255)), floor(random(255)), floor(random(255))));
  fill(255);
  ellipse(60 * 1.6, height - 60 * 1.6, 160, 160);
  fill(0);
  textSize(80);
  textAlign(CENTER, CENTER);
  textFont(font);

  textSize(50);
  text("WEBABBY", 60 * 1.6, height - 60 * 1.6 - 8);
  // text("W", 50 * 1.6, height - 42 * 1.6);
  // text("WEBABBY", width / 2, height - padding / 3);
}

function luminance(r, g, b) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
function contrast(rgb1, rgb2) {
  var lum1 = luminance(red(rgb1), green(rgb1), blue(rgb1));
  var lum2 = luminance(red(rgb2), green(rgb2), blue(rgb2));
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}
function textColor(c) {
  if (contrast(color("#fff"), c) > contrast(color("#010101"), c)) {
    return color("#fff");
  }
  return color("#010101");
}
