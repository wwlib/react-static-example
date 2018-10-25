import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";

import Application from './components/Application';
import Model from './model/Model';

const homepage = require('../../package.json').homepage;

declare let module: any

import './css/app.css';

let model: Model = new Model();
console.log(`window.location.hostname: `, window.location, window.location.hostname, window.location.host, homepage);
if (window.location.hostname == 'localhost') {
    process.env.PUBLIC_URL = '';
} else {
    process.env.PUBLIC_URL = homepage;
}

console.log(`process.env.PUBLIC_URL: `, process.env.PUBLIC_URL);

// basename={process.env.PUBLIC_URL}
// model.on('ready', () => {
    ReactDOM.render(
        <HashRouter>
            <Application model={model} />
        </HashRouter>,
        document.getElementById('root')
    );
// });

// if (module.hot) {
//     module.hot.accept();
// }
