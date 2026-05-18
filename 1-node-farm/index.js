const fs = require("fs");
// Blocking, synchronous way
// Reading from the file
const text = fs.readFileSync("./starter/txt/input.txt", "utf-8");
// Writing to the file
const textOut = fs.writeFileSync(
  "./starter/txt/output.txt",
  `This is what we know about the avocado: ${text}.\nCreated on ${Date.now()}`,
);
console.log("File has been written");

// Non-blocking, asynchronous way
fs.readFile("./starter/txt/start.txt", "utf-8", (err, data1) => {
  if(err) return console.log("ERROR!");
  fs.readFile(`./starter/txt/${data1}.txt`, "utf-8", (err, data2) => {
    fs.readFile(`./starter/txt/append.txt`, "utf-8", (err, data3) => {
      fs.writeFile(
        "./starter/txt/final.txt",
        `${data1}\n${data2}\n${data3}`,
        "utf-8",
        (err) => {
          console.log("Your file has been written");
        },
      );
      console.log(data3);
    });
    console.log(data2);
  });
  console.log(data1);
});
console.log("Reading file asynchronously");
