"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const webshot = require("webshot");
const palette = require("palette");
const Canvas = require("canvas");
const Image = Canvas.Image;
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);


function createScreenshot(url, options = {}) {
  return new Promise((resolve, reject) => {
    webshot(url, options, (err, renderStream) => {
      if (err) return reject(err);
      const chunks = new Array();
      renderStream.on("data", data => chunks.push(new Buffer(data)));
      renderStream.on("error", (err) => reject(err));
      renderStream.on("end", () => {
        const data = Buffer.concat(chunks);
        resolve(data);
      });
    });
  });
}


function createColorPalette(buffer) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = new Canvas();
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      resolve({
        canvas,
        colors: palette(canvas)
      });
    };

    img.src = buffer;
  });
}


app.get("/", (req, res) => {
  res.render("index", {result: ""});
});


app.post("/", (req, res) => {
  const {url} = req.body;
  const options = {
    windowSize: {
      width: 1280,
      height: 768
    },
    shotSize: {
      width: "window",
      height: "all"
    }
  };

  Promise.resolve()
    .then(() => {
      return createScreenshot(url, options);
    })
    .then((buffer) => {
      return createColorPalette(buffer);
    })
    .then((results) => {
      const {canvas, colors} = results;
      const colorHtml = colors.map(color => `<span style="background:rgb(${color.join(",")});"></span>`).join("\n");
      const result = `
        ${colorHtml}
        <img src="${canvas.toDataURL()}" alt="">
      `;
      res.render("index", {result});
    });
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
