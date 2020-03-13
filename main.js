const { plot } = require("plot");
const fs = require("fs");
const readline = require("readline");
require("@plotex/render-image");

const data = [10, 30, 15, 20];

const chartConfig = {
  x: {
    label: "MPI Processes",
    min: 1
  },
  y: {
    label: "time",
    min: 0
  }
};

// read data from file
let arr = fs
  .readFileSync("./data/data3.txt")
  .toString()
  .split("\n");
let dataArr = [];
let fileStream = fs.createWriteStream("./out/data3.xls");
fileStream.write("Point to Point" + "\n");
// extract whole run time
arr.forEach(line => {
  if (line.includes("whole code")) {
    // example line:
    // WALL CLOCK Time (whole code): 0.334201 seconds
    let numStr = line
      .split(":")[1]
      .trim()
      .split(" ")[0];
    let num = parseFloat(numStr);
    console.log(num);
    fileStream.write(num + "\n");
    dataArr.push(num);
  }
});

// close write stream
fileStream.close();
