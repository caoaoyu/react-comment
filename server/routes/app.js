const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const md5 = require('md5');

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: '111111',
    database: 'comments',
    port: 3308
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

// 用户登陆
router.post('/login', (req, res) => {
    const { account, password } = req.body;
    const s1 = `SELECT * FROM user WHERE account='${account}'`;
    const s2 = `SELECT * FROM user WHERE account='${account}' AND password='${password}'`;

    const account_select = new Promise((resolve, reject) => {
        connection.query(s1, function(err, result) {
            if (err) reject(err);
            result.length < 1 ? resolve({ error: true, err: '账户不存在' }) : resolve({ success: true, user: result[0] });
        });
    });
    account_select.then((datas) => {
        if (datas.error) {
            res.json({ success: true, err: datas.err });
        } else {
            connection.query(s2, function(err, result) {
                if (!err) {
                    result.length < 1 ? res.json({ success: true, err: '账户或者密码错误' }) : res.json({ success: true, user: result[0] });
                } else {
                    res.json({ error: '服务器错误' });
                }
            });
        }
    });
});

// 注册用户
router.post('/registered', (req, res) => {
    const { accounts, password, sex, time } = req.body;
    const uid = md5(accounts, password, time);
    const s1 = `INSERT INTO user(accounts, password, sex, create_time, uid) 
    VALUES(${accounts}, ${password}, ${sex}, ${time}, ${uid})`;
    connection.query(s1, function(err, result) {
        err ? res.json({ error: '服务器错误' }) : res.json({ success: true });
        if (err) console.log('[INSERT ERROR] - ', err.message);
    });
});

router.get('/get', (req, res) => {
    const { page, type, find_context } = req.query;
    var start = (page - 1) * 7;
    const p1 = new Promise((resolve, reject) => {
        //const p1sql = `SELECT * FROM message ${type == 0 ? '' : ` WHERE state=${type} `} ${find_context ? `AND context REGEXP '${find_context}'` : ''} order by id desc LIMIT ${start}, 7`;
        const p1sql = `SELECT * FROM message ${type == 0 ? '' : ` WHERE state=${type} `} ${find_context ? `AND context REGEXP '${find_context}'` : ''} order by id desc LIMIT ${start}, 7`;
        connection.query(p1sql, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    });
    const p2 = new Promise((resolve, reject) => {
        const p2sql = `SELECT COUNT(*) AS total FROM message ${type == 0 ? '' : ` WHERE state=${type}`}`;
        connection.query(p2sql, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    });
    const p3 = new Promise((resolve, reject) => {
        const p3sql = `SELECT * FROM user`;
        connection.query(p3sql, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    });

    Promise.all([ p1, p2, p3 ])
        .then((result) => {
            const comments = result[0];
            const total = result[1];
            const users = result[2];
            comments.forEach((e) => {
                e.reply = e.reply.length < 1 ? [] : JSON.parse(e.reply);
                e.user = users.filter((u) => u.uid == e.uid)[0];
            });
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
router.post('/reply', (req, res) => {
    if (!req.body.reply) res.json({ error: '缺少 context' });
    const update = `UPDATE message SET reply='${req.body.reply}' WHERE id =${req.body.id}`;
    connection.query(update, function(err, result) {
        err ? res.json({ error: '服务器错误' }) : res.json({ success: true });
        if (err) console.log('update ERROR] - ', err.message);
    });
});

router.post('/add', (req, res) => {
    const { state, context, create_time, id } = req.body;
    if (!state || !context || !create_time) return res.json({ error: '缺少传递值' });
    if (!id) return res.json({ error: '缺少用户信息' });

    const addSql = `INSERT INTO message(state,context,create_time, uid) VALUES(${state}, '${context}', ${create_time}, ${id})`;
    connection.query(addSql, function(err, result) {
        err ? res.json({ error: '服务器错误' }) : res.json({ success: true });
        if (err) console.log('[INSERT ERROR] - ', err.message);
    });
});

router.post('/find', (req, res) => {
    const { find_context } = req.body;
    if (!find_context) return res.json({ error: '缺少传递值' });
    const findSql1 = `SELECT * FROM message WHERE context REGEXP '${find_context}' AND state=${req.body.type || 1}`;
    const findSql2 = `SELECT COUNT(*) AS total FROM message WHERE context REGEXP '${find_context}' AND state=${req.body.type || 1}`;

    const f1 = new Promise((resolve, reject) => {
        connection.query(findSql1, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    });
    const f2 = new Promise((resolve, reject) => {
        connection.query(findSql2, (error, result) => {
            error ? reject(error) : resolve(result);
        });
    });

    Promise.all([ f1, f2 ])
        .then((result) => {
            const comments = result[0];
            const total = result[1];
            res.json({
                comments,
                pages_max: Math.ceil(JSON.parse(JSON.stringify(total))[0].total / 7)
            });
        })
        .catch((error) => {
            throw new Error(error);
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
