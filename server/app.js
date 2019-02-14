const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const comments = require('./routes/app');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/comments', comments);

app.use((req, res, next) => {
	next(createError(404));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
