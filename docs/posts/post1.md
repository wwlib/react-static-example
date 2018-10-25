### My First post

![react](./assets/react.png =100x100)
![typescript](./assets/typescript.png =100x100)
![bootstrap](./assets/bootstrap.png =100x100)

#### For today...
- topic 1 (react)
- topic 2 (typescript)
- topic 3 (bootstrap)


```
A ship in a harbor is safe but that is not what ships were made for.
```

Demo: [http://wwlib.org/react-typescript-static-site-example/](http://wwlib.org/react-typescript-static-site-example/)

See related post: [post2.md](./post2.md)

#### Code

```Javascript
const path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    app = express(),
    port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`App is listening on port ${port}`) });

app.get('/:page', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'docs', 'index.html'))
});

let compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath, stats: { colors: true }
}));
app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(path.resolve(__dirname, 'docs')));

```