const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("file://D:/W/DEV/CC/WebabbyColors/dist/index.html");

  await page._client.send("Browser.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: "./images",
  });

  await page.waitForSelector("#defaultCanvas0");
  await page.waitForTimeout(1000);

  let i;
  i = await page.evaluate(async function () {
    return { img: canva.elt.toDataURL("image/jpeg"), cap: caption };
  });

  var base64Data = i.img.replace(/^data:image\/jpeg;base64,/, "");

  const id = await fs.readdirSync("./images").length;

  await fs.writeFileSync(`./images/${id}.jpg`, base64Data, "base64");

  console.log("saved to " + id + ".jpg");

  await page.waitForTimeout(1000);
  await browser.close();

  postIt(`${id}.jpg`, i.cap);
})();

const path = require("path");

async function postIt(img, cap) {
  const tfi = require("tools-for-instagram"); //require of tools-for-instagram
  //login in instagram
  let myPicturePath = path.join(__dirname, "../images/" + img);
  let ig = await login();
  await uploadPicture(ig, cap, myPicturePath);
  process.exit(1)

}
