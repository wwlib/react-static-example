import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";


import Application from './components/Application';
import Model from './model/Model';

declare let module: any

import './css/app.css';

let model: Model = new Model();
console.log(`process.env.PUBLIC_URL: `, process.env.PUBLIC_URL);

// model.on('ready', () => {
    ReactDOM.render(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Application model={model} />
        </BrowserRouter>,
        document.getElementById('root')
    );
// });

// if (module.hot) {
//     module.hot.accept();
// }
