const app = require(`${__dirname}\\node.js files\\app`);

const PORT = process.env.PORT || 3000;
/*
This handler activates the app object to 
start listening on port 3000 or the PORT 
environment variable
*/
app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});
