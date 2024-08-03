const express = require("express");
const app = express();

app.get("/*", (req, res) => {
    res.json({
        message: "THIS SERVER IS OWNED BY /AHMED SADEK/"
    })
})

app.listen(4000, () => {
    console.log("SERVER IS WORKED ON PORT 4000")
})