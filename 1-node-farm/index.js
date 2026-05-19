const fs = require("fs");
const http = require("http");
// Blocking, synchronous way
// Reading from the file
// FileSystem
// const text = fs.readFileSync("./starter/txt/input.txt", "utf-8");
// // Writing to the file
// const textOut = fs.writeFileSync(
//   "./starter/txt/output.txt",
//   `This is what we know about the avocado: ${text}.\nCreated on ${Date.now()}`,
// );
// console.log("File has been written");

// // Non-blocking, asynchronous way
// fs.readFile("./starter/txt/start.txt", "utf-8", (err, data1) => {
//   if(err) return console.log("ERROR!");
//   fs.readFile(`./starter/txt/${data1}.txt`, "utf-8", (err, data2) => {
//     fs.readFile(`./starter/txt/append.txt`, "utf-8", (err, data3) => {
//       fs.writeFile(
//         "./starter/txt/final.txt",
//         `${data1}\n${data2}\n${data3}`,
//         "utf-8",
//         (err) => {
//           console.log("Your file has been written");
//         },
//       );
//       console.log(data3);
//     });
//     console.log(data2);
//   });
//   console.log(data1);
// });
// console.log("Reading file asynchronously");

// Helper functions
const replacePlaceholder = (tempCard, product) => {
  let output = tempCard.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

// Reading Data
const data = fs.readFileSync(`./starter/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const tempOverview = fs.readFileSync(
  `./starter/templates/overview.html`,
  "utf-8",
);
const tempProduct = fs.readFileSync(
  `./starter/templates/product.html`,
  "utf-8",
);
const tempCard = fs.readFileSync(`./starter/templates/card.html`, "utf-8");

// Server
const server = http.createServer((req, res) => {
  const pathName = req.url;
  // Overview Page
  if (pathName === "/" || pathName === "/overview") {
    const cardsHtml = dataObj
      .map((el) => replacePlaceholder(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCTS_CARDS%}", cardsHtml);
    res.writeHead(200, {
       "Content-Type": "text/html",
    });
    res.end(output);
  }
  // Product Page
  else if (pathName === "/product") {
    res.end("This is the product");
  }

  // API Page
  else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(dataObj));
  }

  // Not Found
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
