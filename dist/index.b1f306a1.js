const height=1080,width=1080,padding=0,colorCount=5,bg="#fff",imgHeight=1080,imgWidth=756,imgUrl="https://source.unsplash.com/random/756x1080";let imgNode,imgP5,font,canva,im,caption;function preload(){imgP5=loadImage(imgUrl),font=loadFont("./lib/Dongle-Regular.ttf")}async function setup(){canva=createCanvas(1080,1080),noLoop(),background(bg),noStroke(),image(imgP5,0,0,756,1080),await drawColors(),drawWebabby(),noStroke(),im=get(),console.log(im),console.log(canva)}async function drawColors(){const o=new Image;o.crossOrigin="Anonymous",o.src=imgUrl,await o.decode();const t=(new ColorThief).getPalette(o);console.log(t);const n=216;let e="";for(let o=0;o<5;o++){fill(t[o]),rect(756,0+n*o,324,n),fill(textColor(t[o])),textSize(50),textAlign(LEFT,CENTER),textFont(font);const r=color(t[o]).toString("#rrggbb"),a=color(t[o]).toString("rgb");text(r,786,0+n*o+108-30),text(a,786,0+n*o+108+30),e=e+(o>0?" • ":"")+r}caption=`\nWhat would be a good name for this palette?\n⠀⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣\nColors :⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣\n${e}\n⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣\nHope this palette inspires you to make something awesome. If you found this valuable, make sure to share the love and save it for later!⁣⁣⁣⁣⁣⁣⁣⁣⁣ ⁣⁣⁣⁣\n⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣⁣\n🎨 #Webabby\n🎨 #Inspiration\n🎨 #Colors\n⁣⁣⁣⁣⁣⁣\n⁣⁣⁣⁣⁣⁣⁣`}function drawWebabby(){stroke(color(floor(random(255)),floor(random(255)),floor(random(255)))),fill(255),ellipse(96,984,160,160),fill(0),textSize(80),textAlign(CENTER,CENTER),textFont(font),textSize(50),text("WEBABBY",96,976)}function luminance(o,t,n){var e=[o,t,n].map((function(o){return(o/=255)<=.03928?o/12.92:Math.pow((o+.055)/1.055,2.4)}));return.2126*e[0]+.7152*e[1]+.0722*e[2]}function contrast(o,t){var n=luminance(red(o),green(o),blue(o)),e=luminance(red(t),green(t),blue(t));return(Math.max(n,e)+.05)/(Math.min(n,e)+.05)}function textColor(o){return contrast(color("#fff"),o)>contrast(color("#010101"),o)?color("#fff"):color("#010101")}