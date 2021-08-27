const express = require("express"),
app = express(),
fs = require("fs"),
path = require("path");
app.listen(8086, ()=>{
    console.log("服务器启动");
})

app.use("/static", express.static(path.resolve(__dirname, "static")));
app.get("/static/image", (req, res)=>{
    const query = req.query;
    const obj = {
        type: "jpg",
        url: []
    }
    for(let i = 1; i <= query.count; i ++){
        obj.url.push(`http://127.0.0.1:8086/static/image/pic${20 * query.page + i}.jpg`);
    }
    res.send(JSON.stringify(obj));
    console.log(JSON.stringify(obj));
})
app.get("*", (req, res)=>{
    console.log(req.path);
})