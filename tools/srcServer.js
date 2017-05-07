import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/*eslint-disable no-console*/

const port = 3000;
const app = express();
const compiler = webpack(config);

// Load webpack config settings
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    debug: true,
    devtool: 'inline-source-map'
}));

// Enable hot reloading
app.use(require('webpack-hot-middleware')(compiler));

// Accept any URL as the entrypoint
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, (err) => {
    if(err) {
        console.log(err);
    }
    else {
        open('http://localhost:' + port);
    }
});