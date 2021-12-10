const compress_images = require("compress-images")
const RAW_FILE_PATH = "assets/raw-img/**/*.{jpg,JPG,jpeg,JPEG}";
const OUTPUT_PATH = "assets/img/";

compress_images(RAW_FILE_PATH, OUTPUT_PATH, {
    compress_force: true,
    statistic: true,
    autoupdate: true
  }, false,
  {jpg: {engine: "mozjpeg", command: ["-quality", "60"]}},
  {png: {engine: false, command: false}},
  {svg: {engine: false, command: false}},
  {gif: {engine: false, command: false}},
  function (error, completed, statistic) {
    console.log("-------------");
    console.log(error);
    console.log(completed);
    console.log(statistic);
    console.log("-------------");
  }
);
