const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello");
});

const homepage = require('./package.json').baseUrl + '/';

app.use(homepage, require('./routes.js'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.use(express.static(path.resolve(__dirname, 'docs')));
