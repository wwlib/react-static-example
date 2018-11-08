const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static(path.resolve(__dirname, 'docs')));
// router.get('/', (req, res) => {
//     let contentPath = path.resolve(__dirname, 'docs', 'index.html');
//     // console.log(req);
//     console.log(contentPath);
//     res.sendFile(contentPath);
//     console.log(req.params);
// });

module.exports = router;
