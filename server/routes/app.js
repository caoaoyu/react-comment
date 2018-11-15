const fs = require('fs');
const path = require('path');
const router = require('express').Router();

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: '111111',
    database: 'comments'
    //   port: 3000
});

// const string_json = fs.readFileSync(path.join(__dirname, '../data/comments.json'));
// const comments_format = JSON.parse(string_json.toString());
// const comments = comments_format.data;

router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,DELETE,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

router.get('/get', (req, res) => {
    const { page, type } = req.query;
    var start = (page - 1) * 7;
    const p1 = new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM message ${type == 0 ? '' : ` WHERE state=${type}`} order by id desc LIMIT ${start}, 7`, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    });
    const p2 = new Promise((resolve, reject) => {
        connection.query(`SELECT COUNT(*) AS total FROM message ${type == 0 ? '' : ` WHERE state=${type}`}`, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    });

    Promise.all([ p1, p2 ])
        .then((result) => {
            const comments = result[0];
            const total = result[1];
            res.json({
                comments,
                pages_max: Math.ceil(JSON.parse(JSON.stringify(total))[0].total / 7)
            });
        })
        .catch((error) => res.json({ error }));
});

router.post('/update', (req, res) => {
    if (!req.body.context) res.json({ error: '缺少 context' });
    const update = `UPDATE message SET context='${req.body.context}' WHERE id =${req.body.id}`;
    connection.query(update, function(err, result) {
        err ? res.json({ error: '服务器错误' }) : res.json({ success: true });
        if (err) console.log('update ERROR] - ', err.message);
    });
});

router.post('/add', (req, res) => {
    const { state, context, create_time } = req.body;
    if (!state || !context || !create_time) return res.json({ error: '缺少传递值' });

    const addSql = `INSERT INTO message(state,context,create_time) VALUES(${state}, '${context}', ${create_time})`;
    connection.query(addSql, function(err, result) {
        err ? res.json({ error: '服务器错误' }) : res.json({ success: true });
        if (err) console.log('[INSERT ERROR] - ', err.message);
    });
});

router.delete('/delete', (req, res) => {
    const update = `UPDATE message SET state=2 WHERE id =${req.body.id}`;
    connection.query(update, function(err, result) {
        err ? res.json({ error: '服务器错误' }) : res.json({ success: true });
        if (err) console.log('update ERROR] - ', err.message);
    });
});

module.exports = router;
