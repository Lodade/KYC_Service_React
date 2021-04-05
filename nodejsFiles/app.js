const express = require("express");
const fs = require("fs");
const xmlParser = require(`${__dirname}\\fileParser`);
const upload = require("express-fileupload");

const app = express();
app.use(upload());
app.use(express.text());
app.use(express.static(`${__dirname}\\..`));
let pool;
/*
This handler responds to any browser requests to the base domain
and sends back the html file containing the home page of the application
*/
app.get("/", function (req, res) {
    res.status(200).sendFile("frontend/index.html", { root: `${__dirname}\\..` });
    console.log("Webpage served");
});
/*
This handler responds to the "/test" request and saves any files 
contained in the request to the uploads folder. It responds 
with a "File received!" message.
*/
app.post("/test", async function (req, res) {
    if (req.files) {
        let files = req.files;
        let fileKeyArray = Object.keys(files);
        for (let i = 0; i < fileKeyArray.length; i++) {
            let currentFile = files[fileKeyArray[i]];
            console.log(currentFile);
            await currentFile.mv(`${__dirname}/uploads/` + currentFile.name);
            fs.readFile(`${__dirname}/uploads/` + currentFile.name, "utf8", (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(data);
            });
        }
    }
    res.send("Files received!");
});
/*
This handler responds to the "/query" request and sends the query
from the request body to the MariaDB database. It then responds
with the result of the query from the database. 
*/
app.post("/query", async function (req, res) {
    let result;
    if (pool == undefined) {
        pool = await xmlParser.createMariadbConnectionPool();
    }
    if (pool.getConnection) {
        console.log("Query being sent to database");
        result = await xmlParser.query(req.body, pool);
    } else {
        console.log("Pool creation failed");
    }
    if (result != null) {
        console.log("Query completed");
        res.send(result);
    }
});

module.exports = app;
