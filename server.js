const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
(async () => {
    const { default: open } = await import('open');

    const app = express();
    const port = 5000;
    app.use(bodyParser.json({ extended: true }));
    app.use(express.static("./Frontend"));
    app.use(cors());

    app.listen(port, () => {
        console.log(`Server is running at port ${port}!`);
        open(`http://localhost:${port}`);
    });

    app.get("/reading", (req, res) => {
        fs.readFile("reading.json", "utf-8", (err, data) => {
            res.send(data);
        });
    });
    
    app.get("/wanttoread", (req, res) => {
        fs.readFile("want_to_read.json", "utf-8", (err, data) => {
            res.send(data);
        });
    });
    
    app.get("/finishread", (req, res) => {
        fs.readFile("finish_read.json", "utf-8", (err, data) => {
            res.send(data);
        });
    });
    
    app.post("/reading", (req, res) => {
        fs.readFile("reading.json", "utf-8", (err, data) => {
            if (err) {
                res.send('{"result": 0}');
            } else {
                fs.writeFile("reading.json", JSON.stringify(req.body), (err) => {
                    if (err) {
                        res.send(`{"result": 0}`);
                    } else {
                        res.send(`{"result": 1}`);
                    }
                });
            }
        });
    });
    
    app.post("/wanttoread", (req, res) => {
        fs.readFile("want_to_read.json", "utf-8", (err, data) => {
            if (err) {
                res.send('{"result": 0}');
            } else {
                fs.writeFile("want_to_read.json", JSON.stringify(req.body), (err) => {
                    if (err) {
                        res.send(`{"result": 0}`);
                    } else {
                        res.send(`{"result": 1}`);
                    }
                });
            }
        });
    });
    
    app.post("/finishread", (req, res) => {
        fs.readFile("finish_read.json", "utf-8", (err, data) => {
            if (err) {
                res.send('{"result": 0}');
            } else {
                fs.writeFile("finish_read.json", JSON.stringify(req.body), (err) => {
                    if (err) {
                        res.send(`{"result": 0}`);
                    } else {
                        res.send(`{"result": 1}`);
                    }
                });
            }
        });
    });
})(); // () - в конце означает, что функция вызовется сразу после ее объявления