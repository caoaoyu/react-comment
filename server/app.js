const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const comments = require('./routes/app');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.get('/', (req, res) => {
// 	res.render('index.html', { a: 3 });
// });

app.get('/asyncData', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.json({ name: Math.random() });
});

app.use('/comments', comments);

app.use((req, res, next) => {
	next(createError(404));
});

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
