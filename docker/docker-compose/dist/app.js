"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql2_1 = __importDefault(require("mysql2"));
const app = (0, express_1.default)();
const port = 3000;
const connection = mysql2_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'fullcycle'
});
connection.connect((err) => {
    if (err)
        throw err;
    console.log('Connected!');
});
const sql = "INSERT INTO people (first_name, last_name, age) VALUES ('Israel', 'Ludolf', '26')";
connection.query(sql, function (err, result) {
    if (err)
        throw err;
    console.log("1 record inserted");
});
// connection.end();
app.get('/', (req, res) => {
    res.send('<h1>Full Cycle Rocks!</h1>');
});
app.get('/peoples', async (req, res) => {
    const sql = 'SELECT * FROM fullcycle.people';
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        res.send(result);
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
