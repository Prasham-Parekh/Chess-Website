const http = require("http")
const fs = require("fs")
const url = require("url")

const ROOT_DIR = "html"

const MIME_TYPES = {
  css: "text/css",
  gif: "image/gif",
  htm: "text/html",
  html: "text/html",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript",
  json: "application/json",
  png: "image/png",
  svg: "image/svg+xml",
  txt: "text/plain"
}

function get_mime(filename) {
  for (let ext in MIME_TYPES) {
    if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
      return MIME_TYPES[ext]
    }
  }
  return MIME_TYPES["txt"]
}

http.createServer(function(request, response) {
    let urlObj = url.parse(request.url, true, false)
    console.log("\n============================")
    console.log("PATHNAME: " + urlObj.pathname)
    console.log("REQUEST: " + ROOT_DIR + urlObj.pathname)
    console.log("METHOD: " + request.method)

    let receivedData = ""
    let dataObj = null
    let returnObj = null

    request.on("data", function(chunk) {
      receivedData += chunk
    })

    request.on("end", function() {

      if (request.method == "POST") {
        dataObj = JSON.parse(receivedData)
        console.log("received data object: ", dataObj)
        console.log("type: ", typeof dataObj)
        console.log("USER REQUEST: " + dataObj.text)
        returnObj = {}
        returnObj.text = dataObj.text
        response.writeHead(200, {
          "Content-Type": MIME_TYPES["json"]
        })
        response.end(JSON.stringify(returnObj))
      }
      else if (request.method == "GET") {
        var filePath = ROOT_DIR + urlObj.pathname
        if (urlObj.pathname === "/") filePath = ROOT_DIR + "/index.html"

        fs.readFile(filePath, function(err, data) {
          if (err) {
            console.log("ERROR: " + JSON.stringify(err))
            response.writeHead(404)
            response.end(JSON.stringify(err))
            return
          }
          response.writeHead(200, {
            "Content-Type": get_mime(filePath)
          })
          response.end(data)
        })
      }
    })
  }).listen(3000)

console.log("Server Running at PORT 3000  CNTL-C to quit")
console.log("To Test")
console.log("http://localhost:3000/curling.html")