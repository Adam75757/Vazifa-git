import fs from "fs";
import path from "path";

let GET = (req, res) => {
    let data = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/data/users.json"), "utf-8"));
    res.status(200).json(data);
};

let GET_ID = (req, res) => {
    let { id } = req.query;
    if (!id) return res.status(400).json({ error: "id kiritilmadi" });

    let users = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/data/users.json"), "utf-8"));
    let user = users.find(user => user.id === Number(id));

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ error: "Bunday user yoq" });
    }
};

let PUT = (req, res) => {
    let users = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/data/users.json"), "utf-8"));
    let index = users.findIndex(l => l.id === req.body.id);

    if(index !== -1){
        users[index] = req.body;
        fs.writeFileSync(path.join(process.cwd(), "/data/users.json"), JSON.stringify(users, null, 4));
        res.status(201).send("Talaba o'zgartirildi.");
    } else {
        res.status(404).send("Bunday talaba topilmadi.");
    }
};

let POST = (req, res) => {
    let data = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/data/users.json"), "utf-8"));
    let index = data.findIndex(l => l.id === req.body.id);

    if (index !== -1) {
        res.status(400).send("Xato bu id bor");
    } else {
        data.push(req.body);
        fs.writeFileSync(path.join(process.cwd(), "/data/users.json"), JSON.stringify(data, null, 4));
        res.status(201).send("Yozildi");
    }
};

let DELETE = (req, res) => {
    let { id } = req.query;
    if (!id) return res.status(400).send("ID kiritilmadi");

    let users = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/data/users.json"), "utf-8"));
    users = users.filter(user => user.id !== Number(id));
    fs.writeFileSync(path.join(process.cwd(), "/data/users.json"), JSON.stringify(users, null, 4));
    res.send("Talaba o'chirildi");
};

export default {
    GET,
    GET_ID,
    PUT,
    POST,
    DELETE,
};
