const fs = require('fs');
const path = require('path');
const router = require('express').Router();

const string_json = fs.readFileSync(path.join(__dirname, '../data/comments.json'));
const comments_format = JSON.parse(string_json.toString());
const comments = comments_format.data

router.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,DELETE,OPTIONS,POST,PUT');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Content-Type', 'application/json;charset=utf-8');
	next();
});

router.get('/get', (req, res) => res.json(comments));

router.post('/add', (req, res) => {
	console.log('请求成功', req.body);
	comments.push(req.body);
	fs.writeFileSync(path.join(__dirname, '../data/comments.json'), JSON.stringify({data: comments}));
	res.json(comments);
});

router.delete('/delete', (req, res) => {
	console.log('请求成功', req.body.id);
	for (var i in comments) {
		if (comments[i].id === req.body.id) {
			comments[i].delete = true;
			console.log(comments[i])
		}
	}
	console.log(comments)
	fs.writeFileSync(path.join(__dirname, '../data/comments.json'), JSON.stringify({data: comments}));
	res.json(comments);
});

module.exports = router;
