import express from "express";
import MongoClient from "mongodb";

const mongoClient = new MongoClient.MongoClient("mongodb://localhost:27017/", {
    useUnifiedTopology: true,
});
const PORT = 4000;
const app = express();

let db;

mongoClient.connect((err, client) => {
    if (err) return console.log(err);

    db = client;

    app.locals.collection = client.db("test").collection("test_collection");

    app.listen(PORT, () => {
        console.log("Server is running");
    });
});

app.get("/", (req, res) => {
    const collection = req.app.locals.collection;

    collection.find({ name: "Paul" }).toArray((err, users) => {
        if (err) {
            return console.log(err);
        }
        res.send(users);
    });
});

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});
